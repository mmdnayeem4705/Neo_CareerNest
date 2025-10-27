package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.dto.ApplicationRequest;
import com.neoorganization.careernestbackend.model.*;
import com.neoorganization.careernestbackend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final JobService jobService;
    private final InternshipService internshipService;
    
    

	public Application createApplication(ApplicationRequest applicationRequest, User user) {
        Application application = new Application();
        application.setUser(user);
        application.setCoverLetter(applicationRequest.getCoverLetter());
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
        
        return applicationRepository.save(application);
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
        
        application.setStatus(status);
        application.setNotes(notes);
        application.setReviewedBy(reviewedBy);
        application.setReviewedAt(LocalDateTime.now());
        
        return applicationRepository.save(application);
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
}
