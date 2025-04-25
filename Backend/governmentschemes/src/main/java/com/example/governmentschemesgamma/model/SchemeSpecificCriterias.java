package com.example.governmentschemesgamma.model;


import jakarta.persistence.*;

@Entity
@Table(name="scheme_specific_criteria")
public class SchemeSpecificCriterias{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String criteria;



    @ManyToOne
    @JoinColumn(name="user")
    private Scheme scheme;

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }
}
