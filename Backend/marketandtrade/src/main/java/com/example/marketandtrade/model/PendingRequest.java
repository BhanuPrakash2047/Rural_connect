package com.example.marketandtrade.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "marketservice_pending_requests")
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
    @Enumerated(EnumType.STRING)
    private Enums.Status status; // Pending, Approved, Rejected

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public PersonDetails getBuyer() {
        return buyer;
    }

    public void setBuyer(PersonDetails buyer) {
        this.buyer = buyer;
    }

    public PersonDetails getSeller() {
        return seller;
    }

    public void setSeller(PersonDetails seller) {
        this.seller = seller;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public Enums.Status getStatus() {
        return status;
    }

    public void setStatus(Enums.Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}