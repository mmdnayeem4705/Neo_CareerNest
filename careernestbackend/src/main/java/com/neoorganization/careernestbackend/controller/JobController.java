package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.dto.JobRequest;
import com.neoorganization.careernestbackend.model.Job;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class JobController {
    
    private final JobService jobService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Job>>> getAllJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String employmentType,
            @RequestParam(required = false) String experienceLevel) {
        
        try {
            List<Job> jobs;
            if (title != null || department != null || location != null || 
                employmentType != null || experienceLevel != null) {
                jobs = jobService.getJobsWithFilters(title, department, location, employmentType, experienceLevel);
            } else {
                jobs = jobService.getAllJobs();
            }
            return ResponseEntity.ok(ApiResponse.success(jobs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch jobs: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> getJobById(@PathVariable Long id) {
        try {
            Job job = jobService.getJobById(id);
            return ResponseEntity.ok(ApiResponse.success(job));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch job: " + e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Job>> createJob(@Valid @RequestBody JobRequest jobRequest, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Job job = jobService.createJob(jobRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Job created successfully", job));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create job: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> updateJob(@PathVariable Long id, 
                                                    @Valid @RequestBody JobRequest jobRequest, 
                                                    Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Job job = jobService.updateJob(id, jobRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Job updated successfully", job));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update job: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            jobService.deleteJob(id, user);
            return ResponseEntity.ok(ApiResponse.success("Job deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete job: " + e.getMessage()));
        }
    }
}
