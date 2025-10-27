package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.Application;
import com.neoorganization.careernestbackend.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser_IdOrderByAppliedAtDesc(Long userId);
    
    List<Application> findByJob_IdOrderByAppliedAtDesc(Long jobId);
    
    List<Application> findByInternship_IdOrderByAppliedAtDesc(Long internshipId);
    
    @Query("SELECT a FROM Application a WHERE " +
           "(a.job.id IN (SELECT j.id FROM Job j WHERE j.createdBy.id = :hrId)) OR " +
           "(a.internship.id IN (SELECT i.id FROM Internship i WHERE i.createdBy.id = :hrId))")
    List<Application> findByHRApplications(@Param("hrId") Long hrId);
    
    Optional<Application> findByUser_IdAndJob_Id(Long userId, Long jobId);
    
    Optional<Application> findByUser_IdAndInternship_Id(Long userId, Long internshipId);
    
    long countByJob_IdAndStatus(Long jobId, ApplicationStatus status);
    
    long countByInternship_IdAndStatus(Long internshipId, ApplicationStatus status);
}
