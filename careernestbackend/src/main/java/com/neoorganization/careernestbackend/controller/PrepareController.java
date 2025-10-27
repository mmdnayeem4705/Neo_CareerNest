package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.model.CareerGuide;
import com.neoorganization.careernestbackend.repository.CareerGuideRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prepare")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PrepareController {
    
    private final CareerGuideRepository careerGuideRepository = null;
    
    @GetMapping("/career-guides")
    public ResponseEntity<ApiResponse<List<CareerGuide>>> getCareerGuides(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String searchTerm) {
        
        try {
            List<CareerGuide> guides;
            if (category != null || searchTerm != null) {
                guides = careerGuideRepository.findGuidesWithFilters(category, searchTerm);
            } else {
                guides = careerGuideRepository.findByIsActiveTrueOrderByCreatedAtDesc();
            }
            return ResponseEntity.ok(ApiResponse.success(guides));
        } catch (Exception e) {
            ApiResponse<List<CareerGuide>> log;
			ApiResponse.error("Failed to fetch career guides: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch career guides: " + e.getMessage()));
        }
    }
    
    @GetMapping("/career-guides/featured")
    public ResponseEntity<ApiResponse<List<CareerGuide>>> getFeaturedGuides() {
        try {
            List<CareerGuide> guides = careerGuideRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc();
            return ResponseEntity.ok(ApiResponse.success(guides));
        } catch (Exception e) {
            ApiResponse<List<CareerGuide>> log;
			ApiResponse.error("Failed to fetch featured guides: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch featured guides: " + e.getMessage()));
        }
    }
    
    @GetMapping("/career-guides/{id}")
    public ResponseEntity<ApiResponse<CareerGuide>> getCareerGuideById(@PathVariable Long id) {
        try {
            CareerGuide guide = careerGuideRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Career guide not found with id: " + id));
            
            // Increment view count
            guide.setViewCount(guide.getViewCount() + 1);
            careerGuideRepository.save(guide);
            
            return ResponseEntity.ok(ApiResponse.success(guide));
        } catch (Exception e) {
            ApiResponse<List<CareerGuide>> log;
			ApiResponse.error("Failed to fetch career guide: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch career guide: " + e.getMessage()));
        }
    }
    
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        try {
            List<String> categories = List.of(
                "RESUME_TIPS", 
                "INTERVIEW_PREP", 
                "CAREER_ADVICE", 
                "SKILL_DEVELOPMENT"
            );
            return ResponseEntity.ok(ApiResponse.success(categories));
        } catch (Exception e) {
            ApiResponse<List<CareerGuide>> log;
			ApiResponse.error("Failed to fetch categories: {}", e.getMessage());
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch categories: " + e.getMessage()));
        }
    }
}
