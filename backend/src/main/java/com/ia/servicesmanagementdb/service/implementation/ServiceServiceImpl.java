package com.ia.servicesmanagementdb.service.implementation;

import com.ia.servicesmanagementdb.dto.ServiceRequest;
import com.ia.servicesmanagementdb.model.Client;
import com.ia.servicesmanagementdb.repository.ClientRepository;
import com.ia.servicesmanagementdb.repository.ServiceRepository;
import com.ia.servicesmanagementdb.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final ClientRepository clientRepository;

    @Override
    public List<com.ia.servicesmanagementdb.model.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public com.ia.servicesmanagementdb.model.Service createService(ServiceRequest request) {
        Client client = clientRepository.findById(request.getClient())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        if (serviceRepository.existsByTitle(request.getTitle())) {
            throw new RuntimeException("Service is already exists");
        }

        com.ia.servicesmanagementdb.model.Service service = new com.ia.servicesmanagementdb.model.Service();

        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
        service.setRequestType(request.getRequestType());
        service.setStartDate(request.getStartDate());
        service.setEndDate(request.getEndDate());
        service.setClient(client);

        return serviceRepository.save(service);
    }

    @Override
    public com.ia.servicesmanagementdb.model.Service updateService(UUID idService, ServiceRequest request) {
        com.ia.servicesmanagementdb.model.Service service = serviceRepository.findById(idService)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Client client = clientRepository.findById(request.getClient())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
        service.setRequestType(request.getRequestType());
        service.setStartDate(request.getStartDate());
        service.setEndDate(request.getEndDate());
        service.setClient(client);

        return serviceRepository.save(service);
    }

    @Override
    public void deleteService(UUID idService) {
        serviceRepository.deleteById(idService);
    }

    @Override
    public List<com.ia.servicesmanagementdb.model.Service> getServicesByTitle(String title) {
        return serviceRepository.findByTitle(title);
    }

    @Override
    public com.ia.servicesmanagementdb.model.Service getServiceById(UUID idService) {
        return serviceRepository.findById(idService)
                .orElseThrow(() -> new RuntimeException("Service not found"));
    }

    @Override
    public List<com.ia.servicesmanagementdb.model.Service> getServicesByClientId(UUID clientId) {
        return serviceRepository.findByClientId(clientId);
    }
}