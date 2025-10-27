package com.neoorganization.careernestbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class JobRequest {
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
    
    @NotNull
    private BigDecimal salaryMin;
    
    @NotNull
    private BigDecimal salaryMax;
    
    @NotBlank
    private String employmentType;
    
    @NotBlank
    private String experienceLevel;
    
    private String skillsRequired;
    private String benefits;
    private LocalDateTime applicationDeadline;
	public Object getDepartment() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getTitle() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getApplicationDeadline() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getDescription() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getVacancies() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getSalaryMin() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getEmploymentType() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getExperienceLevel() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getSkillsRequired() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getBenefits() {
		// TODO Auto-generated method stub
		return null;
	}
}
