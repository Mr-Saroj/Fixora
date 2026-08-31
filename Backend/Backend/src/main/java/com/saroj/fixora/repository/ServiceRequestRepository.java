package com.saroj.fixora.repository;

import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;

import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {

    Page<ServiceRequest> findByCategoryAndStatusOrderByCreatedAtDesc(
            TechnicianType category, RequestStatus status, Pageable pageable);

    List<ServiceRequest> findByCustomerId(String customerId);
    List<ServiceRequest> findByAssignedTechnicianId(String assignedTechnicianId);
}