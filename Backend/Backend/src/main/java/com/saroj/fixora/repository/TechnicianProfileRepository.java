
package com.saroj.fixora.repository;

import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.enums.TechnicianType;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TechnicianProfileRepository
        extends MongoRepository<TechnicianProfile, String> {

    Optional<TechnicianProfile> findByUserId(String userId);

    List<TechnicianProfile> findByTechnicianType(
            TechnicianType technicianType
    );
}
