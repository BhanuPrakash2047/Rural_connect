package com.example.jobportalgamma.services;

import com.example.jobportalgamma.dto.CommentDTO;
import com.example.jobportalgamma.model.Comment;
import com.example.jobportalgamma.model.Content;
import com.example.jobportalgamma.model.PersonDetails;
import com.example.jobportalgamma.model.Story;
import com.example.jobportalgamma.repositories.CommentRepository;
import com.example.jobportalgamma.repositories.ContentRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import com.example.jobportalgamma.repositories.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ContentRepository contentRepository;
    private final StoryRepository storyRepository;
    private final PersonDetailsRepo personDetailsRepository;

    public Comment addContentComment(Long contentId, CommentDTO commentDTO, String username) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));
        PersonDetails author = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        Comment comment = new Comment();
        comment.setText(commentDTO.getText());
        comment.setAuthor(author);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    public Comment addStoryComment(Long storyId, CommentDTO commentDTO, String username) throws Exception {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new Exception("Story not found"));
        PersonDetails author = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        Comment comment = new Comment();
        comment.setText(commentDTO.getText());
        comment.setAuthor(author);
        comment.setStory(story);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }
}
