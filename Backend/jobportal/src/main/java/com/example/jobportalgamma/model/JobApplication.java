package com.example.jobportalgamma.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "applicant_id", nullable = false) // Ensure column name matches DB
    private PersonDetails applicant;


    @Column(nullable = false)
    private Enums.JobStatus status; // PENDING, ACCEPTED, REJECTED, WITHDRAWN

    @Column(nullable = false)
    private LocalDateTime appliedAt;

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @Column(length = 1000)
    private String coverLetter;

    @Column(nullable = false)
    private boolean isActive = true;

//    // Constructor
//    public JobApplication() {
//        this.appliedAt = LocalDateTime.now();
//        this.status = "PENDING";
//    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public PersonDetails getApplicant() {
        return applicant;
    }

    public void setApplicant(PersonDetails applicant) {
        this.applicant = applicant;
    }

//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//        this.updatedAt = LocalDateTime.now();
//    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Enums.JobStatus getStatus() {
        return status;
    }

    public void setStatus(Enums.JobStatus status) {
        this.status = status;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
        this.updatedAt = LocalDateTime.now();
    }
}
