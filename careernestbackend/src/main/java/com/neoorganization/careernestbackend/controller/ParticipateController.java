package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.model.Contest;
import com.neoorganization.careernestbackend.repository.ContestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/participate")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ParticipateController {
    
    private final ContestRepository contestRepository = null;
    
    @GetMapping("/contests")
    public ResponseEntity<ApiResponse<List<Contest>>> getContests(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String difficultyLevel) {
        
        try {
            List<Contest> contests;
            if (type != null || difficultyLevel != null) {
                contests = contestRepository.findActiveContestsWithFilters(type, difficultyLevel, LocalDateTime.now());
            } else {
                contests = contestRepository.findByIsActiveTrueOrderByCreatedAtDesc();
            }
            return ResponseEntity.ok(ApiResponse.success(contests));
        } catch (Exception e) {
            ApiResponse<List<Contest>> log;
			ApiResponse.error("Failed to fetch contests: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch contests: " + e.getMessage()));
        }
    }
    
    @GetMapping("/contests/ongoing")
    public ResponseEntity<ApiResponse<List<Contest>>> getOngoingContests() {
        try {
            List<Contest> contests = contestRepository.findOngoingContests(LocalDateTime.now());
            return ResponseEntity.ok(ApiResponse.success(contests));
        } catch (Exception e) {
            ApiResponse<List<Contest>> log;
			ApiResponse.error("Failed to fetch ongoing contests: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch ongoing contests: " + e.getMessage()));
        }
    }
    
    @GetMapping("/contests/{id}")
    public ResponseEntity<ApiResponse<Contest>> getContestById(@PathVariable Long id) {
        try {
            Contest contest = contestRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Contest not found with id: " + id));
            return ResponseEntity.ok(ApiResponse.success(contest));
        } catch (Exception e) {
            ApiResponse<List<Contest>> log;
			ApiResponse.error("Failed to fetch contest: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch contest: " + e.getMessage()));
        }
    }
    
    @GetMapping("/types")
    public ResponseEntity<ApiResponse<List<String>>> getContestTypes() {
        try {
            List<String> types = List.of("CODING", "MOCK_TEST", "HACKATHON", "QUIZ");
            return ResponseEntity.ok(ApiResponse.success(types));
        } catch (Exception e) {
            ApiResponse<List<Contest>> log;
			ApiResponse.error("Failed to fetch contest types: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch contest types: " + e.getMessage()));
        }
    }
    
    @GetMapping("/difficulty-levels")
    public ResponseEntity<ApiResponse<List<String>>> getDifficultyLevels() {
        try {
            List<String> levels = List.of("EASY", "MEDIUM", "HARD");
            return ResponseEntity.ok(ApiResponse.success(levels));
        } catch (Exception e) {
            ApiResponse<List<Contest>> log;
			ApiResponse.error("Failed to fetch difficulty levels: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch difficulty levels: " + e.getMessage()));
        }
    }
}
