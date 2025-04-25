package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes_references")
public class SourceReferences{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String reference;


    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }

    // Getters and Setters
}
