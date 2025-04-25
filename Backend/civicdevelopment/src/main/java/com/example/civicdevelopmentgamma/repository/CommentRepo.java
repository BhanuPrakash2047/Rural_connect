package com.example.civicdevelopmentgamma.repository;

import com.example.civicdevelopmentgamma.model.Comment;
import com.example.civicdevelopmentgamma.model.Issue;
import com.example.civicdevelopmentgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByIssue(Issue issueId);

    List<Comment> findByUser(Optional<PersonDetails> person);

//    Object findByUser(Optional<PersonDetails> person);
}
