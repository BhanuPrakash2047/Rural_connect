package com.example.jobportalgamma.model;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobportal_likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private PersonDetails user;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @ManyToOne
    @JoinColumn(name = "story_id")
    private Story story;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}