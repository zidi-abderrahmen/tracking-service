package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.UserRequest;
import com.ia.servicesmanagementdb.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();

    User createUser(UserRequest request);

    User updateUser(UUID idUser, UserRequest request);

    void deleteUser(UUID idUser);

    List<User> getUsersByRole(User.Role role);

    List<User> getUsersByName(String name);

    User getUserById(UUID idUser);

    List<User> getByEngineer();
}
