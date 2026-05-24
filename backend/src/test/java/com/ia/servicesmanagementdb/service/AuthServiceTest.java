package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.LoginRequest;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private User user;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setIdUser(UUID.randomUUID());
        user.setEmail("abdo@example.com");
        user.setPassword("encodedPassword123");
        user.setFirstName("Abdo");
        user.setLastName("Zidi");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("abdo@example.com");
        loginRequest.setPassword("rawPassword123");
    }

    @Test
    @DisplayName("Login successful - email and password are correct")
    void login_ShouldReturnUser_WhenCredentialsAreValid() {
        // Given
        when(userRepository.findByEmail("abdo@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("rawPassword123", "encodedPassword123")).thenReturn(true);

        // When
        User result = authService.login(loginRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getEmail()).isEqualTo("abdo@example.com");
        assertThat(result.getFirstName()).isEqualTo("Abdo");

        // For make sure that the method was called
        verify(userRepository).findByEmail("abdo@example.com");
        verify(passwordEncoder).matches("rawPassword123", "encodedPassword123");
    }

    @Test
    @DisplayName("Login failed - email not found")
    void login_ShouldThrowException_WhenEmailNotFound() {
        // Given
        when(userRepository.findByEmail("abdo@example.com")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Invalid email or password");

        verify(userRepository).findByEmail("abdo@example.com");
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @DisplayName("Login failed - wrong password")
    void login_ShouldThrowException_WhenPasswordDoesNotMatch() {
        // Given
        when(userRepository.findByEmail("abdo@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("rawPassword123", "encodedPassword123")).thenReturn(false);

        // When & Then
        assertThatThrownBy(() -> authService.login(loginRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Invalid email or password");

        verify(userRepository).findByEmail("abdo@example.com");
        verify(passwordEncoder).matches("rawPassword123", "encodedPassword123");
    }
}