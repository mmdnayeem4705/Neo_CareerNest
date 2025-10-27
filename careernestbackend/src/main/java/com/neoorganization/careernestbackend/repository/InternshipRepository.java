package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT i FROM Internship i WHERE i.isActive = true AND " +
           "(:title IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:department IS NULL OR LOWER(i.department) LIKE LOWER(CONCAT('%', :department, '%'))) AND " +
           "(:location IS NULL OR LOWER(i.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:type IS NULL OR i.type = :type)")
    List<Internship> findInternshipsWithFilters(@Param("title") String title,
                                               @Param("department") String department,
                                               @Param("location") String location,
                                               @Param("type") String type);
    
    List<Internship> findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(Long userId);
}
