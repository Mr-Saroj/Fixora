package com.saroj.fixora.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.TechnicianType;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    List<User> findByTechnicianType(TechnicianType technicianType); // ← ADD THIS
}
