package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.RatingRequest;
import com.saroj.fixora.dto.RequestEvent;
import com.saroj.fixora.dto.ServiceRequestDTO;
import com.saroj.fixora.dto.ServiceRequestResponseDTO;
import com.saroj.fixora.dto.UpdateStatusRequest;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.LoginAccess;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import com.saroj.fixora.repository.ServiceRequestRepository;
import com.saroj.fixora.repository.TechnicianProfileRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.ServiceRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.enums.Role;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private static final Logger log = LoggerFactory.getLogger(ServiceRequestServiceImpl.class);

    @Autowired
    private ServiceRequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianProfileRepository technicianProfileRepository;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private KafkaTemplate<String, RequestEvent> kafkaTemplate;

    private static final String TOPIC = "request-events";

    private static final Map<RequestStatus, RequestStatus> ALLOWED_NEXT = new EnumMap<>(RequestStatus.class);
    static {
        ALLOWED_NEXT.put(RequestStatus.ACCEPTED, RequestStatus.IN_PROGRESS);
        ALLOWED_NEXT.put(RequestStatus.IN_PROGRESS, RequestStatus.COMPLETED);
    }

    // ─────────────────────────────────────────────────────────────────────
    // CUSTOMER CREATES REQUEST
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

        // ✅ Kafka failure never kills the API
        try {
            kafkaTemplate.send(TOPIC, new RequestEvent(
                    "REQUEST_CREATED",
                    saved.getId(),
                    saved.getCategory().name(),
                    saved.getLocation(),
                    null));
        } catch (Exception e) {
            log.warn("Kafka send failed (request still saved): {}", e.getMessage());
        }

        return new ApiResponse<>(true, "Service request created successfully!", saved.getId());
    }

    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN SEES AVAILABLE REQUESTS
    // ─────────────────────────────────────────────────────────────────────
    @Override
    public ApiResponse<?> getRequestsForTechnician(
            String technicianEmail, String cursor, int size) {

        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        TechnicianProfile profile = technicianProfileRepository
                .findByUserId(technician.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Technician profile not found"));

        if (profile.getTechnicianType() == null) {
            throw new ResourceNotFoundException("Technician type not configured");
        }

        List<ServiceRequest> items;

        Pageable pageable = PageRequest.of(0, size + 1);

        Page<ServiceRequest> page = requestRepository
                .findByCategoryAndStatusOrderByCreatedAtDesc(
                        profile.getTechnicianType(),
                        RequestStatus.PENDING,
                        pageable);

        items = page.getContent();

        if (cursor != null && !cursor.isBlank()) {
            LocalDateTime cursorTime = LocalDateTime.parse(cursor);

            items = items.stream()
                    .filter(r -> r.getCreatedAt().isBefore(cursorTime))
                    .limit(size + 1)
                    .toList();
        }

        boolean hasMore = items.size() > size;

        List<ServiceRequest> pageItems = hasMore
                ? items.subList(0, size)
                : items;

        String nextCursor = (hasMore && !pageItems.isEmpty())
                ? pageItems.get(pageItems.size() - 1).getCreatedAt().toString()
                : null;

        Map<String, Object> result = new HashMap<>();

        result.put("requests", pageItems);
        result.put("nextCursor", nextCursor);
        result.put("hasMore", hasMore);

        return new ApiResponse<>(true, "Requests fetched successfully!", result);
    }

    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN ACCEPTS REQUEST
    // ─────────────────────────────────────────────────────────────────────
    @Override
    public ApiResponse<?> acceptRequest(String requestId, String technicianEmail) {

        String lockKey = "lock::request::" + requestId;
        Boolean lockAcquired;

        // Redis lock
        try {
            lockAcquired = redisTemplate.opsForValue()
                    .setIfAbsent(lockKey, technicianEmail, Duration.ofSeconds(10));
        } catch (Exception e) {
            log.warn("Redis unavailable, skipping lock: {}", e.getMessage());
            lockAcquired = true;
        }

        if (Boolean.FALSE.equals(lockAcquired)) {
            return new ApiResponse<>(
                    false,
                    "This request is being processed by another technician.",
                    null);
        }

        try {

            User technician = userRepository.findByEmail(technicianEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

            TechnicianProfile profile = technicianProfileRepository
                    .findByUserId(technician.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Technician profile not found"));

            // Check account approval
            if (technician.getLoginAccess() != LoginAccess.APPROVED) {
                return new ApiResponse<>(
                        false,
                        "Your account is not approved yet.",
                        null);
            }

            // Check profile completion
            if (!technician.isProfileIsComplete()) {
                return new ApiResponse<>(
                        false,
                        "Please complete your technician profile first.",
                        null);
            }

            // Check technician busy status
            if (profile.isBusy()) {
                return new ApiResponse<>(
                        false,
                        "You already have an active service request. Please complete your current job before accepting another request.",
                        null);
            }

            // Check subscription
            LocalDate today = LocalDate.now(ZoneOffset.UTC);

            if (profile.getSubscriptionEndDate() == null) {
                return new ApiResponse<>(
                        false,
                        "No active subscription found. Please claim a subscription plan.",
                        null);
            }

            if (!profile.getSubscriptionEndDate().isAfter(today)) {

                String expiredOn = profile.getSubscriptionEndDate()
                        .format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));

                return new ApiResponse<>(
                        false,
                        "Your subscription expired on " + expiredOn
                                + ". Please renew your plan to accept service requests.",
                        null);
            }

            ServiceRequest request = requestRepository.findById(requestId)
                    .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

            // Check request availability
            if (request.getStatus() != RequestStatus.PENDING) {
                return new ApiResponse<>(
                        false,
                        "This request has already been accepted by another technician.",
                        null);
            }

            // Check customer location
            String customerLocation = request.getLocation() != null
                    ? request.getLocation().toLowerCase()
                    : "";

            String techCity = profile.getCity() != null
                    ? profile.getCity().toLowerCase()
                    : "";

            String techDistrict = profile.getDistrict() != null
                    ? profile.getDistrict().toLowerCase()
                    : "";

            String techState = profile.getState() != null
                    ? profile.getState().toLowerCase()
                    : "";

            String techPin = profile.getPinCode() != null
                    ? profile.getPinCode().toLowerCase()
                    : "";

            boolean locationMatch = (!techCity.isEmpty() && customerLocation.contains(techCity))
                    || (!techDistrict.isEmpty() && customerLocation.contains(techDistrict))
                    || (!techState.isEmpty() && customerLocation.contains(techState))
                    || (!techPin.isEmpty() && customerLocation.contains(techPin));

            if (!locationMatch) {
                return new ApiResponse<>(
                        false,
                        "Your service area (" + profile.getCity() + ", "
                                + profile.getDistrict()
                                + ") does not match the customer's location.",
                        null);
            }

            // Accept request
            request.setStatus(RequestStatus.ACCEPTED);
            request.setAssignedTechnicianId(technician.getId());
            request.setAcceptedAt(LocalDateTime.now());

            requestRepository.save(request);

            // Update technician busy status
            profile.setBusy(true);
            technicianProfileRepository.save(profile);

            return new ApiResponse<>(
                    true,
                    "Job accepted successfully! Complete your current job before accepting another request.",
                    null);

        } finally {

            // Release Redis lock
            try {
                redisTemplate.delete(lockKey);
            } catch (Exception e) {
                log.warn("Redis lock release failed: {}", e.getMessage());
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────────
    // CUSTOMER SEES THEIR OWN REQUESTS
    // ─────────────────────────────────────────────────────────────────────
    private static final Map<RequestStatus, Integer> STATUS_PRIORITY = new EnumMap<>(RequestStatus.class);
    static {
        STATUS_PRIORITY.put(RequestStatus.IN_PROGRESS, 1);
        STATUS_PRIORITY.put(RequestStatus.ACCEPTED, 2);
        STATUS_PRIORITY.put(RequestStatus.PENDING, 3);
        STATUS_PRIORITY.put(RequestStatus.CANCELLED, 4);
        STATUS_PRIORITY.put(RequestStatus.COMPLETED, 5);
    }

    @Override
    public ApiResponse<?> getMyRequests(String email, String cursor, int size) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ServiceRequest> all = requestRepository.findByCustomerId(user.getId());

        if (all.isEmpty()) {
            Map<String, Object> empty = new HashMap<>();
            empty.put("requests", List.of());
            empty.put("nextCursor", null);
            empty.put("hasMore", false);
            return new ApiResponse<>(true, "No service requests found", empty);
        }

        List<ServiceRequest> sorted = all.stream()
                .sorted((a, b) -> {
                    int pa = STATUS_PRIORITY.getOrDefault(a.getStatus(), 99);
                    int pb = STATUS_PRIORITY.getOrDefault(b.getStatus(), 99);
                    if (pa != pb)
                        return Integer.compare(pa, pb);
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .toList();

        int startIndex = 0;
        if (cursor != null && !cursor.isBlank()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException ignored) {
            }
        }

        int endIndex = Math.min(startIndex + size, sorted.size());
        List<ServiceRequest> pageItems = startIndex >= sorted.size()
                ? List.of()
                : sorted.subList(startIndex, endIndex);

        boolean hasMore = endIndex < sorted.size();
        String nextCursor = hasMore ? String.valueOf(endIndex) : null;

        List<ServiceRequestResponseDTO> result = pageItems.stream()
                .map(this::toResponseDTOWithTechnician)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("requests", result);
        response.put("nextCursor", nextCursor);
        response.put("hasMore", hasMore);

        return new ApiResponse<>(true, "Requests fetched successfully", response);
    }

    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN SEES THEIR OWN ACCEPTED JOBS
    // ─────────────────────────────────────────────────────────────────────
    private static final Map<RequestStatus, Integer> JOB_PRIORITY = new EnumMap<>(RequestStatus.class);
    static {
        JOB_PRIORITY.put(RequestStatus.IN_PROGRESS, 1);
        JOB_PRIORITY.put(RequestStatus.ACCEPTED, 2);
        JOB_PRIORITY.put(RequestStatus.COMPLETED, 3);
    }

    @Override
    public ApiResponse<?> getMyJobs(String technicianEmail, String cursor, int size) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        List<ServiceRequest> all = requestRepository.findByAssignedTechnicianId(technician.getId());

        if (all.isEmpty()) {
            Map<String, Object> empty = new HashMap<>();
            empty.put("requests", List.of());
            empty.put("nextCursor", null);
            empty.put("hasMore", false);
            return new ApiResponse<>(true, "You have no accepted jobs yet", empty);
        }

        List<ServiceRequest> sorted = all.stream()
                .sorted((a, b) -> {
                    int pa = JOB_PRIORITY.getOrDefault(a.getStatus(), 99);
                    int pb = JOB_PRIORITY.getOrDefault(b.getStatus(), 99);
                    if (pa != pb)
                        return Integer.compare(pa, pb);
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .toList();

        int startIndex = 0;
        if (cursor != null && !cursor.isBlank()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException ignored) {
            }
        }

        int endIndex = Math.min(startIndex + size, sorted.size());
        List<ServiceRequest> pageItems = startIndex >= sorted.size()
                ? List.of()
                : sorted.subList(startIndex, endIndex);

        boolean hasMore = endIndex < sorted.size();
        String nextCursor = hasMore ? String.valueOf(endIndex) : null;

        List<ServiceRequestResponseDTO> result = pageItems.stream()
                .map(this::toResponseDTO)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("requests", result);
        response.put("nextCursor", nextCursor);
        response.put("hasMore", hasMore);

        return new ApiResponse<>(true, "Your jobs fetched successfully", response);
    }

    // ─────────────────────────────────────────────────────────────────────
    // TECHNICIAN UPDATES JOB STATUS
    @Override
    public ApiResponse<?> updateRequestStatus(
            String requestId,
            String technicianEmail,
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
        RequestStatus expectedNext = ALLOWED_NEXT.get(currentStatus);

        if (expectedNext == null || !expectedNext.equals(newStatus)) {
            return new ApiResponse<>(false,
                    "Invalid status transition: " + currentStatus + " -> " + newStatus, null);
        }

        request.setStatus(newStatus);

        if (newStatus == RequestStatus.IN_PROGRESS) {
            request.setInProgressAt(LocalDateTime.now());

        } else if (newStatus == RequestStatus.COMPLETED) {
            request.setCompletedAt(LocalDateTime.now());
        }

        requestRepository.save(request);

        // Release technician when job is completed
        if (newStatus == RequestStatus.COMPLETED) {

            TechnicianProfile profile = technicianProfileRepository
                    .findByUserId(technician.getId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Technician profile not found"));

            profile.setBusy(false);
            technicianProfileRepository.save(profile);
        }

        return new ApiResponse<>(true, "Job status updated to " + newStatus, null);
    }

    // ─────────────────────────────────────────────────────────────────────
    // CUSTOMER RATES TECHNICIAN
    // ─────────────────────────────────────────────────────────────────────
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

    // ── mapping helpers ───────────────────────────────────────────────────

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

    private ServiceRequestResponseDTO toResponseDTOWithTechnician(
            ServiceRequest req) {

        ServiceRequestResponseDTO dto = toResponseDTO(req);

        if (req.getAssignedTechnicianId() != null) {

            userRepository.findById(req.getAssignedTechnicianId())
                    .ifPresent(tech -> {

                        TechnicianProfile profile = technicianProfileRepository
                                .findByUserId(tech.getId())
                                .orElse(null);

                        dto.setTechnician(
                                new ServiceRequestResponseDTO.TechnicianInfo(
                                        tech.getName(),
                                        tech.getPhone(),
                                        profile != null ? profile.getCity() : null,
                                        profile != null ? profile.getDistrict() : null,
                                        profile != null && profile.getTechnicianType() != null
                                                ? profile.getTechnicianType().name()
                                                : null));
                    });
        }

        return dto;
    }
}