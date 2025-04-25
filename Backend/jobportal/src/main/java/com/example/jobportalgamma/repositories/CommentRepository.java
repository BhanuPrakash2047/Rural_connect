package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Comment;
import com.example.jobportalgamma.model.Content;
import com.example.jobportalgamma.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {


    List<Comment> findByContent(Content content);

    List<Comment> findByStory(Story story);
}