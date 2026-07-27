package com.auth.server.service;

import com.auth.server.dto.ProfileResponse;
import com.auth.server.entity.UserEntity;
import com.auth.server.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final FileUtil fileUtil;

    public ProfileResponse getProfile(UserEntity user){
        return ProfileResponse.from(user);
    }
}
