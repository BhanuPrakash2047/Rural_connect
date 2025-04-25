package com.example.marketandtrade.controller;
import com.example.dto.PendingRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KakfkaListener {

    private final SimpMessagingTemplate messagingTemplate;

    public KakfkaListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "pending-requests", groupId = "market-group", containerFactory = "kafkaListenerContainerFactory")
    public void listenPendingRequests(PendingRequestDTO pendingRequestDTO) {

        System.out.println("Received request from Kafka: " + pendingRequestDTO);
        messagingTemplate.convertAndSend("/topic/acceptedRequests", pendingRequestDTO);

    }
}
