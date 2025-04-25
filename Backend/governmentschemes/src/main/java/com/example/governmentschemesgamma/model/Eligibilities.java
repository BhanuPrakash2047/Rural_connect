package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes_eligibilty_requirements")
public class Eligibilities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eligibilities;


    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEligibilities() {
        return eligibilities;
    }

    public void setEligibilities(String eligibilities) {
        this.eligibilities = eligibilities;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }
}