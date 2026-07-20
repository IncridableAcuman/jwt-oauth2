package com.auth.server.producer;

import com.auth.server.config.RabbitMQConfig;
import com.auth.server.dto.EmailPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitMQProducer {
    private final RabbitTemplate template;

    public void sendMail(EmailPayload payload){
        template
                .convertAndSend(
                        RabbitMQConfig.EXCHANGE,
                        RabbitMQConfig.ROUTING_KEY,
                        payload
                );
    }
}
