package com.ia.servicesmanagementdb.config;

import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setFirstName("Super");
                admin.setLastName("Admin");
                admin.setEmail("admin@system.com"); // You can change this to your desired email, and encode on the application.properties

                admin.setPassword(passwordEncoder.encode("admin123"));

                admin.setRole(User.Role.ADMIN);

                userRepository.save(admin);
                System.out.println(">> Super Admin created: admin@system.com / admin123");
            } else {
                System.out.println(">> Users already exist, skipping Super Admin creation.");
            }
        };
    }
}