package com.ia.servicesmanagementdb.service.implementation;

import com.ia.servicesmanagementdb.dto.TimesheetRequest;
import com.ia.servicesmanagementdb.model.Timesheet;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.ServiceRepository;
import com.ia.servicesmanagementdb.repository.TimesheetRepository;
import com.ia.servicesmanagementdb.repository.UserRepository;
import com.ia.servicesmanagementdb.service.TimesheetService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class TimesheetServiceImpl implements TimesheetService {

    private final TimesheetRepository timesheetRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    @Override
    public List<Timesheet> getAllTimesheets() {
        return timesheetRepository.findAll();
    }

    @Override
    public Timesheet createTimesheet(TimesheetRequest request) {
        User engineer = userRepository.findById(request.getEngineer())
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.ia.servicesmanagementdb.model.Service service = serviceRepository.findById(request.getService())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Timesheet timesheet = new Timesheet();

        timesheet.setEngineer(engineer);
        timesheet.setService(service);
        timesheet.setDate(request.getDate());
        timesheet.setHours(request.getHours());

        return timesheetRepository.save(timesheet);
    }

    @Override
    public Timesheet updateTimesheet(UUID idTimesheet, TimesheetRequest request) {
        Timesheet timesheet = timesheetRepository.findById(idTimesheet)
                .orElseThrow(() -> new RuntimeException("Timesheet not found"));

        User engineer = userRepository.findById(request.getEngineer())
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.ia.servicesmanagementdb.model.Service service = serviceRepository.findById(request.getService())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        timesheet.setEngineer(engineer);
        timesheet.setService(service);
        timesheet.setDate(request.getDate());
        timesheet.setHours(request.getHours());

        return timesheetRepository.save(timesheet);
    }

    @Override
    public void deleteTimesheet(UUID idTimesheet) {
        timesheetRepository.deleteById(idTimesheet);
    }

    @Override
    public List<Timesheet> getTimesheetsByDate(LocalDate date) {
        return timesheetRepository.findByDate(date);
    }

    @Override
    public Timesheet getTimesheetById(UUID idTimesheet) {
        return timesheetRepository.findById(idTimesheet)
                .orElseThrow(() -> new RuntimeException("Timesheet not found"));
    }

    @Override
    public List<Timesheet> findReportData( UUID idClient, UUID idService, LocalDate startDate, LocalDate endDate) {
        return timesheetRepository.findReportData(idClient, idService, startDate, endDate);
    }

    @Override
    public List<Timesheet> getTimesheetsByEngineerId(UUID idEngineer) {
        return timesheetRepository.findByEngineerId(idEngineer);
    }
}