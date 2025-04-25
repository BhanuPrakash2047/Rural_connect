package com.example.jobportalgamma.controller;

import com.example.jobportalgamma.dto.ContentDTO;
import com.example.jobportalgamma.model.Content;
import com.example.jobportalgamma.repositories.ContentRepository;
import com.example.jobportalgamma.services.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @PostMapping
    public ResponseEntity<?> createContent(
            @RequestBody ContentDTO contentDTO,
            @RequestHeader("username") String username) {
        try {
            Content content = contentService.createContent(contentDTO, username);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllContent() {
        try {
            List<Content> contents = contentService.getAllContent();
            return ResponseEntity.ok(contents);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<?> getContentById(@PathVariable Long contentId) {
        try {
            Content content = contentService.getContentById(contentId);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{contentId}")
    public ResponseEntity<?> updateContent(
            @PathVariable Long contentId,
            @RequestBody ContentDTO contentDTO,
            @RequestHeader("username") String username,
            @RequestHeader("roles") List<String> roles) {
        try {
            Content content = contentService.updateContent(contentId, contentDTO, username, roles);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{contentId}")
    public ResponseEntity<?> deleteContent(
            @PathVariable Long contentId,
            @RequestHeader("username") String username,
            @RequestHeader("roles") List<String> roles) {
        try {
            contentService.deleteContent(contentId, username, roles);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{contentId}/like")
    public ResponseEntity<?> likeContent(
            @PathVariable Long contentId,
            @RequestHeader("username") String username) {
        try {
            contentService.likeContent(contentId, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{contentId}/flag")
    public ResponseEntity<?> flagContent(@PathVariable Long contentId) {
        try {
            contentService.flagContent(contentId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{contentId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long contentId) {
        try{
        return ResponseEntity.ok(contentService.getComments(contentId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }


}