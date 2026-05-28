import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TimesheetRequest } from '../../models/timesheets-request';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllTimesheets() {
    return this.http.get<any[]>(`${this.apiUrl}/timesheets`);
  }

  getReportData(idClient: string, idService: string | null, startDate: string, endDate: string) {
    let params = new HttpParams()
        .set('idClient', idClient)
        .set('startDate', startDate)
        .set('endDate', endDate);
    if (idService) {
        params = params.set('idService', idService);
    }

    return this.http.get<any[]>(`${this.apiUrl}/timesheets/reports`, { params });
  }

  getTimesheetsByEngineerId(idEngineer: string) {
    return this.http.get<any[]>(`${this.apiUrl}/timesheets/engineer/${idEngineer}`);
  }

  createTimesheet(timesheetData: TimesheetRequest) {
    return this.http.post<TimesheetRequest>(`${this.apiUrl}/timesheets`, timesheetData);
  }
}
