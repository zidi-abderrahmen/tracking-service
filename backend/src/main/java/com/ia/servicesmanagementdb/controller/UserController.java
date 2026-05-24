package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.UserRequest;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.service.implementation.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@Valid @RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @PutMapping("/{idUser}")
    public User updateUser(@PathVariable UUID idUser, @Valid @RequestBody UserRequest request) {
        return userService.updateUser(idUser, request);
    }

    @DeleteMapping("/{idUser}")
    public void deleteUser(@PathVariable UUID idUser) {
        userService.deleteUser(idUser);
    }

    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable User.Role role) {
        return userService.getUsersByRole(role);
    }

    @GetMapping("/name/{name}")
    public List<User> getUsersByName(@PathVariable String name) {
        return userService.getUsersByName(name);
    }

    @GetMapping("/{idUser}")
    public User getUserById(@PathVariable UUID idUser) {
        return userService.getUserById(idUser);
    }

    @GetMapping("/role/engineer")
    public List<User> getUsersByEngineer() {
        return userService.getByEngineer();
    }
}
