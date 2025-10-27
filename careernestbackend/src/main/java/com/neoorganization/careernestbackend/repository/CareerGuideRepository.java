package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.CareerGuide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerGuideRepository extends JpaRepository<CareerGuide, Long> {
    List<CareerGuide> findByIsActiveTrueOrderByCreatedAtDesc();
    
    List<CareerGuide> findByCategoryAndIsActiveTrueOrderByCreatedAtDesc(String category);
    
    List<CareerGuide> findByIsFeaturedTrueAndIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT cg FROM CareerGuide cg WHERE cg.isActive = true AND " +
           "(:category IS NULL OR cg.category = :category) AND " +
           "(:searchTerm IS NULL OR LOWER(cg.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(cg.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<CareerGuide> findGuidesWithFilters(@Param("category") String category,
                                           @Param("searchTerm") String searchTerm);
    
    List<CareerGuide> findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(Long userId);
}
