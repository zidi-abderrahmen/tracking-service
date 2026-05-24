package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.ServicesEngineerRequest;
import com.ia.servicesmanagementdb.model.Service;
import com.ia.servicesmanagementdb.model.ServicesEngineer;
import com.ia.servicesmanagementdb.service.implementation.ServicesEngineerServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/services-engineer")
public class ServicesEngineerController {

    private ServicesEngineerServiceImpl servicesEngineerService;

    @GetMapping
    public List<ServicesEngineer> getAllServicesEngineers() {
        return servicesEngineerService.getAllServicesEngineers();
    }

    @PostMapping
    public ServicesEngineer createServicesEngineer(@RequestBody ServicesEngineerRequest request) {
        return servicesEngineerService.createServicesEngineer(request);
    }

    @PutMapping("/{idServicesEngineer}")
    public ServicesEngineer updateServicesEngineer(@PathVariable UUID idServicesEngineer, @RequestBody ServicesEngineerRequest request) {
        return servicesEngineerService.updateServicesEngineer(idServicesEngineer, request);
    }

    @DeleteMapping("/{idServicesEngineer}")
    public void deleteServicesEngineer(@PathVariable UUID idServicesEngineer) {
        servicesEngineerService.deleteServicesEngineer(idServicesEngineer);
    }

    @GetMapping("/name/{name}")
    public List<ServicesEngineer> getServicesEngineerByName(@PathVariable String name) {
        return servicesEngineerService.getServicesEngineerByEngineerName(name);
    }

    @GetMapping("/engineer/{idEngineer}")
    public List<ServicesEngineer> getServicesEngineerByEngineerId(@PathVariable UUID idEngineer) {
        return servicesEngineerService.getServiceEngineerByEngineerId(idEngineer);
    }

    @GetMapping("client/{name}")
    public List<ServicesEngineer> getServicesEngineerByClientName(@PathVariable String name) {
        return servicesEngineerService.getServiceEngineersByClientName(name);
    }

    @GetMapping("assignment-services")
    public List<Service> getServicesEngineerByClientIdAndEngineerId(
            @RequestParam("idClient") UUID clientId,
            @RequestParam("idEngineer") UUID engineerId
    ) {
        return servicesEngineerService.getServicesEngineersByClientIdAndEngineerId(clientId, engineerId);
    }
}
