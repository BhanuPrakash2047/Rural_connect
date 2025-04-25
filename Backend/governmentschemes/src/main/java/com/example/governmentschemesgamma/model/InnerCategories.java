package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;

@Entity
@Table(name="schemes_inner_criteria_categories")
public class InnerCategories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name="scheme_specific_criterias")
    private SchemeSpecificCriterias specificCriteria;


    public SchemeSpecificCriterias getSpecificCriteria() {
        return specificCriteria;
    }

    public void setSpecificCriteria(SchemeSpecificCriterias specificCriteria) {
        this.specificCriteria = specificCriteria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
