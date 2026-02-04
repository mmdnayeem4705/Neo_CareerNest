package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.LoginRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRecordRepository extends JpaRepository<LoginRecord, Long> {
    List<LoginRecord> findByUser_IdOrderByLoginAtDesc(Long userId);
}
