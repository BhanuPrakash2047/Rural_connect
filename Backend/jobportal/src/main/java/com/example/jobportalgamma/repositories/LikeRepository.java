package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdnoAndContentId(String userId, Long contentId);
    Optional<Like> findByUserIdnoAndStoryId(String userId, Long storyId);
    long countByContentId(Long contentId);
    long countByStoryId(Long storyId);
}


