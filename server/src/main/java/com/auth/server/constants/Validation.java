package com.auth.server.constants;

import lombok.Data;

@Data
public final class  Validation {
    // start validation message
    public static final String REQUIRED_EMAIL="Email is required";
    public static final String INVALID_EMAIL="Invalid email format";
    public static final String REQUIRED_PASSWORD="Password is required";
    public static final String PASSWORD_LENGTH="Password length must be between 8 and 50 character";
    public static final String REQUIRED_USERNAME="Username is required";
    public static final String USERNAME_LENGTH="Username must be between 3 and 50 character";
    public static final String CONFIRM_PASSWORD_LENGTH="Confirm password must be between 8 and 50 character";
    public static final String REQUIRED_CONFIRM_PASSWORD="Confirm password is required";
    public static final String REQUIRED_TOKEN="Token is required";
    // end validation message
}
