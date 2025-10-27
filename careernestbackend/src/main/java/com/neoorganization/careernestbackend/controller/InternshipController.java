package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.dto.InternshipRequest;
import com.neoorganization.careernestbackend.model.Internship;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class InternshipController {
    
    private final InternshipService internshipService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Internship>>> getAllInternships(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type) {
        
        try {
            List<Internship> internships;
            if (title != null || department != null || location != null || type != null) {
                internships = internshipService.getInternshipsWithFilters(title, department, location, type);
            } else {
                internships = internshipService.getAllInternships();
            }
            return ResponseEntity.ok(ApiResponse.success(internships));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch internships: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Internship>> getInternshipById(@PathVariable Long id) {
        try {
            Internship internship = internshipService.getInternshipById(id);
            return ResponseEntity.ok(ApiResponse.success(internship));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch internship: " + e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<Internship>> createInternship(@Valid @RequestBody InternshipRequest internshipRequest, 
                                                                  Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Internship internship = internshipService.createInternship(internshipRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Internship created successfully", internship));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create internship: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Internship>> updateInternship(@PathVariable Long id, 
                                                                  @Valid @RequestBody InternshipRequest internshipRequest, 
                                                                  Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Internship internship = internshipService.updateInternship(id, internshipRequest, user);
            return ResponseEntity.ok(ApiResponse.success("Internship updated successfully", internship));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to update internship: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInternship(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            internshipService.deleteInternship(id, user);
            return ResponseEntity.ok(ApiResponse.success("Internship deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to delete internship: " + e.getMessage()));
        }
    }
}
