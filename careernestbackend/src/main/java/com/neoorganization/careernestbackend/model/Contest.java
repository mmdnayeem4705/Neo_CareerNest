package com.neoorganization.careernestbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "contests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contest {
    
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
    @Size(max = 20)
    @Column(name = "type")
    private String type; // CODING, MOCK_TEST, HACKATHON, QUIZ
    
    @NotBlank
    @Size(max = 50)
    @Column(name = "difficulty_level")
    private String difficultyLevel; // EASY, MEDIUM, HARD
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "max_participants")
    private Integer maxParticipants;
    
    @Column(name = "prize_amount")
    private Double prizeAmount;
    
    @Column(name = "rules", columnDefinition = "TEXT")
    private String rules;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "registration_deadline")
    private LocalDateTime registrationDeadline;
    
    @Column(name = "start_time")
    private LocalDateTime startTime;
    
    @Column(name = "end_time")
    private LocalDateTime endTime;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
