package com.auth.server.controller;

import com.auth.server.dto.ProfileResponse;
import com.auth.server.entity.UserEntity;
import com.auth.server.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(@AuthenticationPrincipal UserEntity user){
        return ResponseEntity.ok(profileService.getProfile(user));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ProfileResponse> editProfileAvatar(@PathVariable Long id, @ModelAttribute MultipartFile avatar){
        return ResponseEntity.ok(profileService.editProfileAvatar(id,avatar));
    }
}
