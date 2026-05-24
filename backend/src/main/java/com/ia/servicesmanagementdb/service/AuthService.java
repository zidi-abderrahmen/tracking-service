package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.LoginRequest;
import com.ia.servicesmanagementdb.model.User;

public interface AuthService {

    User login(LoginRequest loginRequest);
}