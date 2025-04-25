package com.example.jobportalgamma.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

// Notification.java
@Entity
@Table(name = "jobportal_notifications")

public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="job_application_id",nullable = false)
    private JobApplication jobApplied;

    public JobApplication getJobApplied() {
        return jobApplied;
    }

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private String type; // JOB_UPDATE, COMMENT, LIKE, etc.

    @Column(nullable = true)
    private boolean isRead;

    @Column(nullable = false)
    private LocalDateTime createdAt;

//    @Column(nullable = false)
//    private Enums.JobStatus jobStatus;

    public void setJobApplied(JobApplication jobApplied) {
        this.jobApplied = jobApplied;
    }

//    public Enums.JobStatus getJobStatus() {
//        return jobStatus;
//    }
//
//    public void setJobStatus(Enums.JobStatus jobStatus) {
//        this.jobStatus = jobStatus;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public PersonDetails getUser() {
//        return user;
//    }
//
//    public void setUser(PersonDetails user) {
//        this.user = user;
//    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

//    public Job getJobApplied() {
//        return jobApplied;
//    }
//
//    public void setJobApplied(Job jobApplied) {
//        this.jobApplied = jobApplied;
//    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
