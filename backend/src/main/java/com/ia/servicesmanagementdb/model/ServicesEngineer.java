package com.ia.servicesmanagementdb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "services_engineer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ServicesEngineer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idServicesEngineer;

    @ManyToOne
    @JsonIgnoreProperties("servicesEngineers")
    @JoinColumn(name = "id_user", nullable = false)
    private User engineer;

    @ManyToOne
    @JsonIgnoreProperties("servicesEngineers")
    @JoinColumn(name = "id_service", nullable = false)
    private Service service;

    @Column(nullable = false)
    private LocalDate createDate = LocalDate.now();
}
