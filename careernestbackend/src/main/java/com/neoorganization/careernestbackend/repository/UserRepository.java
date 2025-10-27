package com.neoorganization.careernestbackend.repository;

import com.neoorganization.careernestbackend.model.Role;
import com.neoorganization.careernestbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByEmailAndIsActiveTrue(String email);
    long countByRole(Role role);
}
