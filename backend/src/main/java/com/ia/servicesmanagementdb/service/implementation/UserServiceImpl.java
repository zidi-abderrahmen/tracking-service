package com.ia.servicesmanagementdb.service.implementation;

import com.ia.servicesmanagementdb.dto.UserRequest;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.UserRepository;
import com.ia.servicesmanagementdb.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User createUser(UserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("this user is already exist!");
        }

        return userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setFirstName(request.getFirstName());
                    newUser.setLastName(request.getLastName());
                    newUser.setEmail(request.getEmail());
                    newUser.setPassword(passwordEncoder.encode(request.getPassword()));
                    newUser.setRole(request.getRole());
                    return userRepository.save(newUser);
                });
    }

    @Override
    public User updateUser(UUID idUser, UserRequest request) {
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(UUID idUser) {
        userRepository.deleteById(idUser);
    }

    @Override
    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }

    @Override
    public List<User> getUsersByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public User getUserById(UUID idUser) {
        return userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<User> getByEngineer() {
        return userRepository.findByEngineer();
    }
}