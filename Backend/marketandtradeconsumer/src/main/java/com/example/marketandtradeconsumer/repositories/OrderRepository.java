package com.example.marketandtradeconsumer.repositories;



import com.example.marketandtradeconsumer.modal.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

}