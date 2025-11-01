package com.neoorganization.careernestbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InternshipRequest {
    @NotBlank
    private String title;
    
    @NotBlank
    private String description;
    
    @NotBlank
    private String department;
    
    @NotBlank
    private String location;
    
    @NotNull
    @Positive
    private Integer vacancies;
    
    @NotBlank
    private String duration;
    
    @NotBlank
    private String type;
    
    private Double stipendAmount;
    private String skillsRequired;
    private String learningObjectives;
    private LocalDateTime applicationDeadline;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
