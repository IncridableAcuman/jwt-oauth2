package com.auth.server.controller;

import org.springframework.http.MediaType;

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
    @PatchMapping("/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProfileResponse> editProfileAvatar(@PathVariable Long id, @RequestPart("avatar") MultipartFile avatar){
        return ResponseEntity.ok(profileService.editProfileAvatar(id,avatar));
    }
}
