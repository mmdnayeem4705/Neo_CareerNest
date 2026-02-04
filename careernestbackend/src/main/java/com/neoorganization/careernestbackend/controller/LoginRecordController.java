package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.model.LoginRecord;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.LoginRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logins")
@RequiredArgsConstructor
@Slf4j
@org.springframework.web.bind.annotation.CrossOrigin(origins = "*")
public class LoginRecordController {

    private final LoginRecordService loginRecordService;

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<LoginRecord>>> getMyLogins(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<LoginRecord> records = loginRecordService.getRecordsForUser(user.getId());
            return ResponseEntity.ok(ApiResponse.success(records));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch login records: " + e.getMessage()));
        }
    }
}
