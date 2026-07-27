package com.auth.server.service;

import com.auth.server.dto.ProfileResponse;
import com.auth.server.entity.UserEntity;
import com.auth.server.exception.CustomNotFoundException;
import com.auth.server.repository.UserRepository;
import com.auth.server.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final FileUtil fileUtil;
    private final UserRepository userRepository;

    public ProfileResponse getProfile(UserEntity user){
        return ProfileResponse.from(user);
    }

    public ProfileResponse editProfileAvatar(Long id, MultipartFile avatar){
        UserEntity user = userRepository.findById(id).orElseThrow(()-> new CustomNotFoundException("User not found"));
        user.setAvatar(fileUtil.saveFile(avatar));
        UserEntity saved = userRepository.save(user);
        return ProfileResponse.from(saved);
    }
}
