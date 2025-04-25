package com.example.dto;
//import com.example.marketandtrade.model.Enums;
import com.example.marketandtradeconsumer.modal.Enums;

import java.time.LocalDateTime;


public class PendingRequestDTO {
    private String buyerUsername;
    private String sellerUsername;
    private Long productId;
    private Enums.Status status;
    private LocalDateTime createdAt;

    public String getBuyerUsername() {
        return buyerUsername;
    }

    public void setBuyerUsername(String buyerUsername) {
        this.buyerUsername = buyerUsername;
    }

    public String getSellerUsername() {
        return sellerUsername;
    }

    public void setSellerUsername(String sellerUsername) {
        this.sellerUsername = sellerUsername;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
