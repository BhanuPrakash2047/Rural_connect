package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Comment;
import com.example.jobportalgamma.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByAuthorIdno(String authorId);
    List<Content> findByType(String type);





    List<Content> findByIsFlaggedTrue();

//    List<Comment> findByContent(Content content);
}