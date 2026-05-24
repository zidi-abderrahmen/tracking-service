package com.ia.servicesmanagementdb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idUser;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "engineer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"service", "engineer"})
    private List<ServicesEngineer> servicesEngineers;

    @OneToMany(mappedBy = "engineer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"service", "engineer"})
    private List<Timesheet> timesheets;

    public enum Role {
        ADMIN,
        ENGINEER
    }
}
