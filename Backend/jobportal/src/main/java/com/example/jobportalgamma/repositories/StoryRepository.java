package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findByAuthorIdno(String authorId);
}
