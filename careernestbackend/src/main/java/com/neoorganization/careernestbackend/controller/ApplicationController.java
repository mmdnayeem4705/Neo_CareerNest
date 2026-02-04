package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.dto.ApplicationRequest;
import com.neoorganization.careernestbackend.model.Application;
import com.neoorganization.careernestbackend.model.ApplicationStatus;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ApplicationController {
    
    private final ApplicationService applicationService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<Application>> createApplication(@ModelAttribute ApplicationRequest applicationRequest,
                                                                       @RequestParam(value = "resume", required = false) org.springframework.web.multipart.MultipartFile resume,
                                                                       Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();

            // Handle resume upload if provided
            if (resume != null && !resume.isEmpty()) {
                try {
                    java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads/resumes").toAbsolutePath().normalize();
                    java.nio.file.Files.createDirectories(uploadDir);
                    String originalFilename = resume.getOriginalFilename() != null ? resume.getOriginalFilename() : "resume_" + System.currentTimeMillis();
                    String filename = System.currentTimeMillis() + "_" + originalFilename.replaceAll("\\s+", "_");
                    java.nio.file.Path target = uploadDir.resolve(filename);
                    resume.transferTo(target);
                    // Save relative path as resumeUrl
                    applicationRequest.setResumeUrl("/uploads/resumes/" + filename);
                } catch (Exception ex) {
                    log.error("Failed to store resume file", ex);
                    return ResponseEntity.badRequest().body(ApiResponse.error("Failed to store resume file: " + ex.getMessage()));
                }
            }

            Application application = applicationService.createApplication(applicationRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Application submitted successfully", application));
        } catch (Exception e) {
            log.error("Failed to create application", e);
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create application: " + e.getMessage()));
        }
    }
    
    @GetMapping("/my-applications")
    public ResponseEntity<ApiResponse<List<Application>>> getMyApplications(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Application> applications = applicationService.getUserApplications(user.getId());
            return ResponseEntity.ok(ApiResponse.success(applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch applications: " + e.getMessage()));
        }
    }
    
    @PostMapping("/simple")
    public ResponseEntity<ApiResponse<Application>> createApplicationJson(@Valid @RequestBody ApplicationRequest applicationRequest, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Application application = applicationService.createApplication(applicationRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Application submitted successfully", application));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create application: " + e.getMessage()));
        }
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<ApiResponse<List<Application>>> getJobApplications(@PathVariable Long jobId, 
                                                                           Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            // Check if user is HR or Admin
            if (!user.getRole().name().equals("HR") && !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            
            List<Application> applications = applicationService.getJobApplications(jobId);
            return ResponseEntity.ok(ApiResponse.success(applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch job applications: " + e.getMessage()));
        }
    }
    
    @GetMapping("/internship/{internshipId}")
    public ResponseEntity<ApiResponse<List<Application>>> getInternshipApplications(@PathVariable Long internshipId, 
                                                                                  Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            // Check if user is HR or Admin
            if (!user.getRole().name().equals("HR") && !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            
            List<Application> applications = applicationService.getInternshipApplications(internshipId);
            return ResponseEntity.ok(ApiResponse.success(applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch internship applications: " + e.getMessage()));
        }
    }
    
    @GetMapping("/hr")
    public ResponseEntity<ApiResponse<List<Application>>> getHRApplications(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            // Check if user is HR or Admin
            if (!user.getRole().name().equals("HR") && !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            
            List<Application> applications = applicationService.getHRApplications(user.getId());
            return ResponseEntity.ok(ApiResponse.success(applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch HR applications: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Application>> updateApplicationStatus(@PathVariable Long id,
                                                                          @RequestParam ApplicationStatus status,
                                                                          @RequestParam(required = false) String notes,
                                                                          Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            // Check if user is HR or Admin
            if (!user.getRole().name().equals("HR") && !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            
            Application application = applicationService.updateApplicationStatus(id, status, notes, user);
            return ResponseEntity.ok(ApiResponse.success("Application status updated successfully", application));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update application status: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Application>> getApplicationById(@PathVariable Long id, 
                                                                     Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Application application = applicationService.getApplicationById(id);
            
            // Check if user has access to this application
            if (!application.getUser().getId().equals(user.getId()) && 
                !user.getRole().name().equals("HR") && 
                !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            
            return ResponseEntity.ok(ApiResponse.success(application));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch application: " + e.getMessage()));
        }
    }

    private final com.neoorganization.careernestbackend.service.ApplicationActionService applicationActionService;

    @GetMapping("/{id}/actions")
    public ResponseEntity<ApiResponse<java.util.List<com.neoorganization.careernestbackend.model.ApplicationAction>>> getApplicationActions(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Application application = applicationService.getApplicationById(id);
            // restrict access same as getApplicationById
            if (!application.getUser().getId().equals(user.getId()) && 
                !user.getRole().name().equals("HR") && 
                !user.getRole().name().equals("ADMIN")) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Access denied"));
            }
            java.util.List<com.neoorganization.careernestbackend.model.ApplicationAction> actions = applicationActionService.getActionsForApplication(id);
            return ResponseEntity.ok(ApiResponse.success(actions));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch application actions: " + e.getMessage()));
        }
    }
}
