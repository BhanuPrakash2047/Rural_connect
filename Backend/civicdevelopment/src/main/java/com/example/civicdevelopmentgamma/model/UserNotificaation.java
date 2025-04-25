package com.example.civicdevelopmentgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name="civic_user_notification")
public class UserNotificaation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="issue")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name ="user")
    private PersonDetails user;

    @Column
    private Boolean isRead = false;

    @Column
    private Boolean isDeleted = false;

    @Column
    private String discription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public PersonDetails getUser() {
        return user;
    }

    public void setUser(PersonDetails user) {
        this.user = user;
    }

    public Boolean getRead() {
        return isRead;
    }

    public void setRead(Boolean read) {
        isRead = read;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }
}