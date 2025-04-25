package com.example.jobportalgamma.controller;

import com.example.jobportalgamma.dto.JobDTO;
import com.example.jobportalgamma.model.Job;
import com.example.jobportalgamma.model.JobApplication;
import com.example.jobportalgamma.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    @Autowired
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(
            @RequestBody JobDTO jobDTO,
            @RequestHeader("userName") String username,
            @RequestHeader("roles") List<String> roles) {
        try {
            if (!roles.contains("ROLE_User") && !roles.contains("ROLE_Admin")) {
                return ResponseEntity.status(403).body("Not authorized");
            }
            Job job = jobService.createJob(jobDTO, username);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getJobsByLocation(@RequestParam String location) {
        try {
            List<Job> jobs = jobService.getJobsByLocation(location);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobById(@PathVariable Long jobId) {
        try {
            Job job = jobService.getJobById(jobId);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<?> updateJob(
            @PathVariable Long jobId,
            @RequestBody JobDTO jobDTO,
            @RequestHeader("userName") String username,
            @RequestHeader("roles") List<String> roles) {

        try {
            Job job = jobService.updateJob(jobId, jobDTO, username, roles);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<?> deleteJob(
            @PathVariable Long jobId,
            @RequestHeader("userName") String username,
            @RequestHeader("roles") List<String> roles) {
        //need to modify
        try {
            jobService.deleteJob(jobId, username, roles);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{jobId}/flag")
    public ResponseEntity<?> flagJob(@PathVariable Long jobId) {
        System.out.println("This is the job id from flag: " + jobId);
        try {
            jobService.flagJob(jobId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/search/{jobTitle}")
    public ResponseEntity<List<Job>> searchByTitle(@PathVariable String jobTitle) {
        try {
            List<Job> jobs = jobService.searchJobsByTitle(jobTitle);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/top/{location}")
    public ResponseEntity<List<Job>> searchByLocationAndMostLiked(@PathVariable String location) {
        try {
            // We can add a parameter to limit the number of results if needed
            List<Job> jobs = jobService.findTopJobsByLocation(location); // Get top 10 jobs
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }



    @PostMapping("/apply/{jobId}")
    public ResponseEntity<String> applyJob(
            @PathVariable Long jobId,
            @RequestHeader("userName") String username) {
        try {
            jobService.applyForJob(jobId, username);
            return ResponseEntity.ok("Application submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/job/{jobId}/applications")
    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId) {
        try{
            List<JobApplication> applications=jobService.getJobApplications(jobId);
            return ResponseEntity.ok(applications);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/you/applications")
    public ResponseEntity<?> getYouApplications(@RequestHeader("userName") String username) {
        try{

            List<JobApplication> applications=jobService.getUserApplications(username);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
             return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}