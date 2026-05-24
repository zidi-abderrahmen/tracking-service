package com.ia.servicesmanagementdb.controller;

import com.ia.servicesmanagementdb.dto.ClientRequest;
import com.ia.servicesmanagementdb.model.Client;
import com.ia.servicesmanagementdb.service.implementation.ClientServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientServiceImpl clientService;

    @GetMapping
    public List<Client> getAllClients() {
       return clientService.getAllClients();
    }

    @PostMapping
    public Client createClient(@Valid @RequestBody ClientRequest resuest) {
        return clientService.createClient(resuest);
    }

    @PutMapping("/{idClient}")
    public Client updateClient(@PathVariable UUID idClient, @Valid @RequestBody ClientRequest resuest) {
        return clientService.updateClient(idClient, resuest);
    }

    @DeleteMapping("/{idClient}")
    public void deleteClient(@PathVariable UUID idClient) {
        clientService.deleteClient(idClient);
    }

    @GetMapping("/name/{name}")
    public List<Client> getClientByCompanyName(@PathVariable String name) {
        return clientService.getClientsByCompanyName(name);
    }

    @GetMapping("/id/{idClient}")
    public Client getClientById(@PathVariable UUID idClient) {
        return clientService.getClientById(idClient);
    }

}
