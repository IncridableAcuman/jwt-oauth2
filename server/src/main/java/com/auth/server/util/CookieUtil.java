package com.auth.server.util;

import com.auth.server.exception.CustomBadRequestException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class CookieUtil {
    @Value("${jwt.refresh_time}")
    private int refreshTime;


    private void cookieManaging(String refreshToken, int expiration, HttpServletResponse response){
        try {
            Cookie cookie = new Cookie("refreshToken",refreshToken);
            cookie.setHttpOnly(true);
            cookie.setValue(refreshToken);
            cookie.setMaxAge(expiration);
            cookie.setSecure(false);
            cookie.setPath("/");

            response.addCookie(cookie);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new CustomBadRequestException(e.getMessage());
        }
    }
    public void addCookie(String refreshToken,HttpServletResponse response){
        cookieManaging(refreshToken, refreshTime/1000,response);
    }
    public void clearCookie(HttpServletResponse response){
        cookieManaging(null,0,response);
    }
}
