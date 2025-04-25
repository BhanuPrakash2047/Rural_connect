package com.example.jobportalgamma.services;

import com.example.jobportalgamma.model.Notification;
import com.example.jobportalgamma.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> getUserNotifications(String username) {
        System.out.println("getUserNotifications");

        List<Notification> notificationList = notificationRepository.findByJobApplied_Applicant_IdnoOrderByCreatedAtDesc(username);

        if (notificationList == null || notificationList.isEmpty()) {
            System.out.println("No notifications found for user: " + username);
            return new ArrayList<>(); // Return an empty list instead of null
        }

        for (Notification notification : notificationList) {
            System.out.println("This Is The Notification id: " + notification.getId());
        }

        return notificationList;
    }

    public void markNotificationAsRead(Long notificationId, String username) throws Exception {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new Exception("Notification not found"));

        if (!notification.getJobApplied().getApplicant().getIdno().equals(username)) {
            throw new Exception("Not authorized to update this notification");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}