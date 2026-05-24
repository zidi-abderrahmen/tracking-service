package com.ia.servicesmanagementdb.dto;

import com.ia.servicesmanagementdb.model.User;
import lombok.Data;

@Data
public class UserRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private User.Role role;
}
