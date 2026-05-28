import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServiceRequest } from '../../models/service-request';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllServices() {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  getServicesByTitle(title: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services/title/${title}`);
  }

  deleteService(idService: string) {
    return this.http.delete(`${this.apiUrl}/services/${idService}`);
  }
  
  updateService(idService: string, serviceData: ServiceRequest) {
    return this.http.put(`${this.apiUrl}/services/${idService}`, serviceData);
  }

  createService(serviceData: ServiceRequest) {
    return this.http.post<any>(`${this.apiUrl}/services`, serviceData);
  }

  getServiceById(idService: string) {
    return this.http.get<ServiceRequest>(`${this.apiUrl}/services/id/${idService}`);
  }

  getServicesByClientId(idClient: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services/client/${idClient}`);
  }
}
