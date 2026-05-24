package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.ServiceRequest;
import com.ia.servicesmanagementdb.model.Service;
import com.ia.servicesmanagementdb.service.implementation.ServiceServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceServiceImpl serviceService;

    @GetMapping
    public List<Service> getAllServices() {
        return serviceService.getAllServices();
    }

    @PostMapping
    public Service createService(@RequestBody ServiceRequest request) {
        return serviceService.createService(request);
    }

    @PutMapping("/{idService}")
    public Service updateService(@PathVariable UUID idService, @RequestBody ServiceRequest request) {
        return serviceService.updateService(idService, request);
    }

    @DeleteMapping("/{idService}")
    public void deleteService(@PathVariable UUID idService) {
        serviceService.deleteService(idService);
    }

    @GetMapping("/title/{title}")
    public List<Service> getServicesByTitle(@PathVariable String title) {
        return serviceService.getServicesByTitle(title);
    }

    @GetMapping("/id/{idService}")
    public Service getServiceById(@PathVariable UUID idService) {
        return serviceService.getServiceById(idService);
    }

    @GetMapping("/client/{idClient}")
    public List<Service> getServicesByClientId(@PathVariable UUID idClient) {
        return serviceService.getServicesByClientId(idClient);
    }
}
