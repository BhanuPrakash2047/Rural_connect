package com.example.jobportalgamma.services;

import com.example.jobportalgamma.model.Content;
import com.example.jobportalgamma.model.PersonDetails;
import com.example.jobportalgamma.repositories.ContentRepository;
import com.example.jobportalgamma.repositories.JobRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import com.example.jobportalgamma.repositories.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final PersonDetailsRepo personDetailsRepository;
    private final ContentRepository contentRepository;
    private final StoryRepository storyRepository;
    private final JobRepository jobRepository;

    public List<PersonDetails> getAllUsers() {
        return personDetailsRepository.findAll();
    }

    public void banUser(String userId) throws Exception {
        PersonDetails user = personDetailsRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        user.setRole("BANNED");
        personDetailsRepository.save(user);
    }

    public List<Content> getFlaggedContent() {
        return contentRepository.findByIsFlaggedTrue();
    }

    public void approveContent(Long contentId) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));
        content.setFlagged(false);
        content.setFlagCount(0);
        contentRepository.save(content);
    }

    public void rejectContent(Long contentId) throws Exception {
        Content content = contentRepository.findById(contentId)
                .orElseThrow(() -> new Exception("Content not found"));
        contentRepository.delete(content);
    }
}