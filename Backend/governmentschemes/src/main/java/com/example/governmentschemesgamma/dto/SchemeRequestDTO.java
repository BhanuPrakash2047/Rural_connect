package com.example.governmentschemesgamma.dto;

import com.example.governmentschemesgamma.model.Enums;
import com.example.governmentschemesgamma.model.SchemeSpecificCriterias;

import java.util.List;
import java.util.Map;

public class SchemeRequestDTO {

    private String schemeName;
    private Enums.State state;
    private Enums.Gender gender;
    private int start_age;
    private int end_age;
    private Enums.Caste caste;
    private Enums.Residence residence;
    private Enums.BooleanEnum minority;
    private Enums.BooleanEnum differentlyAbled;
    private Enums.BenefitType benefitType;
    private Enums.BooleanEnum dbtScheme;
    private Integer start_disabilityPercentage;
    private Integer end_disabilityPercentage;
    private Enums.BooleanEnum belowPovertyLine;
    private Enums.BooleanEnum governmentEmployee;
    private Enums.EmploymentStatus employmentStatus;
    private Enums.BooleanEnum student;
    private Enums.Occupation occupation;
    private String benefits;
    private String exclusions;
    private Enums.Category category;


    // New fields for related entities
    private List<String> documentRequirements;
    private List<String> eligibilities;
    private List<String> applicationProcessSteps;
    private List<FAQItem> faqs;
    private List<String> sourceReferences;
    private List<String> schemeSpecificCriterias;

    public List<String> getSchemeSpecificCriterias() {
        return schemeSpecificCriterias;
    }

    public void setSchemeSpecificCriterias(List<String> schemeSpecificCriterias) {
        this.schemeSpecificCriterias = schemeSpecificCriterias;
    }

    // Nested class for FAQ items
    public static class FAQItem {
        private String question;
        private String answer;

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }



    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public Enums.State getState() {
        return state;
    }

    public void setState(Enums.State state) {
        this.state = state;
    }

    public Enums.Gender getGender() {
        return gender;
    }

    public void setGender(Enums.Gender gender) {
        this.gender = gender;
    }

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

    public Enums.Caste getCaste() {
        return caste;
    }

    public void setCaste(Enums.Caste caste) {
        this.caste = caste;
    }

    public Enums.Residence getResidence() {
        return residence;
    }

    public void setResidence(Enums.Residence residence) {
        this.residence = residence;
    }

    public Enums.BooleanEnum getMinority() {
        return minority;
    }

    public void setMinority(Enums.BooleanEnum minority) {
        this.minority = minority;
    }

    public Enums.BooleanEnum getDifferentlyAbled() {
        return differentlyAbled;
    }

    public void setDifferentlyAbled(Enums.BooleanEnum differentlyAbled) {
        this.differentlyAbled = differentlyAbled;
    }

    public Enums.BenefitType getBenefitType() {
        return benefitType;
    }

    public void setBenefitType(Enums.BenefitType benefitType) {
        this.benefitType = benefitType;
    }

    public Enums.BooleanEnum getDbtScheme() {
        return dbtScheme;
    }

    public void setDbtScheme(Enums.BooleanEnum dbtScheme) {
        this.dbtScheme = dbtScheme;
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

    public Enums.BooleanEnum getBelowPovertyLine() {
        return belowPovertyLine;
    }

    public void setBelowPovertyLine(Enums.BooleanEnum belowPovertyLine) {
        this.belowPovertyLine = belowPovertyLine;
    }

    public Enums.BooleanEnum getGovernmentEmployee() {
        return governmentEmployee;
    }

    public void setGovernmentEmployee(Enums.BooleanEnum governmentEmployee) {
        this.governmentEmployee = governmentEmployee;
    }

    public Enums.EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(Enums.EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public Enums.BooleanEnum getStudent() {
        return student;
    }

    public void setStudent(Enums.BooleanEnum student) {
        this.student = student;
    }

    public Enums.Occupation getOccupation() {
        return occupation;
    }

    public Enums.Category getCategory() {
        return category;
    }

    public void setCategory(Enums.Category category) {
        this.category = category;
    }

    public void setOccupation(Enums.Occupation occupation) {
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

    public List<String> getDocumentRequirements() {
        return documentRequirements;
    }

    public void setDocumentRequirements(List<String> documentRequirements) {
        this.documentRequirements = documentRequirements;
    }

    public List<String> getEligibilities() {
        return eligibilities;
    }

    public void setEligibilities(List<String> eligibilities) {
        this.eligibilities = eligibilities;
    }

    public List<String> getApplicationProcessSteps() {
        return applicationProcessSteps;
    }

    public void setApplicationProcessSteps(List<String> applicationProcessSteps) {
        this.applicationProcessSteps = applicationProcessSteps;
    }

    public List<FAQItem> getFaqs() {
        return faqs;
    }

    public void setFaqs(List<FAQItem> faqs) {
        this.faqs = faqs;
    }

    public List<String> getSourceReferences() {
        return sourceReferences;
    }

    public void setSourceReferences(List<String> sourceReferences) {
        this.sourceReferences = sourceReferences;
    }
}