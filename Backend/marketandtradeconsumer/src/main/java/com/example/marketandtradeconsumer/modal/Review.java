package com.example.marketandtradeconsumer.modal;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "marketservice_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "buyer_username", nullable = false)
    private PersonDetails buyer; // The person who bought the product

    @ManyToOne
    @JoinColumn(name = "seller_username", nullable = false)
    private PersonDetails seller; // The person selling the product

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(nullable = false)
    private int rating; // Rating from 1 to 5

    @Column(columnDefinition = "TEXT")
    private String reviewText;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors, Getters, Setters
}