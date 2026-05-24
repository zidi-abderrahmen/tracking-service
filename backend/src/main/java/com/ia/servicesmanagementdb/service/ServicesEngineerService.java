package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.ServicesEngineerRequest;
import com.ia.servicesmanagementdb.model.Service;
import com.ia.servicesmanagementdb.model.ServicesEngineer;

import java.util.List;
import java.util.UUID;

public interface ServicesEngineerService {

    List<ServicesEngineer> getAllServicesEngineers();

    ServicesEngineer createServicesEngineer(ServicesEngineerRequest request);

    ServicesEngineer updateServicesEngineer(UUID idServicesEngineer, ServicesEngineerRequest request);

    void deleteServicesEngineer(UUID idServicesEngineer);

    List<ServicesEngineer> getServicesEngineerByEngineerName(String name);

    List<ServicesEngineer> getServiceEngineerByEngineerId(UUID idEngineer);

    List<ServicesEngineer> getServiceEngineersByClientName(String name);

    List<Service> getServicesEngineersByClientIdAndEngineerId(UUID idClient, UUID idEngineer);
}
