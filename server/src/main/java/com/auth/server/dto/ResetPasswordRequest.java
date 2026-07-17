package com.auth.server.dto;

import com.auth.server.constants.Validation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotBlank(message = Validation.REQUIRED_TOKEN)
    private String token;

    @NotBlank(message = Validation.REQUIRED_PASSWORD)
    @Size(min = 8,max = 50,message = Validation.PASSWORD_LENGTH)
    private String password;

    @NotBlank(message = Validation.REQUIRED_CONFIRM_PASSWORD)
    @Size(min = 8,max = 50,message = Validation.CONFIRM_PASSWORD_LENGTH)
    private String confirmPassword;
}
