package com.neoorganization.careernestbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "internships")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Internship {
    
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
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "duration")
    private String duration; // 3 months, 6 months, etc.
    
    @NotBlank
    @Size(max = 20)
    @Column(name = "type")
    private String type; // PAID, UNPAID, STIPEND
    
    @Column(name = "stipend_amount")
    private Double stipendAmount;
    
    @Column(name = "skills_required", columnDefinition = "TEXT")
    private String skillsRequired;
    
    @Column(name = "learning_objectives", columnDefinition = "TEXT")
    private String learningObjectives;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "start_date")
    private LocalDateTime startDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @OneToMany(mappedBy = "internship", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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

	public void setDescription1(Object description2) {
		// TODO Auto-generated method stub
		
	}

	public void setStipendAmount(Object stipendAmount2) {
		// TODO Auto-generated method stub
		
	}

	public void setSkillsRequired(Object skillsRequired2) {
		// TODO Auto-generated method stub
		
	}

	public void setLearningObjectives(Object learningObjectives2) {
		// TODO Auto-generated method stub
		
	}

	public void setApplicationDeadline(Object applicationDeadline2) {
		// TODO Auto-generated method stub
		
	}

	public void setStartDate(Object startDate2) {
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
