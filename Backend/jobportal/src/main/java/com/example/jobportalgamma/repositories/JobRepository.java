package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends  JpaRepository<Job, Long> {
    List<Job> findByLocationAndIsActiveTrue(String location);
    List<Job> findByEmployerIdno(String employerId);

    List<Job> findByTitleContainingIgnoreCaseAndIsActiveTrue(String jobTitle);

//    List<Job> findJobsByLocationOrderByLikes(String location);

    @Query("SELECT j FROM Job j WHERE j.location = :location AND j.isActive = true ORDER BY j.likes DESC")
    List<Job> findTopJobsByLocationOrderByLikes(String location);
}