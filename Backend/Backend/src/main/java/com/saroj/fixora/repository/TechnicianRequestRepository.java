package com.saroj.fixora.repository;

import com.saroj.fixora.model.ServiceRequest;
import com.saroj.fixora.model.enums.RequestStatus;
import com.saroj.fixora.model.enums.TechnicianType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TechnicianRequestRepository extends MongoRepository<ServiceRequest, String> {

    // fetch requests matching technician's category and status
    List<ServiceRequest> findByCategoryAndStatus(TechnicianType category, RequestStatus status);
}