package com.auth.server.service;

import com.auth.server.entity.UserEntity;
import com.auth.server.enums.Role;
import com.auth.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public @NonNull OAuth2User loadUser(@NonNull OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
            OAuth2User user = super.loadUser(userRequest);

            String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String,Object> attributes = user.getAttributes();

            String email = null;
            String name = null;
            String image = null;

            if ("google".equalsIgnoreCase(registrationId)){
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                image = (String) attributes.get("picture");
            } else if ("github".equalsIgnoreCase(registrationId)) {
                email = (String) attributes.get("email");

                String githubLogin = (String) attributes.get("login");
                if (email==null){
                    email = githubLogin + "@github.com";
                }
                name = attributes.get("name") != null ? (String) attributes.get("name") : githubLogin;

                image = (String) attributes.get("avatar_url");
            }

            if (email==null){
                log.error("OAuth2 providerdan emailni olib bo'lmadi: {}",registrationId);
                throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
            }
            final String finalEmail=email;
            final String finalName = name;
            final String finalImage = image;


        userRepository.findByEmail(email).orElseGet(()->{
                UserEntity newUser = new UserEntity();
                newUser.setUsername(finalName != null ? finalName : finalEmail);
                newUser.setEmail(finalEmail);
                newUser.setAvatar(finalImage);
                newUser.setPassword("");
                newUser.setRole(Role.USER);
                return userRepository.save(newUser);
            });
            return user;
    }
}
