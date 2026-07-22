package com.auth.server.constants;


import org.springframework.beans.factory.annotation.Value;

public final class Values {
    @Value("${client.url}")
    public static String clientUrl;
    @Value("${jwt.secret}")
    public static String jwtSecret;
    @Value("${jwt.access_time}")
    public static long accessTime;
    @Value("${jwt.refresh_time}")
    public static long refreshTime;
    @Value("${file.upload.dir}")
    public static String uploadDir;
}
