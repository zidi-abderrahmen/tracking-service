package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.ServiceRequest;
import com.ia.servicesmanagementdb.model.Service;

import java.util.List;
import java.util.UUID;

public interface ServiceService {

    List<Service> getAllServices();

    Service createService(ServiceRequest request);

    Service updateService(UUID idService, ServiceRequest request);

    void deleteService(UUID idService);

    List<Service> getServicesByTitle(String title);

    Service getServiceById(UUID idService);

    List<Service> getServicesByClientId(UUID clientId);
}