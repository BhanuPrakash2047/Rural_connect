package com.example.governmentschemesgamma.model;

import jakarta.persistence.*;
import lombok.*;
import com.example.governmentschemesgamma.model.Enums.*;

import java.util.List;

@Entity
@Table(name = "schemes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public int getStart_age() {
        return start_age;
    }

    public void setStart_age(int start_age) {
        this.start_age = start_age;
    }

    public int getEnd_age() {
        return end_age;
    }

    public void setEnd_age(int end_age) {
        this.end_age = end_age;
    }

    public Integer getStart_disabilityPercentage() {
        return start_disabilityPercentage;
    }

    public void setStart_disabilityPercentage(Integer start_disabilityPercentage) {
        this.start_disabilityPercentage = start_disabilityPercentage;
    }

    public Integer getEnd_disabilityPercentage() {
        return end_disabilityPercentage;
    }

    public void setEnd_disabilityPercentage(Integer end_disabilityPercentage) {
        this.end_disabilityPercentage = end_disabilityPercentage;
    }

    @ManyToOne
    @JoinColumn(name="contributor")
    private PersonDetails contributor;

    public PersonDetails getContributor() {
        return contributor;
    }

    public void setContributor(PersonDetails contributor) {
        this.contributor = contributor;
    }

    @Column(name = "scheme_name", nullable = false, length = 255)
    private String schemeName;

    @Column
    private Enums.Category category;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private Enums.State state;


    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Enums.Gender gender;

    @Column(name = "start_age")
    private int start_age;

    @Column(name = "end_age")
    private int end_age;

    @Enumerated(EnumType.STRING)
    @Column(name = "caste")
    private Caste caste;

    @Enumerated(EnumType.STRING)
    @Column(name = "residence")
    private Residence residence;

    @Enumerated(EnumType.STRING)
    @Column(name = "minority")
    private BooleanEnum minority;

    @Enumerated(EnumType.STRING)
    @Column(name = "differently_abled")
    private BooleanEnum differentlyAbled;

    @Enumerated(EnumType.STRING)
    @Column(name = "benefit_type")
    private BenefitType benefitType;

    @Enumerated(EnumType.STRING)
    @Column(name = "dbt_scheme")
    private BooleanEnum dbtScheme;

    @Column(name = "start_disability_percentage")
    private Integer start_disabilityPercentage;

    @Column(name = "end_disability_percentage")
    private Integer end_disabilityPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "below_poverty_line")
    private BooleanEnum belowPovertyLine;

    @Enumerated(EnumType.STRING)
    @Column(name = "government_employee")
    private BooleanEnum governmentEmployee;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_status")
    private EmploymentStatus employmentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "student")
    private BooleanEnum student;

    @Enumerated(EnumType.STRING)
    @Column(name = "occupation")
    private Occupation occupation;

    @Column(name = "benefits", columnDefinition = "TEXT")
    private String benefits;

    @Column(name = "exclusions", columnDefinition = "TEXT")
    private String exclusions;

    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    @Column
    private Integer upvotes=0;



    public Integer getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(Integer upvotes) {
        this.upvotes = upvotes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }


    public Caste getCaste() {
        return caste;
    }

    public void setCaste(Caste caste) {
        this.caste = caste;
    }

    public Residence getResidence() {
        return residence;
    }

    public void setResidence(Residence residence) {
        this.residence = residence;
    }

    public BooleanEnum getMinority() {
        return minority;
    }

    public void setMinority(BooleanEnum minority) {
        this.minority = minority;
    }

    public BooleanEnum getDifferentlyAbled() {
        return differentlyAbled;
    }

    public void setDifferentlyAbled(BooleanEnum differentlyAbled) {
        this.differentlyAbled = differentlyAbled;
    }

    public BenefitType getBenefitType() {
        return benefitType;
    }

    public void setBenefitType(BenefitType benefitType) {
        this.benefitType = benefitType;
    }

    public BooleanEnum getDbtScheme() {
        return dbtScheme;
    }

    public void setDbtScheme(BooleanEnum dbtScheme) {
        this.dbtScheme = dbtScheme;
    }


    public BooleanEnum getBelowPovertyLine() {
        return belowPovertyLine;
    }

    public void setBelowPovertyLine(BooleanEnum belowPovertyLine) {
        this.belowPovertyLine = belowPovertyLine;
    }

    public BooleanEnum getGovernmentEmployee() {
        return governmentEmployee;
    }

    public void setGovernmentEmployee(BooleanEnum governmentEmployee) {
        this.governmentEmployee = governmentEmployee;
    }

    public EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public BooleanEnum getStudent() {
        return student;
    }

    public void setStudent(BooleanEnum student) {
        this.student = student;
    }

    public Occupation getOccupation() {
        return occupation;
    }

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }


    public String getExclusions() {
        return exclusions;
    }

    public void setExclusions(String exclusions) {
        this.exclusions = exclusions;
    }



    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}

// Enumeration Classes

//enum Gender { MALE, FEMALE, OTHER }
//enum Caste { SC, ST, OBC, GENERAL }
//enum Residence { URBAN, RURAL }
//enum BooleanEnum { YES, NO }
//enum BenefitType { FINANCIAL, NON_FINANCIAL }
//enum EmploymentStatus { EMPLOYED, UNEMPLOYED, STUDENT }
//enum Occupation { AGRICULTURE, BUSINESS, SERVICE, OTHER }
//enum State { STATE1, STATE2, STATE3 }
