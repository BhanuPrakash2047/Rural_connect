package com.example.jobportalgamma.controller;

import com.example.jobportalgamma.model.Enums;
import com.example.jobportalgamma.model.Notification;
import com.example.jobportalgamma.model.PersonDetails;
import com.example.jobportalgamma.repositories.JobRepository;
import com.example.jobportalgamma.repositories.NotificationRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import com.example.jobportalgamma.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final PersonDetailsRepo personDetailsRepo;
    private final JobRepository jobRepository;

    @GetMapping
    public ResponseEntity<?> getUserNotifications(
            @RequestHeader("userName") String username) {
        try {
            return ResponseEntity.ok(notificationService.getUserNotifications(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

  @GetMapping("/employer")
  public ResponseEntity<?> getEmployerNotifications(@RequestHeader("userName") String username){
        try{
               PersonDetails person=personDetailsRepo.findById(username).orElseThrow(()->new Exception("User Not Found"));
               List<Notification> notificationList=notificationRepository.findByJobAppliedApplicantAndJobAppliedStatus(person, Enums.JobStatus.PENDING);
               return ResponseEntity.ok(notificationList);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }

  }


  @PostMapping("/respond/{response}/{notificationId}")
  public ResponseEntity<?> respondNotification(@RequestHeader("userName") String username,@PathVariable Enums.JobStatus response,@PathVariable Long notificationId){

      try{
          PersonDetails person=personDetailsRepo.findById(username).orElseThrow(()->new Exception("User Not Found"));
          Notification notification=notificationRepository.findById(notificationId).orElseThrow(()->new Exception("Notification Not Found"));
          if(notification.getJobApplied().getJob().getEmployer().getIdno().equals(person.getIdno()) && notification.getJobApplied().getStatus().equals(Enums.JobStatus.PENDING)) {
              notification.getJobApplied().setStatus(response);
              notificationRepository.save(notification);
          }
      } catch (Exception e) {
          return ResponseEntity.badRequest().body(e.getMessage());
      }

      return ResponseEntity.ok().build();
  }



    @PutMapping("/{notificationId}/read")
    public ResponseEntity<?> markNotificationAsRead(
            @PathVariable Long notificationId,
            @RequestHeader("username") String username) {
        try {
            notificationService.markNotificationAsRead(notificationId, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
