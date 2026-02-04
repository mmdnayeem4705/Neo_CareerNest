package com.neoorganization.careernestbackend.service;

import com.neoorganization.careernestbackend.model.LoginRecord;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.repository.LoginRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginRecordService {
    private final LoginRecordRepository loginRecordRepository;

    public LoginRecord recordLogin(User user, boolean success, String ip, String ua) {
        LoginRecord lr = new LoginRecord();
        lr.setUser(user);
        lr.setSuccess(success);
        lr.setIpAddress(ip);
        lr.setUserAgent(ua);
        lr.setLoginAt(LocalDateTime.now());
        return loginRecordRepository.save(lr);
    }

    public List<LoginRecord> getRecordsForUser(Long userId) {
        return loginRecordRepository.findByUser_IdOrderByLoginAtDesc(userId);
    }
}
