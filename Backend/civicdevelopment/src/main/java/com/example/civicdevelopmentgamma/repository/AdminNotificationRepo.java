package com.example.civicdevelopmentgamma.repository;

import com.example.civicdevelopmentgamma.model.Admin;
import com.example.civicdevelopmentgamma.model.AdminNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminNotificationRepo extends JpaRepository<AdminNotification, Long> {
    List<AdminNotification> findByAdminAndIsDeletedFalse(Admin admin);
}
