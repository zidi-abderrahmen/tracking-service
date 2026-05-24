package com.ia.servicesmanagementdb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "timesheet")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Timesheet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idTimesheet;

    @ManyToOne
    @JsonIgnoreProperties({"timesheets", "servicesEngineers", "password", "role"})
    @JoinColumn(name = "id_engineer", nullable = false)
    private User engineer;

    @ManyToOne
    @JsonIgnoreProperties({"timesheets", "servicesEngineers", "description"})
    @JoinColumn(name = "id_service",  nullable = false)
    private Service service;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Float hours;
}
