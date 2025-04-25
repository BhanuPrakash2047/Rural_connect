package com.example.marketandtrade.repositories;


import com.example.marketandtrade.model.OrderEntity;
import com.example.marketandtrade.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByBuyer(PersonDetails personDetails);
    List<OrderEntity> findBySeller(PersonDetails personDetails);
//    List<OrderEntity> findByBuyer_Username(String username); // Get orders by buyer
//    List<OrderEntity> findBySeller_Username(String username); // Get orders by seller
}
