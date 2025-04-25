package com.example.governmentschemesgamma.model;

//package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes_document_requirements")
public class DocumentRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String documentName;


    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }
}