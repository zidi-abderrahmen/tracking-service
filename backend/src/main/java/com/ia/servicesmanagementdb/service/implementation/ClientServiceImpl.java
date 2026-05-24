package com.ia.servicesmanagementdb.service.implementation;

import com.ia.servicesmanagementdb.dto.ClientRequest;
import com.ia.servicesmanagementdb.model.Client;
import com.ia.servicesmanagementdb.repository.ClientRepository;
import com.ia.servicesmanagementdb.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client createClient(ClientRequest request) {

        if (clientRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("this client is already exist!");
        }

        return clientRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    Client client = new Client();
                    return getClient(request, client);
                });
    }

    @NonNull
    private Client getClient(ClientRequest request, Client client) {
        client.setCompanyName(request.getCompanyName());
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setTradeRegister(request.getTradeRegister());
        client.setDailyRate(request.getDailyRate());
        client.setEmail(request.getEmail());
        client.setAddress(request.getAddress());
        client.setPhone(request.getPhone());

        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(UUID idClient, ClientRequest request) {
        Client client = clientRepository.findById(idClient)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        return getClient(request, client);
    }

    @Override
    public void deleteClient(UUID idClient) {
        clientRepository.deleteById(idClient);
    }

    @Override
    public List<Client> getClientsByCompanyName(String name){
        return clientRepository.findByCompanyName(name);
    }

    @Override
    public Client getClientById(UUID idClient) {
        return clientRepository.findById(idClient)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }
}
