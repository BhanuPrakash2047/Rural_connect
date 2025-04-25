package com.example.civicdevelopmentgamma.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "civic_issues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 100)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus status = IssueStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @Column(nullable = true)
    private String status_discription;

    @Column(nullable =false)
    private Integer count;

    @Column(nullable = true)
    private String response_from_admin;

    @Column(nullable = true)
    private String response_from_user;

    public String getResponse_from_admin() {
        return response_from_admin;
    }

    public void setResponse_from_admin(String response_from_admin) {
        this.response_from_admin = response_from_admin;
    }

    public String getResponse_from_user() {
        return response_from_user;
    }

    public void setResponse_from_user(String response_from_user) {
        this.response_from_user = response_from_user;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getStatus_discription() {
        return status_discription;
    }

    public void setStatus_discription(String discription) {
        this.status_discription = discription;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private PersonDetails user; // Who created the issue


    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin assignedAdmin; // Admin assigned to solve the issue

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public PersonDetails getUser() {
        return user;
    }

    public void setUser(PersonDetails user) {
        this.user = user;
    }

    public Admin getAssignedAdmin() {
        return assignedAdmin;
    }

    public void setAssignedAdmin(Admin assignedAdmin) {
        this.assignedAdmin = assignedAdmin;
    }

//    public List<Vote> getVotes() {
//        return votes;
//    }
//
//    public void setVotes(List<Vote> votes) {
//        this.votes = votes;
//    }
}
