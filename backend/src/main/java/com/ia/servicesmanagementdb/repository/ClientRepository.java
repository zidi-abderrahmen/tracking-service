package com.ia.servicesmanagementdb.repository;

import com.ia.servicesmanagementdb.model.Client;
import com.ia.servicesmanagementdb.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<Client> findByEmail(String email);

    @Query("SELECT c FROM Client c WHERE LOWER(c.companyName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Client> findByCompanyName(@Param("name") String name);

    boolean existsByEmail(String email);
}