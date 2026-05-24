package com.ia.servicesmanagementdb.dto;

import com.ia.servicesmanagementdb.model.Service;
import com.ia.servicesmanagementdb.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class ServicesEngineerRequest {

    private UUID engineer;
    private UUID service;

}
