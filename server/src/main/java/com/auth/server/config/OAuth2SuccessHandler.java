package com.auth.server.config;

import com.auth.server.dto.AuthResponse;
import com.auth.server.entity.UserEntity;
import com.auth.server.exception.CustomBadRequestException;
import com.auth.server.service.JwtAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtAuthService jwtAuthService;

    @Value("${client.url}")
    private String clientUrl;

    public OAuth2SuccessHandler(@Lazy JwtAuthService authService){
        this.jwtAuthService=authService;
    }

    @Override
    public void onAuthenticationSuccess(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            Authentication authentication){
        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            String email=null;
            if (oAuth2User != null){
                email=oAuth2User.getAttribute("email");
            }
            UserEntity userEntity = jwtAuthService.findUserByEmail(email);

            AuthResponse authResponse = jwtAuthService.authResponse(userEntity,response);

            String targetUrl = clientUrl + "/oauth2/redirect?token="+authResponse.accessToken();

            getRedirectStrategy().sendRedirect(request,response,targetUrl);
        } catch (IOException exception){
            throw new CustomBadRequestException(exception.getMessage());
        }
    }
}
