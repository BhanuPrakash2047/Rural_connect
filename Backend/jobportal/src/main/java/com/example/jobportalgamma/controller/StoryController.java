package com.example.jobportalgamma.controller;


import com.example.jobportalgamma.dto.StoryDTO;
import com.example.jobportalgamma.services.StoryService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
public class StoryController {
    private final StoryService storyService;

    @PostMapping
    public ResponseEntity<?> createStory(
            @RequestBody StoryDTO storyDTO,
            @RequestHeader("username") String username) {
        try {
            return ResponseEntity.ok(storyService.createStory(storyDTO, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllStories() {
        try {
            return ResponseEntity.ok(storyService.getAllStories());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{storyId}")
    public ResponseEntity<?> getStoryById(@PathVariable Long storyId) {
        try {
            return ResponseEntity.ok(storyService.getStoryById(storyId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{storyId}")
    public ResponseEntity<?> updateStory(
            @PathVariable Long storyId,
            @RequestBody StoryDTO storyDTO,
            @RequestHeader("username") String username,
            @RequestHeader("roles") List<String> roles) {
        try {
            return ResponseEntity.ok(storyService.updateStory(storyId, storyDTO, username, roles));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{storyId}")
    public ResponseEntity<?> deleteStory(
            @PathVariable Long storyId,
            @RequestHeader("username") String username,
            @RequestHeader("roles") List<String> roles) {
        try {
            storyService.deleteStory(storyId, username, roles);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{storyId}/flag")
    public ResponseEntity<?> flagStory(@PathVariable Long storyId) {
        try {
            storyService.flagStory(storyId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{storyId}/comment")
    public ResponseEntity<?> getStoryComment(@PathVariable Long storyId) {
        try{
            return ResponseEntity.ok(storyService.getComments(storyId));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}

