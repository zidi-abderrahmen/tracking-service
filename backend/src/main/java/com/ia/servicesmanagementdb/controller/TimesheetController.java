package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.TimesheetRequest;
import com.ia.servicesmanagementdb.model.Timesheet;
import com.ia.servicesmanagementdb.service.implementation.TimesheetServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/timesheets")
public class TimesheetController {

    private final TimesheetServiceImpl timesheetService;

    @GetMapping
    public List<Timesheet> getAllTimesheets() {
        return timesheetService.getAllTimesheets();
    }

    @PostMapping
    public Timesheet createTimesheet(@RequestBody TimesheetRequest request) {
        return timesheetService.createTimesheet(request);
    }

    @PutMapping("/{idTimesheet}")
    public Timesheet updateTimesheet(@PathVariable UUID idTimesheet, @RequestBody TimesheetRequest request) {
        return timesheetService.updateTimesheet(idTimesheet, request);
    }

    @DeleteMapping("/{idTimesheet}")
    public void deleteTimesheet(@PathVariable UUID idTimesheet) {
        timesheetService.deleteTimesheet(idTimesheet);
    }

    @GetMapping("/date/{date}")
    public List<Timesheet> getTimesheetByDate(@PathVariable LocalDate date) {
        return timesheetService.getTimesheetsByDate(date);
    }

    @GetMapping("/id/{idTimesheet}")
    public Timesheet getTimesheetById(@PathVariable UUID idTimesheet) {
        return timesheetService.getTimesheetById(idTimesheet);
    }

    @GetMapping("/reports")
    public List<Timesheet> getReport(
            @RequestParam UUID idClient,
            @RequestParam(required = false) UUID idService,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return timesheetService.findReportData(idClient, idService, startDate, endDate);
    }

    @GetMapping("/engineer/{idEngineer}")
    public List<Timesheet> getTimesheetByEngineerId(@PathVariable UUID idEngineer) {
        return timesheetService.getTimesheetsByEngineerId(idEngineer);
    }
}