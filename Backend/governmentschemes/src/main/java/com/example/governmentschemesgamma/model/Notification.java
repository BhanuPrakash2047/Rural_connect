package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "governemnt_schemes_notifications")
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "username")
    private PersonDetails user; // The user receiving the notification

    @Column(name = "notification_type", length = 20)
    private String notificationType; // SMS, EMAIL, IVRS

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "status", length = 20)
    private String status = "PENDING"; // PENDING, SENT, FAILED

    @Column(name = "sent_date")
    private LocalDateTime sentDate;

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public PersonDetails getUser() {
        return user;
    }

    public void setUser(PersonDetails user) {
        this.user = user;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSentDate() {
        return sentDate;
    }

    public void setSentDate(LocalDateTime sentDate) {
        this.sentDate = sentDate;
    }
}
