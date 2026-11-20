
package com.saroj.fixora.dto;

import com.saroj.fixora.model.enums.TechnicianType;

public record TechnicianProfileRequest(
        TechnicianType technicianType,
        String state,
        String district,
        String city,
        String pinCode,
        String profilePhotoUrl,
        String govtIdPhotoUrl
) {
}
