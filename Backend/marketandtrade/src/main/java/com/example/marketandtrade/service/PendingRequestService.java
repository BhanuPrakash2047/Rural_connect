package com.example.marketandtrade.service;

import com.example.dto.PendingRequestDTO;
import com.example.marketandtrade.model.*;
import com.example.marketandtrade.repositories.NotificationRepository;
import com.example.marketandtrade.repositories.PendingRequestRepository;
import com.example.marketandtrade.repositories.PersonDetailsRepository;
import com.example.marketandtrade.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class PendingRequestService {

    @Autowired
    private PendingRequestRepository pendingRequestRepository;

    @Autowired
    private PersonDetailsRepository personDetailsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private KafkaTemplate<String, PendingRequestDTO> kafkaTemplate;

    private static final String TOPIC = "pending-requests";
    @Autowired
    private NotificationRepository notificationRepository;

    public PendingRequest createPendingRequest(PendingRequestDTO requestDTO) {
        PersonDetails buyer = personDetailsRepository.findById(requestDTO.getBuyerUsername())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        PersonDetails seller = personDetailsRepository.findById(requestDTO.getSellerUsername())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        ProductEntity product = productRepository.findById(requestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        PendingRequest request = new PendingRequest();
        request.setBuyer(buyer);
        request.setSeller(seller);
        request.setProduct(product);
        request.setStatus(Enums.Status.PENDING);

        Notification notify=new Notification();
        notify.setCreatedAt(LocalDateTime.now());
        notify.setUser(seller);
        notify.setMessage("User" +buyer.getFname()+seller.getLname()+"Requested For Your Details");

        notificationRepository.save(notify);
        PendingRequest savedRequest = pendingRequestRepository.save(request);

        // Send request to Kafka
        kafkaTemplate.send(TOPIC, requestDTO);

        return savedRequest;
    }

}
