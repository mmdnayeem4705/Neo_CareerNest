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

    // Additional application fields
    private String additionalInfo;
    private String expectedSalary;
    private String availability;
    private String portfolio;
}
