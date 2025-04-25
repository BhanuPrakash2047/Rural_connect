package com.example.governmentschemesgamma.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_scheme_applications")
@NoArgsConstructor
@AllArgsConstructor
public class UserSchemeApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "username")
    private PersonDetails user; // The user who applied

    @ManyToOne
    @JoinColumn(name = "scheme_id", referencedColumnName = "id")
    private Scheme scheme; // The scheme the user applied for

    @Column(name = "application_status", length = 20)
    private String applicationStatus = "PENDING"; // PENDING, APPROVED, REJECTED

    @Column(name = "applied_date")
    private LocalDateTime appliedDate;

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public PersonDetails getUser() {
        return user;
    }

    public void setUser(PersonDetails user) {
        this.user = user;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }
}
