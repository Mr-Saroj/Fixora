package com.saroj.fixora.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.saroj.fixora.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateResource(DuplicateResourceException ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        ApiResponse<Void> response = new ApiResponse<>(false, "An unexpected error occurred", null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Error
    }
}
