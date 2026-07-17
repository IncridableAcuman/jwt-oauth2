package com.auth.server.dto;

import com.auth.server.constants.Validation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = Validation.REQUIRED_USERNAME)
    @Size(min = 3,max = 50,message = Validation.USERNAME_LENGTH)
    private String username;

    @NotBlank(message = Validation.REQUIRED_EMAIL)
    @Email(message = Validation.INVALID_EMAIL)
    private String email;

    @NotBlank(message = Validation.REQUIRED_PASSWORD)
    @Size(min = 8,max = 50,message = Validation.PASSWORD_LENGTH)
    private String password;
}
