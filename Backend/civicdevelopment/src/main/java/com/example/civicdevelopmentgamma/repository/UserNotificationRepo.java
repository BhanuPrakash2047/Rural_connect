package com.example.civicdevelopmentgamma.repository;

import com.example.civicdevelopmentgamma.model.PersonDetails;
import com.example.civicdevelopmentgamma.model.UserNotificaation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserNotificationRepo extends JpaRepository<UserNotificaation,Long> {
    List<UserNotificaation> findByUserAndIsDeletedFalse(PersonDetails user);
}
