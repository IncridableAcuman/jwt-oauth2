package com.auth.server.util;

import com.auth.server.config.RabbitMQConfig;
import com.auth.server.dto.EmailPayload;
import com.auth.server.exception.CustomInternalServerErrorException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class MailUtil {
    private final JavaMailSender javaMailSender;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void sendMail(EmailPayload payload){
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(payload.to());
            helper.setSubject(payload.subject());
            helper.setText(payload.text(),true);
            log.info("Message sending");
            javaMailSender.send(message);
        } catch (MessagingException exception){
            log.error(exception.getMessage());
            throw new CustomInternalServerErrorException(exception.getMessage());
        }
    }
}
