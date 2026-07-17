package com.auth.server.dto;

public record EmailPayload(
        String to,
        String subject,
        String text
) {
}
