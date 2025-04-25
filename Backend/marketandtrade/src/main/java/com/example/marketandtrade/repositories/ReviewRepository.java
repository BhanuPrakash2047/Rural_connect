package com.example.marketandtrade.repositories;

import com.example.marketandtrade.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct_ProductId(Long productId); // Get reviews for a product
    @Query("SELECT r FROM Review r WHERE r.seller.idno = :sellerUsername")
    List<Review> findBySellerUsername(@Param("sellerUsername") String sellerUsername);

}