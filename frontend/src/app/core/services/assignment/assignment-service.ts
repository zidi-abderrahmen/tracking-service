import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssignmentRequest } from '../../models/assignment-request';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../../models/service-request';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllAssignments() {
    return this.http.get<any[]>(`${this.apiUrl}/services-engineer`);
  }

  getAssignmentsByEngineerName(name: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services-engineer/name/${name}`);
  }

  deleteAssignment(idAssignment: string) {
    return this.http.delete<any>(`${this.apiUrl}/services-engineer/${idAssignment}`);
  }

  createAssignment(assignmentData: AssignmentRequest) {
    return this.http.post<AssignmentRequest>(`${this.apiUrl}/services-engineer`, assignmentData);
  }

  getAssignmentsByEngineerId(idEngineer: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services-engineer/engineer/${idEngineer}`);
  }

  getAssignmentsByClientName(name: string) {
    return this.http.get<any[]>(`${this.apiUrl}/services-engineer/client/${name}`);
  }

  getServicesFromIdClientAndIdEngineer(idClient: string, idEngineer: string): Observable<ServiceRequest[]> {
    const params = new HttpParams()
      .set('idClient', idClient)
      .set('idEngineer', idEngineer);

    return this.http.get<ServiceRequest[]>(`${this.apiUrl}/services-engineer/assignment-services`, { params });
  }
}
