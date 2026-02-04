package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.dto.ApplicationRequest;
import com.neoorganization.careernestbackend.model.*;
import com.neoorganization.careernestbackend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final JobService jobService;
    private final InternshipService internshipService;
    private final com.neoorganization.careernestbackend.service.ApplicationActionService applicationActionService;
    private final com.neoorganization.careernestbackend.service.SseService sseService;
    
    

	public Application createApplication(ApplicationRequest applicationRequest, User user) {
        Application application = new Application();
        application.setUser(user);
        String coverText = applicationRequest.getCoverLetter();
        if (applicationRequest.getAdditionalInfo() != null && !applicationRequest.getAdditionalInfo().isBlank()) {
            coverText = (coverText != null ? coverText + " " : "") + applicationRequest.getAdditionalInfo();
        }
        application.setCoverLetter(coverText != null ? coverText : "");
        application.setResumeUrl(applicationRequest.getResumeUrl());
        application.setStatus(ApplicationStatus.PENDING);
        
        if (applicationRequest.getJobId() != null) {
            Job job = jobService.getJobById(applicationRequest.getJobId());
            application.setJob(job);
            
            // Check if user already applied for this job
            if (applicationRepository.findByUser_IdAndJob_Id(user.getId(), applicationRequest.getJobId()).isPresent()) {
                throw new RuntimeException("You have already applied for this job");
            }
        }
        
        if (applicationRequest.getInternshipId() != null) {
            Internship internship = internshipService.getInternshipById(applicationRequest.getInternshipId());
            application.setInternship(internship);
            
            // Check if user already applied for this internship
            if (applicationRepository.findByUser_IdAndInternship_Id(user.getId(), applicationRequest.getInternshipId()).isPresent()) {
                throw new RuntimeException("You have already applied for this internship");
            }
        }
        
        application.setAtsScore(computeAtsScore(application));
        try {
            Application saved = applicationRepository.save(application);
            // notify HRs that an application was submitted
            try {
                sseService.sendEvent("application-created", saved);
            } catch (Exception e) {
                log.warn("Failed to broadcast application-created event: {}", e.getMessage());
            }
            return saved;
        } catch (Exception e) {
            log.error("Failed to create application: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create application: " + e.getMessage());
        }
    }
    
    public List<Application> getUserApplications(Long userId) {
        return applicationRepository.findByUser_IdOrderByAppliedAtDesc(userId);
    }
    
    public List<Application> getJobApplications(Long jobId) {
        return applicationRepository.findByJob_IdOrderByAppliedAtDesc(jobId);
    }
    
    public List<Application> getInternshipApplications(Long internshipId) {
        return applicationRepository.findByInternship_IdOrderByAppliedAtDesc(internshipId);
    }
    
    public List<Application> getHRApplications(Long hrId) {
        return applicationRepository.findByHRApplications(hrId);
    }
    
    public Application updateApplicationStatus(Long applicationId, ApplicationStatus status, String notes, User reviewedBy) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        
        com.neoorganization.careernestbackend.model.ApplicationStatus previous = application.getStatus();
        application.setStatus(status);
        application.setNotes(notes);
        application.setReviewedBy(reviewedBy);
        application.setReviewedAt(LocalDateTime.now());
        
        Application saved = applicationRepository.save(application);
        // record action history
        try {
            applicationActionService.recordStatusChange(saved, previous, status, notes, reviewedBy);
        } catch (Exception e) {
            log.warn("Failed to record application action: {}", e.getMessage());
        }
        return saved;
    }
    
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }
    
    public long getApplicationCountByJobAndStatus(Long jobId, ApplicationStatus status) {
        return applicationRepository.countByJob_IdAndStatus(jobId, status);
    }
    
    public long getApplicationCountByInternshipAndStatus(Long internshipId, ApplicationStatus status) {
        return applicationRepository.countByInternship_IdAndStatus(internshipId, status);
    }
    
    /**
     * Computes ATS score (0-100) by matching job/internship required skills against cover letter.
     */
    private Integer computeAtsScore(Application app) {
        String skillsStr = null;
        if (app.getJob() != null && app.getJob().getSkillsRequired() != null) {
            skillsStr = app.getJob().getSkillsRequired();
        } else if (app.getInternship() != null && app.getInternship().getSkillsRequired() != null) {
            skillsStr = app.getInternship().getSkillsRequired();
        }
        if (skillsStr == null || skillsStr.isBlank()) return 50;
        String cover = (app.getCoverLetter() != null ? app.getCoverLetter() : "").toLowerCase();
        String resumePart = (app.getUser() != null && app.getUser().getResumeUrl() != null)
                ? " " + app.getUser().getResumeUrl().toLowerCase() : "";
        String applicantText = cover + resumePart;
        List<String> skills = Arrays.stream(skillsStr.split("[,\\s]+"))
                .map(String::trim)
                .filter(s -> s.length() > 1)
                .map(String::toLowerCase)
                .distinct()
                .collect(Collectors.toList());
        if (skills.isEmpty()) return 50;
        long matched = skills.stream().filter(s -> applicantText.contains(s)).count();
        int score = (int) Math.round((matched * 100.0) / skills.size());
        return Math.min(100, Math.max(0, score));
    }
}
