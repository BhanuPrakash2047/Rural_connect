package com.example.jobportalgamma.services;

import com.example.jobportalgamma.dto.ContentDTO;
import com.example.jobportalgamma.model.Comment;
import com.example.jobportalgamma.model.Content;
import com.example.jobportalgamma.model.PersonDetails;
import com.example.jobportalgamma.repositories.CommentRepository;
import com.example.jobportalgamma.repositories.ContentRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final PersonDetailsRepo personDetailsRepository;
    private final CommentRepository commentRepository;

    public Content createContent(ContentDTO contentDTO, String username) throws Exception {
        PersonDetails author = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        Content content = new Content();
        content.setTitle(contentDTO.getTitle());
        content.setBody(contentDTO.getBody());
        content.setType(contentDTO.getType());
        content.setAuthor(author);
        content.setCreatedAt(LocalDateTime.now());
        content.setFlagCount(0);
        content.setFlagged(false);

        return contentRepository.save(content);
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public Content getContentById(Long contentId) throws Exception {
        return contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));
    }

    public Content updateContent(Long contentId, ContentDTO contentDTO, String username, List<String> roles) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));

        if (!content.getAuthor().getIdno().equals(username) && !roles.contains("ROLE_ADMIN")) {
            throw new Exception("Not authorized to update this content");
        }

        content.setTitle(contentDTO.getTitle());
        content.setBody(contentDTO.getBody());
        content.setType(contentDTO.getType());
        content.setUpdatedAt(LocalDateTime.now());

        return contentRepository.save(content);
    }

    public void deleteContent(Long contentId, String username, List<String> roles) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));

        if (!content.getAuthor().getIdno().equals(username) && !roles.contains("ROLE_User")) {
            throw new Exception("Not authorized to delete this content");
        }

        contentRepository.delete(content);
    }

    public void likeContent(Long contentId, String username) throws Exception {
        // Implementation for liking content
        // This would typically create a new Like entity
    }

    public void flagContent(Long contentId) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));

        content.setFlagCount(content.getFlagCount() + 1);
        content.setFlagged(true);
        contentRepository.save(content);
    }

    public List<Comment> getComments(Long contentId) throws Exception {
          Content content=contentRepository.findById(contentId).
                  orElseThrow(() -> new Exception("Content not found"));

          return commentRepository.findByContent(content);


    }

}