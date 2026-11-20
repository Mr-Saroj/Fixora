package com.saroj.fixora.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.saroj.fixora.dto.TechnicianProfileRequest;
import com.saroj.fixora.exception.ResourceNotFoundException;
import com.saroj.fixora.model.TechnicianProfile;
import com.saroj.fixora.model.User;
import com.saroj.fixora.model.enums.Role;
import com.saroj.fixora.repository.TechnicianProfileRepository;
import com.saroj.fixora.repository.UserRepository;
import com.saroj.fixora.response.ApiResponse;
import com.saroj.fixora.service.TechnicianProfileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TechnicianProfileServiceImpl implements TechnicianProfileService {

    private final UserRepository userRepository;
    private final TechnicianProfileRepository technicianProfileRepository;

    // COMPLETE OR UPDATE TECHNICIAN PROFILE
    @Override
    public ApiResponse<?> completeProfile(
            String email,
            TechnicianProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Only technicians can complete this profile
        if (user.getRole() != Role.TECHNICIAN) {
            throw new IllegalArgumentException(
                    "Only technicians can complete technician profiles");
        }

        // Validate required fields
        if (request.technicianType() == null ||
                isBlank(request.state()) ||
                isBlank(request.district()) ||
                isBlank(request.city()) ||
                isBlank(request.pinCode()) ||
                isBlank(request.profilePhotoUrl()) ||
                isBlank(request.govtIdPhotoUrl())) {

            throw new IllegalArgumentException(
                    "All technician profile fields are required");
        }

        // Validate PIN code
        String pinCode = request.pinCode().trim();

        if (!pinCode.matches("\\d{6}")) {
            throw new IllegalArgumentException(
                    "PIN code must contain exactly 6 digits");
        }

        // Find existing profile or create a new one
        TechnicianProfile profile = technicianProfileRepository
                .findByUserId(user.getId())
                .orElseGet(TechnicianProfile::new);

        profile.setUserId(user.getId());
        profile.setTechnicianType(request.technicianType());
        profile.setState(request.state().trim());
        profile.setDistrict(request.district().trim());
        profile.setCity(request.city().trim());
        profile.setPinCode(pinCode);
        profile.setProfilePhotoUrl(request.profilePhotoUrl().trim());
        profile.setGovtIdPhotoUrl(request.govtIdPhotoUrl().trim());
        profile.setBusy(false);

        // Save technician profile
        TechnicianProfile savedProfile =
                technicianProfileRepository.save(profile);

        // Update common User information
        user.setProfileIsComplete(true);
        userRepository.save(user);

        Map<String, Object> data = new HashMap<>();

        data.put("userId", user.getId());
        data.put("technicianProfileId", savedProfile.getId());
        data.put("technicianType", savedProfile.getTechnicianType());
        data.put("state", savedProfile.getState());
        data.put("district", savedProfile.getDistrict());
        data.put("city", savedProfile.getCity());
        data.put("pinCode", savedProfile.getPinCode());
        data.put("profilePhotoUrl", savedProfile.getProfilePhotoUrl());
        data.put("govtIdPhotoUrl", savedProfile.getGovtIdPhotoUrl());
        data.put("profileIsComplete", user.isProfileIsComplete());
        data.put("busy", savedProfile.isBusy());

        return new ApiResponse<>(
                true,
                "Technician profile saved successfully!",
                data);
    }

    // GET LOGGED-IN TECHNICIAN PROFILE
    @Override
    public ApiResponse<?> getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (user.getRole() != Role.TECHNICIAN) {
            throw new IllegalArgumentException(
                    "Only technicians can access this profile");
        }

        TechnicianProfile profile = technicianProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician profile not found. Please complete your profile."));

        return new ApiResponse<>(
                true,
                "Technician profile fetched successfully!",
                profile);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}