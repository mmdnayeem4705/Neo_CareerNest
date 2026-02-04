package com.neoorganization.careernestbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "login_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "login_at")
    private LocalDateTime loginAt;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "success")
    private boolean success;

    @PrePersist
    protected void onCreate() {
        if (loginAt == null) loginAt = LocalDateTime.now();
    }
}
