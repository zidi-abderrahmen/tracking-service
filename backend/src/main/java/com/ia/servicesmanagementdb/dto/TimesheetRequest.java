package com.ia.servicesmanagementdb.dto;

import com.ia.servicesmanagementdb.model.Service;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class TimesheetRequest {

    private UUID engineer;
    private UUID service;
    private LocalDate date;
    private Float hours;
}
