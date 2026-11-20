
package com.saroj.fixora.service;

import com.saroj.fixora.dto.TechnicianProfileRequest;
import com.saroj.fixora.response.ApiResponse;

public interface TechnicianProfileService {

    ApiResponse<?> completeProfile(
            String email,
            TechnicianProfileRequest request);

    ApiResponse<?> getMyProfile(String email);
}
