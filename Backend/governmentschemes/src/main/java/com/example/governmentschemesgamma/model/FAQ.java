package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name = "faq") // Ensure correct table name
public class FAQ {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "`key`")  // Escape reserved keyword
    private String faqKey;

    @Column(nullable = false, name = "`value`") // Escape reserved keyword
    private String faqValue;

    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaqKey() {  // Rename to avoid conflicts
        return faqKey;
    }

    public void setFaqKey(String faqKey) {
        this.faqKey = faqKey;
    }

    public String getFaqValue() { // Rename to avoid conflicts
        return faqValue;
    }

    public void setFaqValue(String faqValue) {
        this.faqValue = faqValue;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }
}
