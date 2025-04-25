package com.example.governmentschemesgamma.dto;

import com.example.governmentschemesgamma.model.Enums.*;
import com.example.governmentschemesgamma.model.SchemeSpecificCriterias;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UserEligibilityDetailsDTO {
    private int age;
    private Gender gender;
    private State state;
    private Caste caste;
    private Residence residence;
    private BooleanEnum minority;
    private BooleanEnum differentlyAbled;
    private Integer disabilityPercentage;
    private BooleanEnum belowPovertyLine;
    private BooleanEnum governmentEmployee;
    private EmploymentStatus employmentStatus;
    private BooleanEnum student;
    private Occupation occupation;
    private Category category;


    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    private Map<String,Boolean> schemeSpecificCriterias;

    public Map<String, Boolean> getSchemeSpecificCriterias() {
        return schemeSpecificCriterias;
    }

    public void setSchemeSpecificCriterias(Map<String, Boolean> schemeSpecificCriterias) {
        this.schemeSpecificCriterias = schemeSpecificCriterias;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
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

    public Integer getDisabilityPercentage() {
        return disabilityPercentage;
    }

    public void setDisabilityPercentage(Integer disabilityPercentage) {
        this.disabilityPercentage = disabilityPercentage;
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
}


//    enum Gender { MALE, FEMALE, OTHER ,ALL}
//    enum Caste { SC, ST, OBC, GENERAL }
//    enum Residence { URBAN, RURAL }
//    enum BooleanEnum { YES, NO }
//    enum BenefitType { FINANCIAL, NON_FINANCIAL }
//    enum EmploymentStatus { EMPLOYED, UNEMPLOYED, STUDENT }
//    enum Occupation { AGRICULTURE, BUSINESS, SERVICE, OTHER }
//    enum State { STATE1, STATE2, STATE3 }
//
//
