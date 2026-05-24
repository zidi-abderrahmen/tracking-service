package com.ia.servicesmanagementdb.repository;

import com.ia.servicesmanagementdb.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServiceRepository extends JpaRepository<Service, UUID> {

    @Query("SELECT s FROM Service s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Service> findByTitle(@Param("title") String title);

    @Query("SELECT s FROM Service s WHERE s.client.idClient = :clientId")
    List<Service> findByClientId(@Param("clientId") UUID clientId);

    boolean existsByTitle(@Param("title") String title);
}
