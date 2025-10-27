package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT j FROM Job j WHERE j.isActive = true AND " +
           "(:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:department IS NULL OR LOWER(j.department) LIKE LOWER(CONCAT('%', :department, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:employmentType IS NULL OR j.employmentType = :employmentType) AND " +
           "(:experienceLevel IS NULL OR j.experienceLevel = :experienceLevel)")
    List<Job> findJobsWithFilters(@Param("title") String title,
                                 @Param("department") String department,
                                 @Param("location") String location,
                                 @Param("employmentType") String employmentType,
                                 @Param("experienceLevel") String experienceLevel);
    
    List<Job> findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(Long userId);
}
