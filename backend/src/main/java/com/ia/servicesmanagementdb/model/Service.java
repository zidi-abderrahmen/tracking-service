package com.ia.servicesmanagementdb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "services")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idService;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private RequestType requestType;

    @Column(nullable = false)
    private LocalDate createDate = LocalDate.now();

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @ManyToOne
    @JsonIgnoreProperties("services")
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"engineer", "service"})
    private List<ServicesEngineer> servicesEngineers;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"engineer", "service"})
    private List<Timesheet> timesheets;

    public enum RequestType {
        CONTRACT,
        PURCHASE_ORDER
    }
}
