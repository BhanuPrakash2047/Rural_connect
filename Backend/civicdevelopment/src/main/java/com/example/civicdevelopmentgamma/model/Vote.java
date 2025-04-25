package com.example.civicdevelopmentgamma.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "civic_votes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue; // The issue this vote belongs to

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private PersonDetails user; // The user who voted

    @Column(nullable = false)
    private boolean isFakeVote; // If true, this vote is marking the issue as fake

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

    public boolean isFakeVote() {
        return isFakeVote;
    }

    public void setFakeVote(boolean fakeVote) {
        isFakeVote = fakeVote;
    }
}
