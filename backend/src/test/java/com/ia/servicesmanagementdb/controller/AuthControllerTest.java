package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.LoginRequest;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
        userRepository.deleteAll();

        User user = new User();
        user.setEmail("abdo@test.com");
        user.setPassword(passwordEncoder.encode("123456"));
        user.setFirstName("Abdo");
        user.setLastName("Zidi");
        user.setRole(User.Role.ENGINEER);
        userRepository.save(user);
    }

    @Test
    @DisplayName("POST /api/auth/login - Success")
    void login_ShouldReturn200_WhenCredentialsAreValid() {
        LoginRequest request = new LoginRequest();
        request.setEmail("abdo@test.com");
        request.setPassword("123456");

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200)
                .body("email", equalTo("abdo@test.com"))
                .body("firstName", equalTo("Abdo"))
                .body("lastName", equalTo("Zidi"));
    }

    @Test
    @DisplayName("POST /api/auth/login - Wrong password")
    void login_ShouldReturn401_WhenPasswordIsWrong() {
        LoginRequest request = new LoginRequest();
        request.setEmail("abdo@test.com");
        request.setPassword("wrongpass");

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("POST /api/auth/login - User not found")
    void login_ShouldReturn401_WhenUserDoesNotExist() {
        LoginRequest request = new LoginRequest();
        request.setEmail("unknown@test.com");
        request.setPassword("123456");

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(401);
    }
}