package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.dto.InternshipRequest;
import com.neoorganization.careernestbackend.model.Internship;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InternshipService {
    
    private final InternshipRepository internshipRepository;

	public List<Internship> getAllInternships() {
        return internshipRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public List<Internship> getInternshipsWithFilters(String title, String department, String location, String type) {
        return internshipRepository.findInternshipsWithFilters(title, department, location, type);
    }
    
    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found with id: " + id));
    }
    
    public Internship createInternship(InternshipRequest internshipRequest, User createdBy) {
        Internship internship = new Internship();
        internship.setTitle(internshipRequest.getTitle());
        internship.setDescription(internshipRequest.getDescription());
        internship.setDepartment(internshipRequest.getDepartment());
        internship.setDescription(internshipRequest.getDescription());
        internship.setVacancies(internshipRequest.getVacancies());
        internship.setDescription(internshipRequest.getDescription());
        internship.setTitle(internshipRequest.getTitle());
        internship.setStipendAmount(internshipRequest.getStipendAmount());
        internship.setSkillsRequired(internshipRequest.getSkillsRequired());
        internship.setLearningObjectives(internshipRequest.getLearningObjectives());
        internship.setApplicationDeadline(internshipRequest.getApplicationDeadline());
        internship.setStartDate(internshipRequest.getStartDate());
        internship.setStartDate(internshipRequest.getStartDate());
        internship.setCreatedBy(createdBy);
        internship.setIsActive(true);
        
        return internshipRepository.save(internship);
    }
    
    public Internship updateInternship(Long id, InternshipRequest internshipRequest, User updatedBy) {
        Internship internship = getInternshipById(id);
        
        // Check if user has permission to update this internship
        if (!internship.getCreatedBy().getId().equals(updatedBy.getId()) && !updatedBy.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You don't have permission to update this internship");
        }
        
        internship.setTitle(internshipRequest.getTitle());
        internship.setDescription(internshipRequest.getDescription());
        internship.setDepartment(internshipRequest.getDepartment());
        internship.setDescription(internshipRequest.getDescription());
        internship.setVacancies(internshipRequest.getVacancies());
        internship.setDescription(internshipRequest.getDescription());
        internship.setTitle(internshipRequest.getTitle());
        internship.setStipendAmount(internshipRequest.getStipendAmount());
        internship.setSkillsRequired(internshipRequest.getSkillsRequired());
        internship.setLearningObjectives(internshipRequest.getLearningObjectives());
        internship.setApplicationDeadline(internshipRequest.getApplicationDeadline());
        internship.setStartDate(internshipRequest.getStartDate());
        internship.setStartDate(internshipRequest.getStartDate());
        
        return internshipRepository.save(internship);
    }
    
    public void deleteInternship(Long id, User deletedBy) {
        Internship internship = getInternshipById(id);
        
        // Check if user has permission to delete this internship
        if (!internship.getCreatedBy().getId().equals(deletedBy.getId()) && !deletedBy.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("You don't have permission to delete this internship");
        }
        
        internship.setIsActive(false);
        internshipRepository.save(internship);
    }
    
    public List<Internship> getInternshipsByHR(Long hrId) {
        return internshipRepository.findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(hrId);
    }

	public Internship getInternshipById(Object internshipId) {
		// TODO Auto-generated method stub
		return null;
	}
}
