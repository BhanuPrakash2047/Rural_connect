package com.example.civicdevelopmentgamma.controller;

import com.example.civicdevelopmentgamma.dto.AcceptRequestDTO;
import com.example.civicdevelopmentgamma.dto.IssueDTO;
import com.example.civicdevelopmentgamma.model.*;
import com.example.civicdevelopmentgamma.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@org.springframework.web.bind.annotation.RestController
@RequestMapping("/civic")
public class MainRestController {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    AdminNotificationRepo adminNotificationRepo;

    @Autowired
    UserNotificationRepo userNotificationRepo;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PersonDetailsRepo personDetailsRepo;

    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/issue")
    public ResponseEntity<String> postIssue(@RequestBody IssueDTO issueDTO, @RequestHeader("userName") String userName) {
        try {
            // Find the user details using userName
            Optional<PersonDetails> personDetailsOpt = personDetailsRepo.findById(userName);
            System.out.println(userName);

            if (personDetailsOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + userName);
            }

            // Convert DTO to Entity
            Issue issue = new Issue();
            issue.setTitle(issueDTO.getTitle());
            issue.setDescription(issueDTO.getDescription());
            issue.setCategory(issueDTO.getCategory());
            issue.setLocation(issueDTO.getLocation());
            issue.setStatus(issueDTO.getStatus() != null ? issueDTO.getStatus() : IssueStatus.PENDING);
            issue.setCreatedAt(issueDTO.getCreatedAt() != null ? issueDTO.getCreatedAt() : LocalDateTime.now());
            issue.setUpdatedAt(issueDTO.getUpdatedAt());
            issue.setUser(personDetailsOpt.get());
            issue.setCount(1);// Set the user
//            issue.setAssignedAdmin(null);
//            System.out.println("This Is the Name admin"+issue.getAssignedAdmin().getName());

//            // If an admin is assigned, fetch and set the admin
//            if (issueDTO.getAssignedAdminId() != null) {
//                Optional<Admin> adminOpt = adminRepository.findById(issueDTO.getAssignedAdminId());
//                adminOpt.ifPresent(issue::setAssignedAdmin);
//            }
            //Assign the problem to the admin
            System.out.println("This is the admin"+issue.getLocation());
            Optional<Admin> admin=adminRepo.findByLocation(issue.getLocation());
            issue.setAssignedAdmin(admin.get());
            issueRepository.save(issue);

            if (!admin.isEmpty()) {

                System.out.println("Admin Is Assigned "+issue.getAssignedAdmin().getName());
                AdminNotification adminNotification = new AdminNotification();
                adminNotification.setAdmin(admin.get());
                adminNotification.setIssue(issue);
                adminNotification.setDiscription("New Issue Raised");
                adminNotificationRepo.save(adminNotification);
            }

            // Save the Issue entity

            return ResponseEntity.ok("Issue posted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error posting issue: " + e.getMessage());
        }
    }


    @GetMapping("/issues")
    public ResponseEntity<?> getIssues() {
        try {
            List<Issue> issues = issueRepository.findAllByOrderByLocationAsc();
            System.out.println("Hello aAdmin"+issues.get(0).getAssignedAdmin());
            return ResponseEntity.ok(issues);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching issues: " + e.getMessage());
        }
    }

    @GetMapping("/issues/location/{location}")
    public ResponseEntity<?> getIssuesLocation(@PathVariable String location) {
        try {
            List<Issue> issues = issueRepository.findByLocation(location);

            if (issues.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No issues found for location: " + location);
            }
            return ResponseEntity.ok(issues);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching issues by location: " + e.getMessage());
        }
    }

    @GetMapping("/issues/{issueId}")
    public ResponseEntity<Issue> getIssue(@PathVariable Long issueId) {
        try {
            Optional<Issue> issue = issueRepository.findById(issueId);
           if (issue.isEmpty()) {
               System.out.println("No issue found for id: " + issueId);
           }
           Issue ne=issue.get();
            System.out.println("This Is the Name admin"+ne.getAssignedAdmin().getName());
            return issue.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

        @GetMapping("/issue/{issueTitle}")
        public ResponseEntity<Issue> getIssueByTitle(@PathVariable String issueTitle) {
            try {
                Optional<Issue> issue = issueRepository.findByTitle(issueTitle);
                if (issue.isEmpty()) {
                    System.out.println("No issue found for id: " + issueTitle);
                }
                Issue ne=issue.get();
                System.out.println("This Is the Name admin"+ne.getAssignedAdmin().getName());
                return issue.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    @PostMapping("/issue/{issueId}/vote")
    public ResponseEntity<Integer> vote(@RequestHeader("userName") String userName, @PathVariable Long issueId) {
        Optional<PersonDetails> person = personDetailsRepo.findById(userName);
        if (person.isPresent()) {
            Optional<Issue> issue = issueRepository.findById(issueId);
            if (issue.isPresent()) {
                Issue updatedIssue = issue.get();
                Optional<Vote> vot= Optional.ofNullable(voteRepository.findByIssueAndUser(updatedIssue, person));
                if(vot.isPresent()) {
                    updatedIssue.setCount(updatedIssue.getCount() - 1);
                    issueRepository.save(updatedIssue);
                    voteRepository.delete(vot.get());
                    return ResponseEntity.ok(updatedIssue.getCount());

                }
                else{
                    updatedIssue.setCount(updatedIssue.getCount() + 1);
                    issueRepository.save(updatedIssue);


                    // Save the vote in the Votes table
                    Vote vote = new Vote();
                    vote.setIssue(updatedIssue);
                    vote.setUser(person.get());
                    voteRepository.save(vote);
                }
                return ResponseEntity.ok(updatedIssue.getCount());
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/issues/{issueId}/status")
    public ResponseEntity<Map<String, String>> getIssueStatus(@PathVariable Long issueId) {
        return issueRepository.findById(issueId)
                .map(issue -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("status", issue.getStatus().name());
                    response.put("description", issue.getStatus_discription()); // Assuming 'description' is a field in Issue
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

//    @GetMapping("/issues/{issueId}/comments")
//    public ResponseEntity<List<Comment>> getIssueComments(@PathVariable Long issueId) {
//        Optional<Issue> issue = issueRepository.findById(issueId);
//        if (issue.isPresent()) {
//            return ResponseEntity.ok(commentRepo.findByIssue(issue.get()));
//        }
//        else return ResponseEntity.notFound().build();
//    }

    @GetMapping("/issues/admin/{adminId}")
    public ResponseEntity<List<Issue>> getIssuesAdmin(@PathVariable Long adminId, @RequestHeader("Roles") List<String> roles) {
        System.out.println(roles.get(0));
        if (roles.contains("ROLE_Admin")) {
            System.out.println(roles.get(0));
            return adminRepo.findById(adminId)
                    .map(admin -> ResponseEntity.ok(issueRepository.findByAssignedAdmin(admin)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.status(403).build();
    }


    @PostMapping("/issues/{issueId}/respond")
    public ResponseEntity<String> issueResponse(@RequestHeader("Username") String username,
                                                @PathVariable Long issueId,
                                                @RequestHeader("Roles") List<String> roles,
                                                @RequestBody AcceptRequestDTO requestDTO) {
        if (roles.contains("ROLE_Admin")) {
            return issueRepository.findById(issueId)
                    .map(issue -> {
                        issue.setStatus(IssueStatus.valueOf(requestDTO.getReceive().toUpperCase()));
                        issue.setStatus_discription(requestDTO.getMessage());
                        issueRepository.save(issue);
                        return ResponseEntity.ok("Issue status updated.");
                    })
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.status(403).build();
    }


    @GetMapping("/issues/top/{city}")
    public ResponseEntity<List<Issue>> getIssuesTop(@PathVariable String city) {
        return ResponseEntity.ok(issueRepository.findByLocationContainingOrderByCountDesc(city));
    }

    @GetMapping("/issues/you")
    public ResponseEntity<List<Issue>> getIssuesYou(@RequestHeader("Username") String username) {
        Optional<PersonDetails> person = personDetailsRepo.findById(username);

        if (person.isPresent()) {
            List<Issue> issues = issueRepository.findByUser(person.get());
            return ResponseEntity.ok(issues);
        }

        return ResponseEntity.notFound().build();
    }

    /**
     * Admin requests details from the user regarding an issue
     */
    @PostMapping("/issues/{issueId}/requestDetails/{message}")
    public ResponseEntity<String> issueRequestDetails(@PathVariable Long issueId,
                                                      @RequestHeader("Roles") List<String> roles,
                                                      @PathVariable String message) {

        if (!roles.contains("ROLE_User")) {
            return ResponseEntity.status(403).body("Access Denied: Only Admins can request details.");
        }

        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isEmpty()) {
            return ResponseEntity.status(404).body("Issue not found.");
        }

        Issue issue = optionalIssue.get();
        issue.setResponse_from_admin(message);
        issue.setUpdatedAt(LocalDateTime.now());
        issueRepository.save(issue);

        PersonDetails person=personDetailsRepo.findByIdno(issue.getUser().getIdno());
        UserNotificaation userNotificaation=new UserNotificaation();
        userNotificaation.setIssue(issue);
        userNotificaation.setUser(person);
        userNotificaation.setDiscription("Admin Requested Some Details");
        userNotificationRepo.save(userNotificaation);


        return ResponseEntity.ok("Request details updated successfully.");
    }

    /**
     * User responds to the admin's request on an issue
     */
    @PostMapping("/issues/{issueId}/responseDetails/{message}")
    public ResponseEntity<String> issueResponseDetails(@PathVariable Long issueId,
                                                       @PathVariable String message,@RequestHeader("userName") String userName) {

        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isEmpty()) {
            return ResponseEntity.status(404).body("Issue not found.");
        }
        if(!userName.equals(optionalIssue.get().getUser().getIdno())) return ResponseEntity.status(401).body("Sorry you are not supposed to do this!");


        Issue issue = optionalIssue.get();
        issue.setResponse_from_user(message);
        issue.setUpdatedAt(LocalDateTime.now());
        issueRepository.save(issue);

        AdminNotification adminNotification = new AdminNotification();
        adminNotification.setAdmin(issue.getAssignedAdmin());
        adminNotification.setIssue(issue);
        adminNotification.setDiscription("User Responded With some Details");
        adminNotificationRepo.save(adminNotification);

        return ResponseEntity.ok("Response details updated successfully.");
    }

    /**
     * User comments on an issue
     */
    @PostMapping("/issue/{issueId}/comment/{message}")
    public ResponseEntity<String> commentToIssue(@PathVariable Long issueId,
                                                 @RequestHeader("Username") String username,
                                                 @PathVariable String message) {

        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isEmpty()) {
            return ResponseEntity.status(404).body("Issue not found.");
        }

        Optional<PersonDetails> optionalUser = personDetailsRepo.findById(username);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        Issue issue = optionalIssue.get();
        PersonDetails user = optionalUser.get();

        // Creating a new comment
        Comment comment = new Comment();
        comment.setComment(message);
        comment.setTime(LocalDateTime.now());
        comment.setUser(user);
        comment.setIssue(issue);
        System.out.println(comment.toString());

        commentRepo.save(comment);

        return ResponseEntity.ok("Comment added successfully.");

    }
    @GetMapping("/issue/{issueId}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isEmpty()) {
            return ResponseEntity.status(404).body("Issue not found.");
        }

        List<Comment> comments = commentRepo.findByIssue(optionalIssue.get());

        if (comments.isEmpty()) {
            return ResponseEntity.ok("No comments found for this issue.");
        }

        return ResponseEntity.ok(comments);
    }

    @GetMapping("/issues/you/likedIssues")
    public ResponseEntity<List<Vote>> getLikedIssues(@RequestHeader("userName") String username) {
        Optional<PersonDetails> person = personDetailsRepo.findById(username);
        if (person.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.ok(voteRepository.findByUser(person));

    }
    @GetMapping("/issues/commented-issues")
    public ResponseEntity<List<Comment>> getCommentedIssues(@RequestHeader("userName") String username) {
        Optional<PersonDetails> person = personDetailsRepo.findById(username);
        if (person.isEmpty()) {
            return ResponseEntity.status(404).body(null);

        }
        return ResponseEntity.ok(commentRepo.findByUser(person));
    }




}



