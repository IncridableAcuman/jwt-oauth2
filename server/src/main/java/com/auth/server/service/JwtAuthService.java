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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtAuthService {
    @Value("${client.url}")
    private String clientUrl;
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final CookieUtil cookieUtil;
    private final JwtUtil jwtUtil;
    private final RabbitMQProducer rabbitMQProducer;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void register(RegisterRequest request){
       try {
           if (userRepository.findByEmail(request.getEmail()).isPresent()){log.warn("Existing user");throw new CustomBadRequestException("User already exist");}
           UserEntity user = new UserEntity();
           user.setUsername(request.getUsername());
           user.setEmail(request.getEmail());
           user.setPassword(passwordEncoder.encode(request.getPassword()));
           user.setRole(Role.USER);
           saveUser(user);
           sendToEmail(user);
       } catch (RuntimeException e) {log.error(e.getMessage());throw new CustomBadRequestException(e.getMessage());}
    }
    public AuthResponse login(LoginRequest request,HttpServletResponse response){
       try {
           UserEntity user = findUserByEmail(request.getEmail());
           if (!user.isEnabled()){throw new CustomBadRequestException("Email does not verified");}
           if (!passwordEncoder.matches(request.getPassword(),user.getPassword())){log.warn("Password does not matching");throw new CustomBadRequestException("Password doesn't match");}
           return authResponse(user,response);
       } catch (RuntimeException e) {log.error(e.getMessage());throw new CustomBadRequestException(e.getMessage());}
    }
    public void logout(String refreshToken,HttpServletResponse response){
        try {
            UserEntity user = validationAndExtractionToken(refreshToken);
            log.info("Validating token and get user from token");
            redisService.removeToken(user.getEmail());
            log.info("Token removing from cache");
            cookieUtil.clearCookie(response);
            log.info("Clear refresh token from cookie");
        } catch (RuntimeException e) {log.error(e.getMessage());throw new CustomBadRequestException(e.getMessage());
        }
    }
    public AuthResponse refresh(String refreshToken,HttpServletResponse response){
        try {
            UserEntity user = validationAndExtractionToken(refreshToken);
            return authResponse(user,response);
        } catch (RuntimeException e) {log.error(e.getMessage());throw new CustomBadRequestException(e.getMessage());}
    }
    public void forgotPassword(ForgotPasswordRequest request){
        try {
            UserEntity user = findUserByEmail(request.getEmail());
            String token = jwtUtil.getAccessToken(user);
            String url=clientUrl+"/reset-password?token="+token;
            EmailPayload payload = new EmailPayload(user.getEmail(),"Reset Password",url);
            log.info("Sending token for resetting password");
            rabbitMQProducer.sendMail(payload);
        } catch (RuntimeException e) {throw new CustomBadRequestException(e.getMessage());}
    }
    public void resetPassword(ResetPasswordRequest request){
       try {
           if (!request.getPassword().equals(request.getConfirmPassword())){log.warn("Warning with password matching");throw new CustomBadRequestException("Password and confirm password should be equal");}
           UserEntity user = validationAndExtractionToken(request.getToken());
           user.setPassword(passwordEncoder.encode(request.getPassword()));
           saveUser(user);
       } catch (RuntimeException e) {log.error(e.getMessage());throw new CustomBadRequestException(e.getMessage());}
    }
    public void verifyEmail(String token){
        UserEntity user = validationAndExtractionToken(token);
        user.setEnabled(true);
        saveUser(user);
    }

    public UserEntity validationAndExtractionToken(String token){
        String email = jwtUtil.validationAndExtractEmailFromToken(token);
        return findUserByEmail(email);
    }
    public UserEntity findUserByEmail(String email){
        return  userRepository.findByEmail(email).orElseThrow(()-> new CustomNotFoundException("User not found"));}
    @Transactional
    public void saveUser(UserEntity user){
        userRepository.save(user);
    }
    public AuthResponse authResponse(UserEntity user,HttpServletResponse response){
        log.info("Generating access,refresh tokens");
        String newRefreshToken = jwtUtil.getRefreshToken(user);
        String newAccessToken = jwtUtil.getAccessToken(user);
        log.info("Refresh token added to cookie and caching with redis");
        cookieUtil.addCookie(newRefreshToken,response);
        redisService.saveToken(user.getEmail(), newRefreshToken);
        return AuthResponse.from(newAccessToken);
    }
    public void sendToEmail(UserEntity user){
        String token = jwtUtil.getAccessToken(user);
        String url = clientUrl + "/verify-email?token="+token;
        EmailPayload payload = new EmailPayload(user.getEmail(),"Verify Email",url);
        rabbitMQProducer.sendMail(payload);
    }
}
