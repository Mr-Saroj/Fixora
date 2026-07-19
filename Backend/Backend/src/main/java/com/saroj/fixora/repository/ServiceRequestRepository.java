package com.saroj.fixora.repository;

import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {

    // 🔑 This is the core query — technician sees only their category + pending requests
    List<ServiceRequest> findByCategoryAndStatus(TechnicianType category, RequestStatus status);

    List<ServiceRequest> findByCustomerId(String customerId);
}