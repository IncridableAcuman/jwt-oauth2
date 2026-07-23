package com.auth.server.config;

import java.io.IOException;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth.server.service.UserDetailsServiceImp;
import com.auth.server.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final UserDetailsServiceImp userDetailsServiceImp;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token=null;
        String email=null;
        if (header!=null && header.startsWith("Bearer ")){
            token=header.substring(7);
            
            try {
                email= jwtUtil.extractEmailFromToken(token);
            } catch(Exception e){
                filterChain.doFilter(request, response);
                return;
            }
        }
        if (email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(email);
            if (jwtUtil.validateToken(token)){
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
