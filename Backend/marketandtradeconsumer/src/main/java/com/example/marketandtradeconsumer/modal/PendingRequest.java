package com.example.marketandtradeconsumer.modal;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "marketservice_pending_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PendingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "buyer_username", nullable = false)
    private PersonDetails buyer;

    @ManyToOne
    @JoinColumn(name = "seller_username", nullable = false)
    private PersonDetails seller;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(nullable = false)
    private String status; // Pending, Approved, Rejected

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors, Getters, Setters
}