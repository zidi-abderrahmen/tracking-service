package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.UserRequest;
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

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("POST /api/users - Register new user")
    void createUser_ShouldReturn201_WhenEmailIsNew() {
        UserRequest request = new UserRequest();
        request.setFirstName("Ali");
        request.setLastName("Ben Salah");
        request.setEmail("ali@test.com");
        request.setPassword("password123");
        request.setRole(User.Role.ENGINEER);

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/users")
                .then()
                .statusCode(201)
                .body("email", equalTo("ali@test.com"))
                .body("firstName", equalTo("Ali"));
    }

    @Test
    @DisplayName("POST /api/users - Email already exists")
    void createUser_ShouldReturn409_WhenEmailExists() {
        User existing = new User();
        existing.setEmail("ali@test.com");
        existing.setPassword("encoded");
        existing.setFirstName("Ali");
        existing.setLastName("Ben");
        existing.setRole(User.Role.ENGINEER);
        userRepository.save(existing);

        UserRequest request = new UserRequest();
        request.setFirstName("Ali");
        request.setLastName("Ben Salah");
        request.setEmail("ali@test.com");
        request.setPassword("password123");
        request.setRole(User.Role.ENGINEER);

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/users")
                .then()
                .statusCode(409);
    }
}