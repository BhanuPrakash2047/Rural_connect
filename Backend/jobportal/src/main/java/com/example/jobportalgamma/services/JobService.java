package com.example.jobportalgamma.services;
import com.example.jobportalgamma.dto.JobDTO;
import com.example.jobportalgamma.model.*;
import com.example.jobportalgamma.repositories.JobApplicationRepository;
import com.example.jobportalgamma.repositories.JobRepository;
import com.example.jobportalgamma.repositories.NotificationRepository;
import com.example.jobportalgamma.repositories.PersonDetailsRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final PersonDetailsRepo personDetailsRepository;
    private final NotificationRepository notificationRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final NotificationService notificationService;

    public Job createJob(JobDTO jobDTO, String username) throws Exception {
        PersonDetails employer = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        System.out.println("Hello world");
        Job job = new Job();
        job.setTitle(jobDTO.getTitle());
        job.setDescription(jobDTO.getDescription());
        job.setLocation(jobDTO.getLocation());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setEmployer(employer);
        job.setCreatedAt(LocalDateTime.now());
        job.setFlagCount(0);
        job.setActive(true);
        job.setSalary(jobDTO.getSalary());

        return jobRepository.save(job);
    }

    public List<Job> getJobsByLocation(String location) {
        return jobRepository.findByLocationAndIsActiveTrue(location);
    }

    public Job getJobById(Long jobId) throws Exception {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));
    }

    public Job updateJob(Long jobId, JobDTO jobDTO, String username, List<String> roles) throws Exception {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));

        if (!job.getEmployer().getIdno().equals(username) && !roles.contains("ROLE_User")) {
            throw new Exception("Not authorized to update this job");
        }

        job.setTitle(jobDTO.getTitle());
        job.setDescription(jobDTO.getDescription());
        job.setLocation(jobDTO.getLocation());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setUpdatedAt(LocalDateTime.now());
        job.setSalary(jobDTO.getSalary());

        return jobRepository.save(job);
    }

    public void deleteJob(Long jobId, String username, List<String> roles) throws Exception {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));

        if (!job.getEmployer().getIdno().equals(username) && !roles.contains("ROLE_User")) {
            throw new Exception("Not authorized to delete this job");
        }

        jobRepository.delete(job);
    }

    public void flagJob(Long jobId) throws Exception {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));
        System.out.println("Hello evryone");
        job.setFlagCount(job.getFlagCount() + 1);
        jobRepository.save(job);
    }
    public List<Job> searchJobsByTitle(String jobTitle) {
        return jobRepository.findByTitleContainingIgnoreCaseAndIsActiveTrue(jobTitle);
    }

    public List<Job> findTopJobsByLocation(String location) {
        // Get jobs by location and order by likes in descending order
        return jobRepository.findTopJobsByLocationOrderByLikes(location);
    }


    @Transactional
    public void applyForJob(Long jobId, String username) throws Exception {
        // 1. Validate job exists and is active
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));

        if (!job.isActive()) {
            throw new Exception("This job is no longer accepting applications");
        }

        // 2. Validate applicant exists
        PersonDetails applicant = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));

        // 3. Check if user has already applied
        if (jobApplicationRepository.existsByJobAndApplicantAndIsActiveTrue(job, applicant)) {
            throw new Exception("You have already applied for this job");
        }

        // 4. Create new job application
        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setApplicant(applicant);
        application.setAppliedAt(LocalDateTime.now());
        application.setStatus(Enums.JobStatus.PENDING);
        application.setActive(true);

        jobApplicationRepository.save(application);

        // 5. Create notification for employer
        Notification notification = new Notification();
//        notification.setUser(job.getEmployer());
        notification.setMessage("New application received from " +
                applicant.getFname() + " " +
                applicant.getLname() +
                " for the position: " + job.getTitle());
        notification.setType("JOB_APPLICATION");
        notification.setRead(false);
        System.out.println("This is appliaction"+application.getApplicant().getIdno());
        notification.setJobApplied(application);
//        notification.setJobApplied(job);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
    }

    // Additional helper methods for job applications
    public List<JobApplication> getJobApplications(Long jobId) throws Exception {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new Exception("Job not found"));
        return jobApplicationRepository.findByJobAndIsActiveTrue(job);
    }

    public List<JobApplication> getUserApplications(String username) throws Exception {
        PersonDetails applicant = personDetailsRepository.findById(username)
                .orElseThrow(() -> new Exception("User not found"));
        return jobApplicationRepository.findByApplicantAndIsActiveTrue(applicant);
    }

}
