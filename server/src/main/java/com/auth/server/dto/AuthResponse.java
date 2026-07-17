package com.auth.server.dto;

public record AuthResponse(
        String accessToken
) {
    public static AuthResponse from(String accessToken){
        return new AuthResponse(accessToken);
    }
}
