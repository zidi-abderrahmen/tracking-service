package com.ia.servicesmanagementdb.dto;

import com.ia.servicesmanagementdb.model.Client;
import com.ia.servicesmanagementdb.model.Service;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class ServiceRequest {

    private String title;
    private String description;
    private Service.RequestType requestType;
    private LocalDate startDate;
    private LocalDate endDate;
    private UUID client;

}
