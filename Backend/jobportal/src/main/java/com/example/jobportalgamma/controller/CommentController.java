package com.example.jobportalgamma.controller;

import com.example.jobportalgamma.dto.CommentDTO;
import com.example.jobportalgamma.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



// CommentController.java
@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/api/content/{contentId}/comment")
    public ResponseEntity<?> addContentComment(
            @PathVariable Long contentId,
            @RequestBody CommentDTO commentDTO,
            @RequestHeader("username") String username) {
        try {
            return ResponseEntity.ok(commentService.addContentComment(contentId, commentDTO, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/api/stories/{storyId}/comment")
    public ResponseEntity<?> addStoryComment(
            @PathVariable Long storyId,
            @RequestBody CommentDTO commentDTO,
            @RequestHeader("username") String username) {
        try {
            return ResponseEntity.ok(commentService.addStoryComment(storyId, commentDTO, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}