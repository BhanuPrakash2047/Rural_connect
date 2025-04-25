package com.example.governmentschemesgamma.dto;

import com.example.governmentschemesgamma.model.*;

import java.util.List;

public class SchemeDetailsResponse
{
    private Scheme scheme;
    private List<Comment> comments;
    private List<DocumentRequirement> documentRequirements;
    private List<Eligibilities> eligibilities;
    private List<ApplicationProcess> applicationProcesses;
    private List<FAQ> faqs;
    private List<SourceReferences> sourceReferences;
    private List<SchemeSpecificCriterias> schemeSpecificCriterias;

    public List<SchemeSpecificCriterias> getSchemeSpecificCriterias() {
        return schemeSpecificCriterias;
    }

    public void setSchemeSpecificCriterias(List<SchemeSpecificCriterias> schemeSpecificCriterias) {
        this.schemeSpecificCriterias = schemeSpecificCriterias;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<DocumentRequirement> getDocumentRequirements() {
        return documentRequirements;
    }

    public void setDocumentRequirements(List<DocumentRequirement> documentRequirements) {
        this.documentRequirements = documentRequirements;
    }

    public List<Eligibilities> getEligibilities() {
        return eligibilities;
    }

    public void setEligibilities(List<Eligibilities> eligibilities) {
        this.eligibilities = eligibilities;
    }

    public List<ApplicationProcess> getApplicationProcesses() {
        return applicationProcesses;
    }

    public void setApplicationProcesses(List<ApplicationProcess> applicationProcesses) {
        this.applicationProcesses = applicationProcesses;
    }

    public List<FAQ> getFaqs() {
        return faqs;
    }

    public void setFaqs(List<FAQ> faqs) {
        this.faqs = faqs;
    }

    public List<SourceReferences> getSourceReferences() {
        return sourceReferences;
    }

    public void setSourceReferences(List<SourceReferences> sourceReferences) {
        this.sourceReferences = sourceReferences;
    }
}

