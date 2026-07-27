package com.auth.server.config;

import com.auth.server.dto.AuthResponse;
import com.auth.server.entity.UserEntity;
import com.auth.server.exception.CustomBadRequestException;
import com.auth.server.exception.CustomNotFoundException;
import com.auth.server.service.JwtAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

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
            @NonNull Authentication authentication){
        try {
            String email = getEmail(authentication);

            if (email==null){
                throw new CustomNotFoundException("Email not found from OAuth2 provider");
            }

            UserEntity userEntity = jwtAuthService.findUserByEmail(email);

            AuthResponse authResponse = jwtAuthService.authResponse(userEntity,response);

            String targetUrl = clientUrl + "/oauth2/redirect?token="+authResponse.accessToken();

            getRedirectStrategy().sendRedirect(request,response,targetUrl);
        } catch (IOException exception){
            throw new CustomBadRequestException(exception.getMessage());
        }
    }

    private static @Nullable String getEmail(Authentication authentication) {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String registrationId = oauthToken.getAuthorizedClientRegistrationId();
        String email=null;
        if (oAuth2User != null){
            Map<String,Object> attributes = oAuth2User.getAttributes();
            if ("google".equalsIgnoreCase(registrationId)){
                email = (String) attributes.get("email");
            } else if ("github".equalsIgnoreCase(registrationId)) {
                email = (String) attributes.get("email");
                if (email==null){
                    String githubLogin = (String) attributes.get("login");
                    email = githubLogin + "@github.com";
                }
            }
        }
        return email;
    }
}
