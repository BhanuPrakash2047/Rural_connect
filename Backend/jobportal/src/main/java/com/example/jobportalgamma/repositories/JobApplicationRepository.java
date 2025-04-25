package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Job;
import com.example.jobportalgamma.model.JobApplication;
import com.example.jobportalgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    boolean existsByJobAndApplicantAndIsActiveTrue(Job job, PersonDetails applicant);
    List<JobApplication> findByJobAndIsActiveTrue(Job job);
    List<JobApplication> findByApplicantAndIsActiveTrue(PersonDetails applicant);
    Optional<JobApplication> findByJobAndApplicantAndIsActiveTrue(Job job, PersonDetails applicant);
}