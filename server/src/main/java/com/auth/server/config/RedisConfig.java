package com.auth.server.config;

import com.auth.server.exception.CustomBadRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;

import java.time.Duration;

@Slf4j
@Configuration
public class RedisConfig {

    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory factory){
       try {
           RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                   .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.string()))
                   .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.json()))
                   .entryTtl(Duration.ofMinutes(10));
           return RedisCacheManager.builder(factory).cacheDefaults(configuration).build();
       } catch (RuntimeException e) {
           throw new CustomBadRequestException(e.getMessage());
       }
    }
    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory factory){
        try {
            RedisTemplate<String,Object> template = new RedisTemplate<>();
            template.setConnectionFactory(factory);
            template.setKeySerializer(RedisSerializer.string());
            template.setValueSerializer(RedisSerializer.json());
            return template;
        } catch (RuntimeException e) {
            log.error(e.getLocalizedMessage());
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
