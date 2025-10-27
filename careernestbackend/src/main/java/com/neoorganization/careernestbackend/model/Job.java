package com.neoorganization.careernestbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    @Column(name = "title")
    private String title;
    
    @NotBlank
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    @Size(max = 50)
    @Column(name = "department")
    private String department;
    
    @NotBlank
    @Size(max = 50)
    @Column(name = "location")
    private String location;
    
    @NotNull
    @Positive
    @Column(name = "vacancies")
    private Integer vacancies;
    
    @NotNull
    @Column(name = "salary_min")
    private BigDecimal salaryMin;
    
    @NotNull
    @Column(name = "salary_max")
    private BigDecimal salaryMax;
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "employment_type")
    private String employmentType; // FULL_TIME, PART_TIME, CONTRACT
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "experience_level")
    private String experienceLevel; // ENTRY, MID, SENIOR
    
    @Column(name = "skills_required", columnDefinition = "TEXT")
    private String skillsRequired;
    
    @Column(name = "benefits", columnDefinition = "TEXT")
    private String benefits;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Application> applications;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

	public void setApplicationDeadline(Object applicationDeadline2) {
		// TODO Auto-generated method stub
		
	}

	public void setTitle(Object title2) {
		// TODO Auto-generated method stub
		
	}

	public void setDescription(Object description2) {
		// TODO Auto-generated method stub
		
	}

	public void setDepartment(Object department2) {
		// TODO Auto-generated method stub
		
	}

	public void setVacancies(Object vacancies2) {
		// TODO Auto-generated method stub
		
	}

	public void setSalaryMin(Object salaryMin2) {
		// TODO Auto-generated method stub
		
	}

	public void setEmploymentType(Object employmentType2) {
		// TODO Auto-generated method stub
		
	}

	public void setExperienceLevel(Object experienceLevel2) {
		// TODO Auto-generated method stub
		
	}

	public void setSkillsRequired(Object skillsRequired2) {
		// TODO Auto-generated method stub
		
	}

	public void setBenefits(Object benefits2) {
		// TODO Auto-generated method stub
		
	}

	public void setCreatedBy(User createdBy2) {
		// TODO Auto-generated method stub
		
	}

	public void setIsActive(boolean b) {
		// TODO Auto-generated method stub
		
	}

	public User getCreatedBy() {
		// TODO Auto-generated method stub
		return null;
	}
}
