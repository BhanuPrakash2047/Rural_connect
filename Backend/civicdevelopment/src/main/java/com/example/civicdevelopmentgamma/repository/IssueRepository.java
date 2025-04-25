package com.example.civicdevelopmentgamma.repository;



import com.example.civicdevelopmentgamma.model.Admin;
import com.example.civicdevelopmentgamma.model.Issue;
import com.example.civicdevelopmentgamma.model.IssueStatus;
import com.example.civicdevelopmentgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    // Get all issues sorted by votes and location
    List<Issue> findAllByOrderByLocationAsc();

    // Get issue details by ID
    Optional<Issue> findById(Long id);

    // Get issues reported from a specific location
    List<Issue> findByLocation(String location);

    // Get issues assigned to a specific admin
    List<Issue> findByAssignedAdmin(Admin assignedAdmin);

    // Get pending issues older than 7 days
    List<Issue> findByStatusAndCreatedAtBefore(IssueStatus status, LocalDateTime date);

    List<Issue> findByLocationContainingOrderByCountDesc(String city);

    List<Issue> findByUser(PersonDetails personDetails);

    Optional<Issue> findByTitle(String issueTitle);
}