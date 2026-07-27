package com.auth.server.dto;

import com.auth.server.entity.UserEntity;
import com.auth.server.enums.Role;

public record ProfileResponse(
        Long id,
        String username,
        String email,
        Role role,
        String avatar,
        boolean enabled
) {
    public static ProfileResponse from(UserEntity user){
        return new ProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getAvatar(),
                user.isEnabled()
        );
    }
}
