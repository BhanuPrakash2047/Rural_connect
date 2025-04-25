package com.example.jobportalgamma.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

// Content.java
@Entity
@Table(name = "jobportal_content")

public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 5000)
    private String body;

    @Column(nullable = false)
    private String type; // TECH_UPDATE, EDUCATIONAL, NEWS

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private PersonDetails author;

//    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
//    private List<Comment> comments;
//
//    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
//    private List<Like> likes;

    private boolean isFlagged;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @Column
    private Integer flagCount;


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

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public PersonDetails getAuthor() {
        return author;
    }

    public void setAuthor(PersonDetails author) {
        this.author = author;
    }

    public boolean isFlagged() {
        return isFlagged;
    }

    public void setFlagged(boolean flagged) {
        isFlagged = flagged;
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

    public Integer getFlagCount() {
        return flagCount;
    }

    public void setFlagCount(Integer flagCount) {
        this.flagCount = flagCount;
    }
}
