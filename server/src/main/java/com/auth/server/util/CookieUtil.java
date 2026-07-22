package com.auth.server.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import static com.auth.server.constants.Values.refreshTime;

@Component
public class CookieUtil {

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
        cookieManaging(refreshToken, (int) (refreshTime/1000),response);
    }
    public void clearCookie(HttpServletResponse response){
        cookieManaging(null,0,response);
    }
}
