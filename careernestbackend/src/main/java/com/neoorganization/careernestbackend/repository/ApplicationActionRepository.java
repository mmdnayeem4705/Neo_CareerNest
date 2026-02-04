package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.ApplicationAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationActionRepository extends JpaRepository<ApplicationAction, Long> {
    List<ApplicationAction> findByApplication_IdOrderByPerformedAtDesc(Long applicationId);
}
