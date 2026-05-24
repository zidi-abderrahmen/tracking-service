package com.ia.servicesmanagementdb.repository;

import com.ia.servicesmanagementdb.model.Service;
import com.ia.servicesmanagementdb.model.ServicesEngineer;
import com.ia.servicesmanagementdb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ServicesEngineerRepository extends JpaRepository<ServicesEngineer, UUID> {

    @Query("SELECT se FROM ServicesEngineer se " +
            "WHERE LOWER(se.engineer.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(se.engineer.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<ServicesEngineer> findByEngineerName(@Param("name") String name);

    @Query("SELECT se FROM ServicesEngineer se " +
            "JOIN FETCH se.service s " +
            "JOIN FETCH s.client c " +
            "WHERE (LOWER(c.companyName) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(c.firstName) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<ServicesEngineer> findByClientName(@Param("name") String name);

    @Query("SELECT se FROM ServicesEngineer se " +
            "JOIN FETCH se.service " +
            "WHERE se.engineer.idUser = :idEngineer")
    List<ServicesEngineer> findByEngineerId(@Param("idEngineer") UUID idEngineer);

    @Query("SELECT se.service FROM ServicesEngineer se " +
            "WHERE se.service.client.idClient = :idClient " +
            "AND se.engineer.idUser = :idEngineer")
    List<Service> findServicesByClientAndEngineer(
            @Param("idClient") UUID idClient,
            @Param("idEngineer") UUID idEngineer
    );

    boolean existsByEngineerAndService(User engineer, Service service);
}
