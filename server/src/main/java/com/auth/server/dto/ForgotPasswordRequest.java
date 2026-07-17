package com.auth.server.dto;

import com.auth.server.constants.Validation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
    @NotBlank(message = Validation.REQUIRED_EMAIL)
    @Email(message = Validation.INVALID_EMAIL)
    private String email;
}
