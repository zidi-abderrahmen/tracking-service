package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.TimesheetRequest;
import com.ia.servicesmanagementdb.model.Timesheet;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TimesheetService {

    List<Timesheet> getAllTimesheets();

    Timesheet createTimesheet(TimesheetRequest request);

    Timesheet updateTimesheet(UUID idTimesheet, TimesheetRequest request);

    void deleteTimesheet(UUID idTimesheet);

    List<Timesheet> getTimesheetsByDate(LocalDate date);

    Timesheet getTimesheetById(UUID idTimesheet);

    List<Timesheet> findReportData( UUID idClient, UUID idService, LocalDate startDate, LocalDate endDate);

    List<Timesheet> getTimesheetsByEngineerId(UUID idEngineer);
}
