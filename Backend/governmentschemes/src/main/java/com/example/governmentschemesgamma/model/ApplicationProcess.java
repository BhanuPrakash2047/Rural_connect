package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes_application_process")
public class ApplicationProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String steps;


    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationProcessSteps() {
        return steps;
    }

    public void setApplicationProcessSteps(String applicationProcessSteps) {
        this.steps = applicationProcessSteps;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }


// Getters and Setters
}