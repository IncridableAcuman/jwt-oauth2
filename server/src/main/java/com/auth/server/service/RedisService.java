package com.auth.server.service;

import com.auth.server.exception.CustomBadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {
    @Value("${jwt.refresh_time}")
    private long refreshTime;

    private final RedisTemplate<String,Object> template;

    public String getKey(String email){
        if (email==null || email.isEmpty()){
            throw new CustomBadRequestException("User id is null or empty");
        }
        return "refreshToken:"+email;
    }
    public String getToken(String email){
        String key = getKey(email);
        Object token = template.opsForValue().get(key);
        return token!=null ? token.toString(): null;
    }
    public void saveToken(String email,String refreshToken){
        String key = getKey(email);
        template
                .opsForValue().set(
                        key,
                        refreshToken,
                        refreshTime,
                        TimeUnit.MILLISECONDS
                );
    }
    public void removeToken(String email){
        String key = getKey(email);
        template.delete(key);
    }
}
