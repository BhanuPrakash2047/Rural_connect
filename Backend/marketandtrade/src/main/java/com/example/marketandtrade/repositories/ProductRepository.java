package com.example.marketandtrade.repositories;

import com.example.marketandtrade.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
//    List<ProductEntity> findBySeller_Username(String username); // Get products by seller
//    List<ProductEntity> findByCategory(String category); // Get products by category
}
