package com.neoorganization.careernestbackend.controller;

import com.neoorganization.careernestbackend.config.JwtTokenProvider;
import com.neoorganization.careernestbackend.dto.ApiResponse;
import com.neoorganization.careernestbackend.dto.LoginRequest;
import com.neoorganization.careernestbackend.dto.SignupRequest;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticateUser(loginRequest);
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            String token = jwtTokenProvider.generateToken(authentication);
            
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("user", user);
            responseData.put("token", token);
            
            return ResponseEntity.ok(ApiResponse.success("Login successful", responseData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            log.info("Registration attempt for email: {}", signupRequest.getEmail());
            log.info("First name: {}, Last name: {}", signupRequest.getFirstName(), signupRequest.getLastName());
            log.info("Role: {}", signupRequest.getRole());
            
            User user = userService.registerUser(signupRequest);
            log.info("Registration successful for user: {}", user.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Registration successful", user));
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test() {
        return ResponseEntity.ok(ApiResponse.success("Backend is working!"));
    }
    
    @GetMapping("/verify-auth")
    public ResponseEntity<ApiResponse<User>> verifyAuth(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.ok(ApiResponse.success("User authenticated", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Authentication failed"));
        }
    }
}
