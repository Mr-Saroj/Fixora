package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.RatingRequest;
import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.dto.ServiceRequestResponseDTO;
import com.saroj.fixora.dto.UpdateStatusRequest;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.ServiceRequestRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;        // for distributed lock

    @Autowired
    private KafkaTemplate<String, RequestEvent> kafkaTemplate;  // for publishing events

    private static final String TOPIC = "request-events";

    private static final Map<RequestStatus, RequestStatus> ALLOWED_NEXT
            = new EnumMap<>(RequestStatus.class);
    static {
        ALLOWED_NEXT.put(RequestStatus.ACCEPTED,    RequestStatus.IN_PROGRESS);
        ALLOWED_NEXT.put(RequestStatus.IN_PROGRESS, RequestStatus.COMPLETED);
    }

    // ─────────────────────────────────────────────────────────────────────
    // CUSTOMER CREATES REQUEST
    // → Save to MongoDB
    // → Publish REQUEST_CREATED to Kafka
    // → Kafka consumer evicts + rebuilds Redis cache
    // ─────────────────────────────────────────────────────────────────────
    @Override
    public ApiResponse<?> createRequest(ServiceRequestDTO dto, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        ServiceRequest request = new ServiceRequest();
        request.setCustomerId(customer.getId());
        request.setFullName(dto.getFullName());
        request.setMobileNumber(dto.getMobileNumber());
        request.setLocation(dto.getLocation());
        request.setLatitude(dto.getLatitude());
        request.setLongitude(dto.getLongitude());
        request.setCategory(TechnicianType.valueOf(dto.getCategory().toUpperCase()));
        request.setDescription(dto.getDescription());
        request.setUrgency(dto.getUrgency());
        request.setPhotoUrls(dto.getPhotoUrls());
        request.setStatus(RequestStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());

        ServiceRequest saved = requestRepository.save(request);

        // publish to Kafka → consumer will update Redis cache
        kafkaTemplate.send(TOPIC, new RequestEvent(
                "REQUEST_CREATED",
                saved.getId(),
                saved.getCategory().name(),
                null
        ));

        return new ApiResponse<>(true, "Service request created successfully!", saved.getId());
    }

    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN SEES AVAILABLE REQUESTS
    // → Check Redis cache first (key = "ELECTRICIAN" / "PLUMBER" etc)
    // → Cache HIT  = return from Redis instantly (no MongoDB)
    // → Cache MISS = query MongoDB → store in Redis → return
    // ─────────────────────────────────────────────────────────────────────
    
    @Override
    public ApiResponse<?> getRequestsForTechnician(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        if (technician.getTechnicianType() == null) {
            throw new ResourceNotFoundException("This user has no technician type set");
        }

        String cacheKey = technician.getTechnicianType().name(); // "ELECTRICIAN" etc

        // STEP 1: Check Redis cache first
        var cache = cacheManager.getCache("requests");
        if (cache != null) {
            var cached = cache.get(cacheKey);
            if (cached != null) {
                // CACHE HIT → return from Redis instantly
                return new ApiResponse<>(true, "Requests fetched successfully!", cached.get());
            }
        }

        // STEP 2: CACHE MISS → query MongoDB
        List<ServiceRequest> requests = requestRepository.findByCategoryAndStatus(
                technician.getTechnicianType(), RequestStatus.PENDING);

        // STEP 3: Store list in Redis
        if (cache != null) {
            cache.put(cacheKey, requests);
        }

        return new ApiResponse<>(true, "Requests fetched successfully!", requests);
    }
    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN ACCEPTS REQUEST
    // → Redis distributed lock (prevent double accept)
    // → Subscription check
    // → MongoDB double check (status must be PENDING)
    // → Location check
    // → Save to MongoDB
    // → Publish REQUEST_ACCEPTED to Kafka
    // → Kafka consumer evicts + rebuilds Redis cache
    // → Release lock
    // ─────────────────────────────────────────────────────────────────────
    @Override
    public ApiResponse<?> acceptRequest(String requestId, String technicianEmail) {

        // STEP 1: Acquire Redis distributed lock
        String lockKey = "lock::request::" + requestId;
        Boolean lockAcquired = redisTemplate.opsForValue()
                .setIfAbsent(lockKey, technicianEmail, Duration.ofSeconds(10));

        if (Boolean.FALSE.equals(lockAcquired)) {
            return new ApiResponse<>(false,
                    "This request has already been accepted by another technician.", null);
        }

        try {
            // STEP 2: Find technician
            User technician = userRepository.findByEmail(technicianEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

            // STEP 3: Subscription check
            LocalDate today = LocalDate.now(ZoneOffset.UTC);

            if (technician.getSubscriptionEndDate() == null) {
                return new ApiResponse<>(false,
                        "No active subscription found. Please claim a subscription plan.",
                        null);
            }

            if (!technician.getSubscriptionEndDate().isAfter(today)) {
                String expiredOn = technician.getSubscriptionEndDate()
                        .format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));
                return new ApiResponse<>(false,
                        "Your subscription expired on " + expiredOn +
                        ". Please renew your plan to accept service requests.", null);
            }

            // STEP 4: Find request and double check status in MongoDB
            ServiceRequest request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

            if (request.getStatus() != RequestStatus.PENDING) {
                return new ApiResponse<>(false,
                        "This request has already been accepted by another technician.", null);
            }

            // STEP 5: Location check
            String customerLocation = request.getLocation() != null
                    ? request.getLocation().toLowerCase() : "";

            String techCity     = technician.getCity()     != null ? technician.getCity().toLowerCase()     : "";
            String techDistrict = technician.getDistrict() != null ? technician.getDistrict().toLowerCase() : "";
            String techState    = technician.getState()    != null ? technician.getState().toLowerCase()    : "";
            String techPin      = technician.getPinCode()  != null ? technician.getPinCode().toLowerCase()  : "";

            boolean locationMatch =
                    (!techCity.isEmpty()     && customerLocation.contains(techCity))     ||
                    (!techDistrict.isEmpty() && customerLocation.contains(techDistrict)) ||
                    (!techState.isEmpty()    && customerLocation.contains(techState))    ||
                    (!techPin.isEmpty()      && customerLocation.contains(techPin));

            if (!locationMatch) {
                return new ApiResponse<>(false,
                    "Your service area (" + technician.getCity() + ", " + technician.getDistrict() +
                    ") does not match the customer's location.", null);
            }

            // STEP 6: Save to MongoDB
            request.setStatus(RequestStatus.ACCEPTED);
            request.setAssignedTechnicianId(technician.getId());
            request.setAcceptedAt(LocalDateTime.now());
            requestRepository.save(request);

            // STEP 7: Publish to Kafka
            // → Kafka consumer will evict + rebuild Redis cache
            // → req1 disappears from available list for ALL technicians
            kafkaTemplate.send(TOPIC, new RequestEvent(
                    "REQUEST_ACCEPTED",
                    requestId,
                    request.getCategory().name(),
                    technicianEmail
            ));

            return new ApiResponse<>(true, "Job accepted successfully!", null);

        } finally {
            // STEP 8: Always release lock
            redisTemplate.delete(lockKey);
        }
    }

    // ─────────────────────────────────────────────────────────────────────
    // BELOW METHODS NOT MODIFIED — exactly as your original code
    // ─────────────────────────────────────────────────────────────────────

    @Override
    public ApiResponse<?> getMyRequests(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ServiceRequest> requests = requestRepository.findByCustomerId(user.getId());

        if (requests.isEmpty()) {
            return new ApiResponse<>(false, "No service requests found", null);
        }

        List<ServiceRequestResponseDTO> result = requests.stream()
                .map(this::toResponseDTOWithTechnician)
                .toList();

        return new ApiResponse<>(true, "Requests fetched successfully", result);
    }

    @Override
    public ApiResponse<?> getMyJobs(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        List<ServiceRequest> jobs = requestRepository
                .findByAssignedTechnicianId(technician.getId());

        if (jobs.isEmpty()) {
            return new ApiResponse<>(true, "You have no accepted jobs yet", List.of());
        }

        List<ServiceRequestResponseDTO> result = jobs.stream()
                .map(this::toResponseDTO)
                .toList();

        return new ApiResponse<>(true, "Your jobs fetched successfully", result);
    }

    @Override
    public ApiResponse<?> updateRequestStatus(String requestId, String technicianEmail,
                                               UpdateStatusRequest dto) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        ServiceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getAssignedTechnicianId() == null
                || !request.getAssignedTechnicianId().equals(technician.getId())) {
            return new ApiResponse<>(false, "This job is not assigned to you", null);
        }

        if (dto.getStatus() == null || dto.getStatus().isBlank()) {
            return new ApiResponse<>(false, "Status is required", null);
        }

        RequestStatus newStatus;
        try {
            newStatus = RequestStatus.valueOf(dto.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            return new ApiResponse<>(false, "Invalid status value: " + dto.getStatus(), null);
        }

        RequestStatus currentStatus = request.getStatus();
        RequestStatus expectedNext  = ALLOWED_NEXT.get(currentStatus);

        if (expectedNext == null || !expectedNext.equals(newStatus)) {
            return new ApiResponse<>(false,
                    "Invalid status transition: " + currentStatus + " -> " + newStatus, null);
        }

        request.setStatus(newStatus);

        // save timestamp based on status
        if (newStatus == RequestStatus.IN_PROGRESS) {
            request.setInProgressAt(LocalDateTime.now());
        } else if (newStatus == RequestStatus.COMPLETED) {
            request.setCompletedAt(LocalDateTime.now());
        }

        requestRepository.save(request);

        return new ApiResponse<>(true, "Job status updated to " + newStatus, null);
    }

    @Override
    public ApiResponse<?> rateTechnician(String requestId, String customerEmail,
                                          RatingRequest dto) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        ServiceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (!request.getCustomerId().equals(customer.getId())) {
            return new ApiResponse<>(false, "This request does not belong to you", null);
        }

        if (request.getStatus() != RequestStatus.COMPLETED) {
            return new ApiResponse<>(false, "You can only rate a completed job", null);
        }

        if (request.getRating() != null) {
            return new ApiResponse<>(false, "You've already rated this job", null);
        }

        if (dto.getRating() == null || dto.getRating() < 1 || dto.getRating() > 5) {
            return new ApiResponse<>(false, "Rating must be between 1 and 5", null);
        }

        request.setRating(dto.getRating());
        request.setReview(dto.getReview());
        requestRepository.save(request);

        return new ApiResponse<>(true, "Thanks for your feedback!", null);
    }

    // ── mapping helpers ──────────────────────────────────────────────────

    private ServiceRequestResponseDTO toResponseDTO(ServiceRequest req) {
        ServiceRequestResponseDTO dto = new ServiceRequestResponseDTO();
        dto.setId(req.getId());
        dto.setFullName(req.getFullName());
        dto.setMobileNumber(req.getMobileNumber());
        dto.setLocation(req.getLocation());
        dto.setCategory(req.getCategory());
        dto.setDescription(req.getDescription());
        dto.setUrgency(req.getUrgency());
        dto.setPhotoUrls(req.getPhotoUrls());
        dto.setStatus(req.getStatus());
        dto.setCreatedAt(req.getCreatedAt());
        dto.setAcceptedAt(req.getAcceptedAt());
        dto.setInProgressAt(req.getInProgressAt());
        dto.setCompletedAt(req.getCompletedAt());
        dto.setRating(req.getRating());
        dto.setReview(req.getReview());
        return dto;
    }

    private ServiceRequestResponseDTO toResponseDTOWithTechnician(ServiceRequest req) {
        ServiceRequestResponseDTO dto = toResponseDTO(req);
        if (req.getAssignedTechnicianId() != null) {
            userRepository.findById(req.getAssignedTechnicianId()).ifPresent(tech ->
                    dto.setTechnician(new ServiceRequestResponseDTO.TechnicianInfo(
                            tech.getName(),
                            tech.getPhone(),
                            tech.getCity(),
                            tech.getDistrict(),
                            tech.getTechnicianType() != null
                                    ? tech.getTechnicianType().name() : null
                    ))
            );
        }
        return dto;
    }
}