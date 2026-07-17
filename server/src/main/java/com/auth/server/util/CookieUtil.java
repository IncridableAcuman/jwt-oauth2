package com.auth.server.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
    @Value("${jwt.refresh_time}")
    private int refreshTime;

    private void cookieManaging(String refreshToken, int expiration, HttpServletResponse response){
        Cookie cookie = new Cookie("refreshToken",refreshToken);
        cookie.setHttpOnly(true);
        cookie.setValue(refreshToken);
        cookie.setMaxAge(expiration);
        cookie.setSecure(false);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
    public void addCookie(String refreshToken,HttpServletResponse response){
        cookieManaging(refreshToken,refreshTime/1000,response);
    }
    public void clearCookie(HttpServletResponse response){
        cookieManaging(null,0,response);
    }
}
