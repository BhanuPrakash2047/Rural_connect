package com.example.civicdevelopmentgamma.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="civic_comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String comment;

    @Column
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name="user_commented")
    private PersonDetails user;

    @ManyToOne
    @JoinColumn(name="issue")
    private Issue issue;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public PersonDetails getUser() {
        return user;
    }

    public void setUser(PersonDetails user) {
        this.user = user;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", time=" + time +
                ", user=" + user +
                ", issue=" + issue +
                '}';
    }
}
