package com.example.jobportalgamma.services;




import com.example.jobportalgamma.dto.StoryDTO;
import com.example.jobportalgamma.model.Comment;
import com.example.jobportalgamma.model.PersonDetails;
import com.example.jobportalgamma.model.Story;
import com.example.jobportalgamma.repositories.CommentRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import com.example.jobportalgamma.repositories.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;
    private final PersonDetailsRepo personDetailsRepository;
    private final CommentRepository commentRepository;

    public Story createStory(StoryDTO storyDTO, String username) throws Exception {
        PersonDetails author = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        Story story = new Story();
        story.setTitle(storyDTO.getTitle());
        story.setContent(storyDTO.getContent());
        story.setAuthor(author);
        story.setCreatedAt(LocalDateTime.now());
        story.setFlagCount(0);

        return storyRepository.save(story);
    }

    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    public Story getStoryById(Long storyId) throws Exception {
        return storyRepository.findById(storyId)
                .orElseThrow(() -> new Exception("Story not found"));
    }

    public Story updateStory(Long storyId, StoryDTO storyDTO, String username, List<String> roles) throws Exception {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new Exception("Story not found"));

        if (!story.getAuthor().getIdno().equals(username) && !roles.contains("ROLE_ADMIN")) {
            throw new Exception("Not authorized to update this story");
        }

        story.setTitle(storyDTO.getTitle());
        story.setContent(storyDTO.getContent());
        story.setUpdatedAt(LocalDateTime.now());

        return storyRepository.save(story);
    }

    public void deleteStory(Long storyId, String username, List<String> roles) throws Exception {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new Exception("Story not found"));

        if (!story.getAuthor().getIdno().equals(username) && !roles.contains("ROLE_ADMIN")) {
            throw new Exception("Not authorized to delete this story");
        }

        storyRepository.delete(story);
    }

    public void flagStory(Long storyId) throws Exception {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new Exception("Story not found"));

        story.setFlagCount(story.getFlagCount() + 1);
        storyRepository.save(story);
    }

    public List<Comment> getComments(Long storyId) throws Exception {
        Story story=storyRepository.findById(storyId).orElseThrow(()->new Exception("Story not found"));

        return commentRepository.findByStory(story);

    }
}
