package com.ia.servicesmanagementdb.service;

import com.ia.servicesmanagementdb.dto.ClientRequest;
import com.ia.servicesmanagementdb.model.Client;

import java.util.List;
import java.util.UUID;

public interface ClientService {

    List<Client> getAllClients();

    Client createClient(ClientRequest request);

    Client updateClient(UUID idClient, ClientRequest request);

    void deleteClient(UUID idClient);

    List<Client> getClientsByCompanyName(String name);

    Client getClientById(UUID idClient);
}
