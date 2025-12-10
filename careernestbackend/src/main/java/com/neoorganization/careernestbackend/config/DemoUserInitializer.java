package com.neoorganization.careernestbackend.config;

import com.neoorganization.careernestbackend.model.Role;
import com.neoorganization.careernestbackend.model.User;
import com.neoorganization.careernestbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
@RequiredArgsConstructor
@Slf4j
public class DemoUserInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        createDemoUser("jobseeker@demo.com", "Demo", "Seeker", Role.JOB_SEEKER, "demo123", "+1999111000");
        createDemoUser("hr@neo.com", "Demo", "HR", Role.HR, "hr123", "+1999111001");
    }

    private void createDemoUser(String email,
                                String firstName,
                                String lastName,
                                Role role,
                                String rawPassword,
                                String phoneNumber) {
        if (userRepository.existsByEmail(email)) {
            log.debug("Demo user {} already exists, skipping creation.", email);
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(role);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setIsActive(true);
        user.setIsVerified(true);

        userRepository.save(user);
        log.info("Demo user {} created successfully.", email);
    }
}

