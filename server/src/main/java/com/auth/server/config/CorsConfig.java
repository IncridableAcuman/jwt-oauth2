package com.auth.server.config;

import com.auth.server.exception.CustomBadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        try {
            CorsConfiguration configuration = new CorsConfiguration();
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            configuration.setAllowCredentials(true);
            configuration.setExposedHeaders(List.of("*"));
            configuration.setAllowedHeaders(List.of("*"));
            configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","PATCH"));
            configuration.setAllowedOrigins(List.of("http://localhost:5173"));

            source.registerCorsConfiguration("/**",configuration);

            return source;
        } catch (RuntimeException e) {
            log.error(e.getLocalizedMessage());
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
