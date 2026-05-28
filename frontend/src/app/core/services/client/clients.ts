import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ClientRequest } from '../../models/client-request';

@Injectable({
  providedIn: 'root',
})
export class Clients {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllClients() {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }

  getClientsByName(name: string) {
    return this.http.get<any[]>(`${this.apiUrl}/clients/name/${name}`);
  }

  deleteClient(idClient: string) {
    return this.http.delete(`${this.apiUrl}/clients/${idClient}`);
  }

  updateClient(idClient: string, clientData: ClientRequest) {
    return this.http.put(`${this.apiUrl}/clients/${idClient}`, clientData);
  }

  createClient(clientData: ClientRequest) {
    return this.http.post<any>(`${this.apiUrl}/clients`, clientData);
  }

  getClientById(idClient: string) {
    return this.http.get<ClientRequest>(`${this.apiUrl}/clients/id/${idClient}`);
  }
}
