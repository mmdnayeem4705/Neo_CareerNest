package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContestRepository extends JpaRepository<Contest, Long> {
    List<Contest> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT c FROM Contest c WHERE c.isActive = true AND " +
           "(:type IS NULL OR c.type = :type) AND " +
           "(:difficultyLevel IS NULL OR c.difficultyLevel = :difficultyLevel) AND " +
           "c.registrationDeadline > :currentTime")
    List<Contest> findActiveContestsWithFilters(@Param("type") String type,
                                               @Param("difficultyLevel") String difficultyLevel,
                                               @Param("currentTime") LocalDateTime currentTime);
    
    List<Contest> findByCreatedBy_IdAndIsActiveTrueOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT c FROM Contest c WHERE c.isActive = true AND c.startTime <= :currentTime AND c.endTime >= :currentTime")
    List<Contest> findOngoingContests(@Param("currentTime") LocalDateTime currentTime);
}
