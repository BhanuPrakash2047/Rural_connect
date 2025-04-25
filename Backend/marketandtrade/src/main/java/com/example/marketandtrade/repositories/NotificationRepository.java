package com.example.marketandtrade.repositories;


import com.example.marketandtrade.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
//    List<Notification> findByUser_Username(String username); // Get notifications for a user
}