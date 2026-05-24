package com.ia.servicesmanagementdb.service.implementation;

import com.ia.servicesmanagementdb.dto.ServicesEngineerRequest;
import com.ia.servicesmanagementdb.model.ServicesEngineer;
import com.ia.servicesmanagementdb.model.User;
import com.ia.servicesmanagementdb.repository.ServiceRepository;
import com.ia.servicesmanagementdb.repository.ServicesEngineerRepository;
import com.ia.servicesmanagementdb.repository.UserRepository;
import com.ia.servicesmanagementdb.service.ServicesEngineerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ServicesEngineerServiceImpl  implements ServicesEngineerService {

    private final ServicesEngineerRepository servicesEngineerRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    @Override
    public List<ServicesEngineer> getAllServicesEngineers() {
        return servicesEngineerRepository.findAll();
    }

    @Override
    public ServicesEngineer createServicesEngineer(ServicesEngineerRequest request) {
        User engineer = userRepository.findById(request.getEngineer())
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.ia.servicesmanagementdb.model.Service service = serviceRepository.findById(request.getService())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        if (servicesEngineerRepository.existsByEngineerAndService(engineer, service)) {
            throw new RuntimeException("this engineer is already assigned to this service!");
        }

        ServicesEngineer servicesEngineer = new ServicesEngineer();

        servicesEngineer.setEngineer(engineer);
        servicesEngineer.setService(service);

        return servicesEngineerRepository.save(servicesEngineer);
    }

    @Override
    public ServicesEngineer updateServicesEngineer(UUID idServicesEngineer, ServicesEngineerRequest request) {
        ServicesEngineer servicesEngineer = servicesEngineerRepository.findById(idServicesEngineer)
                .orElseThrow(() -> new RuntimeException("ServicesEngineer not found"));

        User engineer = userRepository.findById(request.getEngineer())
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.ia.servicesmanagementdb.model.Service service = serviceRepository.findById(request.getService())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        servicesEngineer.setEngineer(engineer);
        servicesEngineer.setService(service);

        return servicesEngineerRepository.save(servicesEngineer);
    }

    @Override
    public void deleteServicesEngineer(UUID idServicesEngineer) {
        servicesEngineerRepository.deleteById(idServicesEngineer);
    }

    @Override
    public List<ServicesEngineer> getServicesEngineerByEngineerName(String name) {
        return servicesEngineerRepository.findByEngineerName(name);
    }

    @Override
    public List<ServicesEngineer> getServiceEngineerByEngineerId(UUID idEngineer) {
        return servicesEngineerRepository.findByEngineerId(idEngineer);
    }

    @Override
    public List<ServicesEngineer> getServiceEngineersByClientName(String name) {
        return servicesEngineerRepository.findByClientName(name);
    }

    @Override
    public List<com.ia.servicesmanagementdb.model.Service> getServicesEngineersByClientIdAndEngineerId(UUID idClient,  UUID idEngineer) {
        return servicesEngineerRepository.findServicesByClientAndEngineer(idClient, idEngineer);
    }
}