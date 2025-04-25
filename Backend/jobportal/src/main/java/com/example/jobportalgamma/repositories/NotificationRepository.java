package com.example.jobportalgamma.repositories;

import com.example.jobportalgamma.model.Enums;
import com.example.jobportalgamma.model.Notification;
import com.example.jobportalgamma.model.PersonDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
//    List<Notification> findByJobAppliedApplicantOrderByCreatedAtDesc(String userId);
//    List<Notification> findByUserIdnoAndIsReadFalse(String userId);

//    List<Notification> findByUserIdnoAndJobStatus(PersonDetails person, Enums.JobStatus jobStatus);

//    List<Notification> findByUserIdnoAndJobApplicationJobStatus(PersonDetails person, Enums.JobStatus jobStatus);

//    List<Notification> findByJobAppliedApplicantAndJobAppliedJobStatus(PersonDetails person, Enums.JobStatus jobStatus);

    List<Notification> findByJobAppliedApplicantAndJobAppliedStatus(PersonDetails person, Enums.JobStatus jobStatus);

//    List<Notification> findByJobAppliedApplicantIdnoOrderByCreatedAtDesc(String username);

    List<Notification> findByJobApplied_Applicant_IdnoOrderByCreatedAtDesc(String username);
}
