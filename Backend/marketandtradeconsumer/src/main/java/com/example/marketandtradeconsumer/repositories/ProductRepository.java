package com.example.marketandtradeconsumer.repositories;

import com.example.marketandtradeconsumer.modal.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

}
