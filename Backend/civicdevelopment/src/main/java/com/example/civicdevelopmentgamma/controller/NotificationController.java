package com.example.civicdevelopmentgamma.controller;

import com.example.civicdevelopmentgamma.model.AdminNotification;
import com.example.civicdevelopmentgamma.model.UserNotificaation;
import com.example.civicdevelopmentgamma.model.Admin;
import com.example.civicdevelopmentgamma.model.PersonDetails;
import com.example.civicdevelopmentgamma.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/civic/notifications")
public class NotificationController {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AdminNotificationRepo adminNotificationRepo;

    @Autowired
    UserNotificationRepo userNotificationRepo;

    @Autowired
    PersonDetailsRepo personDetails;

    @Autowired
    IssueRepository issueRepository;

    // Admin Notifications Endpoints
    @GetMapping("/admin/{admin}")
    public ResponseEntity<List<AdminNotification>> getAdminNotifications(@PathVariable("admin") String adminName) {
        Admin admin = adminRepository.findByName(adminName);
        if (admin == null) {
            return ResponseEntity.notFound().build();
        }

        List<AdminNotification> notifications = adminNotificationRepo.findByAdminAndIsDeletedFalse(admin);
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/admin/{admin}")
    public ResponseEntity<String> deleteAdminNotifications(@RequestBody AdminNotification notification, @PathVariable("admin") String adminName) {
        Admin admin = adminRepository.findByName(adminName);
        if (admin == null) {
            return ResponseEntity.notFound().build();
        }

        AdminNotification existingNotification = adminNotificationRepo.findById(notification.getId())
                .orElse(null);

        if (existingNotification == null || !existingNotification.getAdmin().getId().equals(admin.getId())) {
            return ResponseEntity.badRequest().body("Notification not found or unauthorized");
        }

        existingNotification.setDeleted(true);
        adminNotificationRepo.save(existingNotification);
        return ResponseEntity.ok("Notification deleted successfully");
    }

    @PostMapping("/admin/{admin}/seen")
    public ResponseEntity<String> markAdminNotificationSeen(@PathVariable("admin") String adminName, @RequestBody AdminNotification notification) {
        Admin admin = adminRepository.findByName(adminName);
        if (admin == null) {
            return ResponseEntity.notFound().build();
        }

        AdminNotification existingNotification = adminNotificationRepo.findById(notification.getId())
                .orElse(null);

        if (existingNotification == null || !existingNotification.getAdmin().getId().equals(admin.getId())) {
            return ResponseEntity.badRequest().body("Notification not found or unauthorized");
        }

        existingNotification.setRead(true);
        adminNotificationRepo.save(existingNotification);
        return ResponseEntity.ok("Notification marked as read");
    }

    // User Notifications Endpoints
    @GetMapping("/user")
    public ResponseEntity<List<UserNotificaation>> getUserNotifications(@RequestHeader("userName") String userId) {
        PersonDetails user = personDetails.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<UserNotificaation> notifications = userNotificationRepo.findByUserAndIsDeletedFalse(user);
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/user/delete/{notificationId}")
    public ResponseEntity<String> deleteUserNotification(@RequestHeader("userName") String userId, @PathVariable Long notificationId) {
        System.out.println("Hello");
        PersonDetails user = personDetails.findById(userId).orElse(null);
        System.out.println("Id no :"+user.getIdno());
        if (user == null) {
            System.out.println("user not found");
            return ResponseEntity.notFound().build();
        }

        UserNotificaation existingNotification = userNotificationRepo.findById(notificationId)
                .orElse(null);

        if (existingNotification == null || !existingNotification.getUser().getIdno().equals(userId)) {
            return ResponseEntity.badRequest().body("Notification not found or unauthorized");
        }

        existingNotification.setDeleted(true);
        userNotificationRepo.save(existingNotification);
        return ResponseEntity.ok("Notification deleted successfully");
    }

    @PostMapping("/user/seen/{notificationId}")
    public ResponseEntity<String> markUserNotificationSeen(@RequestHeader("userName") String userId, @PathVariable Long notificationId) {
        PersonDetails user = personDetails.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        UserNotificaation existingNotification = userNotificationRepo.findById(notificationId)
                .orElse(null);
        assert existingNotification != null;
        System.out.println("this"+existingNotification.getUser().getIdno());

        if (existingNotification == null || !existingNotification.getUser().getIdno().equals(userId)) {
            return ResponseEntity.badRequest().body("Notification not found or unauthorized");
        }

        existingNotification.setRead(true);
        userNotificationRepo.save(existingNotification);
        return ResponseEntity.ok("Notification marked as read");

    }
}