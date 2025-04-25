package com.example.marketandtradeconsumer.repositories;


//import com.example.marketandtrade.modal.Notification;
import com.example.marketandtradeconsumer.modal.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}