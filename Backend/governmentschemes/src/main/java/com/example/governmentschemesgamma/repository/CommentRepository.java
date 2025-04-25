package com.example.governmentschemesgamma.repository;

import com.example.governmentschemesgamma.model.Comment;
import com.example.governmentschemesgamma.model.PersonDetails;
import com.example.governmentschemesgamma.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findBySchemeReferring(Scheme scheme);

    Optional<Comment> findByUserAndSchemeReferring(PersonDetails personDetails, Scheme scheme);

    List<Comment> findBySchemeReferringAndLikedIsNotNull(Scheme scheme);

    List<Comment> findBySchemeReferringAndCommentIsNotNull(Scheme scheme);
}
