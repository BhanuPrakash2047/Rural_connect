package com.example.civicdevelopmentgamma.repository;




import com.example.civicdevelopmentgamma.model.Issue;
import com.example.civicdevelopmentgamma.model.PersonDetails;
import com.example.civicdevelopmentgamma.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

//    // Get votes for a specific issue
//    List<Vote> findByIssue(Issue issue);
//
//    // Count fake votes for an issue
//    long countByIssueAndIsFakeVoteTrue(Issue issue);

    Vote findByIssueAndUser(Issue updatedIssue, Optional<PersonDetails> person);

    List<Vote> findByUser(Optional<PersonDetails> person);

//    Object findByUser(Optional<PersonDetails> person);
//
//    List<Object> findAllByUser(Optional<PersonDetails> person);
}
