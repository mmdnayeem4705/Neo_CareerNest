package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.model.Job;
import com.neoorganization.careernestbackend.model.Internship;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.JobService;
import com.neoorganization.careernestbackend.service.InternshipService;
import com.neoorganization.careernestbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class HRController {
    
    private final JobService jobService;
    private final InternshipService internshipService;
    private final UserService userService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            // Get HR's jobs and internships
            List<Job> jobs = jobService.getJobsByHR(user.getId());
            List<Internship> internships = internshipService.getInternshipsByHR(user.getId());
            
            // Get statistics
            long totalJobSeekers = userService.getUserCountByRole(com.neoorganization.careernestbackend.model.Role.JOB_SEEKER);
            long totalHRs = userService.getUserCountByRole(com.neoorganization.careernestbackend.model.Role.HR);
            
            Map<String, Object> dashboardData = new HashMap<>();
            dashboardData.put("jobs", jobs);
            dashboardData.put("internships", internships);
            dashboardData.put("totalJobSeekers", totalJobSeekers);
            dashboardData.put("totalHRs", totalHRs);
            dashboardData.put("myJobsCount", jobs.size());
            dashboardData.put("myInternshipsCount", internships.size());
            
            return ResponseEntity.ok(ApiResponse.success("Dashboard data retrieved successfully", dashboardData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch dashboard data: " + e.getMessage()));
        }
    }
    
    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<Job>>> getMyJobs(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Job> jobs = jobService.getJobsByHR(user.getId());
            return ResponseEntity.ok(ApiResponse.success(jobs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch HR jobs: " + e.getMessage()));
        }
    }
    
    @GetMapping("/internships")
    public ResponseEntity<ApiResponse<List<Internship>>> getMyInternships(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Internship> internships = internshipService.getInternshipsByHR(user.getId());
            return ResponseEntity.ok(ApiResponse.success(internships));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch HR internships: " + e.getMessage()));
        }
    }
}
