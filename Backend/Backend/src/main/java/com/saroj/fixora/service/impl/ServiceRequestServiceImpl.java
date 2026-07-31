package com.saroj.fixora.service.impl;

import com.saroj.fixora.dto.RatingRequest;
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
import org.springframework.stereotype.Service;

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

    // defines which status a technician is allowed to move a job to next
    private static final Map<RequestStatus, RequestStatus> ALLOWED_NEXT = new EnumMap<>(RequestStatus.class);
    static {
        ALLOWED_NEXT.put(RequestStatus.ACCEPTED, RequestStatus.IN_PROGRESS);
        ALLOWED_NEXT.put(RequestStatus.IN_PROGRESS, RequestStatus.COMPLETED);
    }

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
        return new ApiResponse<>(true, "Service request created successfully!", saved.getId());
    }

    @Override
    public ApiResponse<?> getRequestsForTechnician(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        if (technician.getTechnicianType() == null) {
            throw new ResourceNotFoundException("This user has no technician type set");
        }

        List<ServiceRequest> requests = requestRepository.findByCategoryAndStatus(
                technician.getTechnicianType(), RequestStatus.PENDING);

        return new ApiResponse<>(true, "Requests fetched successfully!", requests);
    }

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
    public ApiResponse<?> acceptRequest(String requestId, String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        // ── Subscription check ──────────────────────────────────────────────
        // MongoDB stores subscriptionEndDate as full datetime (e.g. 2026-08-28T18:30:00.000+00:00)
        // Spring deserializes it into LocalDate as the UTC date portion (2026-08-28)
        // We compare against today's date in UTC to stay consistent
        LocalDate today = LocalDate.now(ZoneOffset.UTC);

        if (technician.getSubscriptionEndDate() == null) {
            return new ApiResponse<>(false,
                    "No active subscription found. Please claim a subscription plan to accept service requests.",
                    null);
        }

        if (!technician.getSubscriptionEndDate().isAfter(today)) {
            // isAfter(today) == false  →  endDate <= today  →  expired or expiring today
            String expiredOn = technician.getSubscriptionEndDate()
                    .format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));
            return new ApiResponse<>(false,
                    "Your subscription expired on " + expiredOn +
                    ". Please renew your plan to accept service requests.",
                    null);
        }
        // ───────────────────────────────────────────────────────────────────

        ServiceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getStatus() != RequestStatus.PENDING) {
            return new ApiResponse<>(false, "This request is no longer available", null);
        }

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
                ") does not match the customer's location. You can only accept nearby jobs.", null);
        }

        request.setStatus(RequestStatus.ACCEPTED);
        request.setAssignedTechnicianId(technician.getId());
        requestRepository.save(request);

        return new ApiResponse<>(true, "Job accepted successfully!", null);
    }

    @Override
    public ApiResponse<?> getMyJobs(String technicianEmail) {
        User technician = userRepository.findByEmail(technicianEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Technician not found"));

        List<ServiceRequest> jobs = requestRepository.findByAssignedTechnicianId(technician.getId());

        if (jobs.isEmpty()) {
            return new ApiResponse<>(true, "You have no accepted jobs yet", List.of());
        }

        // NOTE: intentionally does NOT attach technician info here (it's their own account)
        List<ServiceRequestResponseDTO> result = jobs.stream()
                .map(this::toResponseDTO)
                .toList();

        return new ApiResponse<>(true, "Your jobs fetched successfully", result);
    }

    @Override
    public ApiResponse<?> updateRequestStatus(String requestId, String technicianEmail, UpdateStatusRequest dto) {
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
        requestRepository.save(request);

        return new ApiResponse<>(true, "Job status updated to " + newStatus, null);
    }

    @Override
    public ApiResponse<?> rateTechnician(String requestId, String customerEmail, RatingRequest dto) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        ServiceRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        // ownership check — must be the customer's own request
        if (!request.getCustomerId().equals(customer.getId())) {
            return new ApiResponse<>(false, "This request does not belong to you", null);
        }

        // can only rate a job that's actually finished
        if (request.getStatus() != RequestStatus.COMPLETED) {
            return new ApiResponse<>(false, "You can only rate a completed job", null);
        }

        // one rating per job — don't allow silently overwriting
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

    // ── mapping helpers ─────────────────────────────────────────

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
                            tech.getTechnicianType() != null ? tech.getTechnicianType().name() : null
                    ))
            );
        }
        return dto;
    }
}