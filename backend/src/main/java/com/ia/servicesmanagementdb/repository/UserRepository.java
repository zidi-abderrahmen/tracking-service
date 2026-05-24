package com.ia.servicesmanagementdb.repository;

import com.ia.servicesmanagementdb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(User.Role role);

    @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findByName(@Param("name") String name);

    @Query("SELECT u FROM User u WHERE u.role = 'ENGINEER'")
    List<User> findByEngineer();

    boolean existsByEmail(String email);
}
