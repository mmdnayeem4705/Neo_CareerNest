package com.neoorganization.careernestbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ApplicationRequest {
    @NotBlank
    private String coverLetter;
    
    private String resumeUrl;
    private Long jobId;
    private Long internshipId;
    
    // Explicit getters for fields that need them
    public String getCoverLetter() {
        return coverLetter;
    }
    
    public String getResumeUrl() {
        return resumeUrl;
    }
    
    public Long getJobId() {
        return jobId;
    }
    
    public Long getInternshipId() {
        return internshipId;
    }
}
