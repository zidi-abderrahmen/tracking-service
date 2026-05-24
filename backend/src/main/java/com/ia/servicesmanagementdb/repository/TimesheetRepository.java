package com.ia.servicesmanagementdb.repository;

import com.ia.servicesmanagementdb.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TimesheetRepository extends JpaRepository<Timesheet, UUID> {
    List<Timesheet> findByDate(LocalDate date);

    @Query("SELECT t FROM Timesheet t " +
            "JOIN FETCH t.engineer " +
            "JOIN FETCH t.service s " +
            "WHERE s.client.idClient = :idClient " +
            "AND s.createDate BETWEEN :startDate AND :endDate " +
            "AND (:idService IS NULL OR s.idService = :idService)")
    List<Timesheet> findReportData(
            @Param("idClient") UUID idClient,
            @Param("idService") UUID idService,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("SELECT t FROM Timesheet t " +
            "JOIN FETCH t.service s " +
            "JOIN FETCH t.engineer e " +
            "WHERE e.idUser = :idEngineer")
    List<Timesheet> findByEngineerId(@Param("idEngineer") UUID idEngineer);
}
