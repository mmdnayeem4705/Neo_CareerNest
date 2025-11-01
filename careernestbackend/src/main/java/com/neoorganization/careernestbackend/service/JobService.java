package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.dto.JobRequest;
import com.neoorganization.careernestbackend.model.Job;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {
    
    private final JobRepository jobRepository;

	public List<Job> getAllJobs() {
        return jobRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public List<Job> getJobsWithFilters(String title, String department, String location, 
                                       String employmentType, String experienceLevel) {
        return jobRepository.findJobsWithFilters(title, department, location, employmentType, experienceLevel);
    }
    
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }
    
    public Job createJob(JobRequest jobRequest, User createdBy) {
	Job job = new Job();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setDepartment(jobRequest.getDepartment());
        job.setLocation(jobRequest.getLocation());
        job.setVacancies(jobRequest.getVacancies());
        job.setSalaryMin(jobRequest.getSalaryMin());
        job.setSalaryMax(jobRequest.getSalaryMax());
        job.setEmploymentType(jobRequest.getEmploymentType());
        job.setExperienceLevel(jobRequest.getExperienceLevel());
        job.setSkillsRequired(jobRequest.getSkillsRequired());
        job.setBenefits(jobRequest.getBenefits());
        job.setApplicationDeadline(jobRequest.getApplicationDeadline());
        job.setCreatedBy(createdBy);
        job.setIsActive(true);
        
        return jobRepository.save(job);
    }
    
    public Job updateJob(Long id, JobRequest jobRequest, User updatedBy) {
        Job job = getJobById(id);
        
        // Check if user has permission to update this job
        if (!job.getCreatedBy().getId().equals(updatedBy.getId()) && !updatedBy.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You don't have permission to update this job");
        }
        
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setDepartment(jobRequest.getDepartment());
        job.setLocation(jobRequest.getLocation());
        job.setVacancies(jobRequest.getVacancies());
        job.setSalaryMin(jobRequest.getSalaryMin());
        job.setSalaryMax(jobRequest.getSalaryMax());
        job.setEmploymentType(jobRequest.getEmploymentType());
        job.setExperienceLevel(jobRequest.getExperienceLevel());
        job.setSkillsRequired(jobRequest.getSkillsRequired());
        job.setBenefits(jobRequest.getBenefits());
        job.setApplicationDeadline(jobRequest.getApplicationDeadline());
        
        return jobRepository.save(job);
    }
    
    public void deleteJob(Long id, User deletedBy) {
        Job job = getJobById(id);
        
        // Check if user has permission to delete this job
        if (!job.getCreatedBy().getId().equals(deletedBy.getId()) && !deletedBy.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You don't have permission to delete this job");
        }
        
        job.setIsActive(false);
        jobRepository.save(job);
    }
    
    public List<Job> getJobsByHR(Long hrId) {
        return jobRepository.findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(hrId);
    }
}
