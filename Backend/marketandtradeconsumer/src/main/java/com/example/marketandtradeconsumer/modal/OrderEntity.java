package com.example.marketandtradeconsumer.modal;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "marketservice_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "buyer_username", nullable = false)
    private PersonDetails buyer; // Buyer reference

    @ManyToOne
    @JoinColumn(name = "seller_username", nullable = false)
    private PersonDetails seller; // Seller reference

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product; // Product reference

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private String status; // Pending, Completed, Cancelled

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors, Getters, Setters
}