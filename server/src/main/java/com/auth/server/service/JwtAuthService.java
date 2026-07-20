package com.auth.server.service;

import com.auth.server.dto.*;
import com.auth.server.entity.UserEntity;
import com.auth.server.enums.Role;
import com.auth.server.exception.CustomBadRequestException;
import com.auth.server.exception.CustomNotFoundException;
import com.auth.server.producer.RabbitMQProducer;
import com.auth.server.repository.UserRepository;
import com.auth.server.util.CookieUtil;
import com.auth.server.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JwtAuthService {
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final RabbitMQProducer rabbitMQProducer;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public AuthResponse register(RegisterRequest request, HttpServletResponse response){
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new CustomBadRequestException("User already exist");}
        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        saveUser(user);
        return authResponse(user,response);
    }
    public AuthResponse login(LoginRequest request,HttpServletResponse response){
        UserEntity user = findUserByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new CustomBadRequestException("Password doesn't match");}
        return authResponse(user,response);
    }
    public void logout(String refreshToken,HttpServletResponse response){
        UserEntity user = validationAndExtractionToken(refreshToken);
        redisService.removeToken(user.getEmail());
        cookieUtil.clearCookie(response);
    }
    public AuthResponse refresh(String refreshToken,HttpServletResponse response){
        UserEntity user = validationAndExtractionToken(refreshToken);
        return authResponse(user,response);
    }
    public void forgotPassword(ForgotPasswordRequest request){
        UserEntity user = findUserByEmail(request.getEmail());
        String token = jwtUtil.getAccessToken(user);
        String url="http://localhost:5173/reset-password?token="+token;
        EmailPayload payload = new EmailPayload(user.getEmail(),"Reset Password",url);
        rabbitMQProducer.sendMail(payload);
    }
    public void resetPassword(ResetPasswordRequest request){
        if (!request.getPassword().equals(request.getConfirmPassword())){
            throw new CustomBadRequestException("Password and confirm password should be equal");
        }
        UserEntity user = validationAndExtractionToken(request.getToken());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        saveUser(user);
    }
    public UserEntity validationAndExtractionToken(String token){
        String email = jwtUtil.extractEmailFromToken(token);
        if (!jwtUtil.validateToken(token,email)){
            throw new CustomBadRequestException("Token is invalid or expired");}
        return findUserByEmail(email);
    }
    public UserEntity findUserByEmail(String email){
        return  userRepository.findByEmail(email).orElseThrow(()-> new CustomNotFoundException("User not found"));
    }
    @Transactional
    public void saveUser(UserEntity user){
        userRepository.save(user);
    }
    public AuthResponse authResponse(UserEntity user,HttpServletResponse response){
        String newRefreshToken = jwtUtil.getRefreshToken(user);
        String newAccessToken = jwtUtil.getAccessToken(user);
        cookieUtil.addCookie(newRefreshToken,response);
        redisService.saveToken(user.getEmail(), newRefreshToken);
        return AuthResponse.from(newAccessToken);
    }
}
