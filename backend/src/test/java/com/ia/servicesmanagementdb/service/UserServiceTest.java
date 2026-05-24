package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.UserRequest;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UserRequest userRequest;
    private User existingUser;

    @BeforeEach
    void setUp() {
        userRequest = new UserRequest();
        userRequest.setFirstName("Abdo");
        userRequest.setLastName("Zidi");
        userRequest.setEmail("abdo@example.com");
        userRequest.setPassword("password123");
        userRequest.setRole(User.Role.ENGINEER);

        existingUser = new User();
        existingUser.setIdUser(UUID.randomUUID());
        existingUser.setEmail("abdo@example.com");
        existingUser.setFirstName("Abdo");
        existingUser.setLastName("Zidi");
        existingUser.setPassword("oldEncodedPass");
        existingUser.setRole(User.Role.ENGINEER);
    }

    @Test
    @DisplayName("Register successful - new user created")
    void createUser_ShouldReturnNewUser_WhenEmailDoesNotExist() {
        // Given
        when(userRepository.findByEmail("abdo@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");

        User savedUser = new User();
        savedUser.setIdUser(UUID.randomUUID());
        savedUser.setEmail("abdo@example.com");
        savedUser.setPassword("encodedPassword123");
        savedUser.setRole(User.Role.ENGINEER);

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // When
        User result = userService.createUser(userRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getEmail()).isEqualTo("abdo@example.com");
        assertThat(result.getPassword()).isEqualTo("encodedPassword123");

        verify(userRepository, times(2)).findByEmail("abdo@example.com");
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Register failed - email already exists")
    void createUser_ShouldThrowException_WhenEmailAlreadyExists() {
        // Given
        when(userRepository.findByEmail("abdo@example.com")).thenReturn(Optional.of(existingUser));

        // When & Then
        assertThatThrownBy(() -> userService.createUser(userRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("this user is already exist!");

        verify(userRepository).findByEmail("abdo@example.com");
        verify(userRepository, never()).save(any());
    }
}