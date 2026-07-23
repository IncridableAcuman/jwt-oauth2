package com.auth.server.util;

import com.auth.server.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.access_time}")
    private long accessTime;
    @Value("${jwt.refresh_time}")
    private long refreshTime;

    private Key jwtKey;

    @PostConstruct
    public void init(){
        this.jwtKey= Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
    private String generateToken(UserEntity userEntity,long expiration){
        Map<String, Object> claims = new HashMap<>();
        long currentMillis = System.currentTimeMillis();
        Date issueAt = new Date(currentMillis);
        Date tokenExpiration = new Date(currentMillis + expiration);

        claims.put("id",userEntity.getId());
        claims.put("role",userEntity.getRole());
        return Jwts
                .builder()
                .setSubject(userEntity.getEmail())
                .addClaims(claims)
                .setIssuedAt(issueAt)
                .setExpiration(tokenExpiration)
                .signWith(jwtKey)
                .compact();

    }
    public String getAccessToken(UserEntity user){
        return generateToken(user, accessTime);
    }
    public String getRefreshToken(UserEntity user){
        return generateToken(user, refreshTime);
    }
    private Claims extractClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(jwtKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String extractEmailFromToken(String token){
        return extractClaims(token).getSubject();
    }
    public Date extractTokenExpiration(String token){
        return extractClaims(token).getExpiration();
    }
    public boolean isTokenExpiration(String token){
        return extractTokenExpiration(token).before(new Date());
    }
    public boolean validateToken(String token){
        try {
            return !isTokenExpiration(token);
        } catch (Exception e) {
            return false;
        }
    }
}
