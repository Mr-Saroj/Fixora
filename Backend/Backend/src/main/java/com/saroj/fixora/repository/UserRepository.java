package com.saroj.fixora.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.Role;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);
}