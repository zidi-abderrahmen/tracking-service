import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ClientRequest } from '../../../core/models/client-request';
import { Clients } from '../../../core/services/client/clients';
import { FormsModule } from '@angular/forms';
import { Service } from '../../../core/services/service/service';
import { TimesheetService } from '../../../core/services/timesheet/timesheet-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  clients: ClientRequest[] = [];
  services: any[] = [];
  clientId: string = '';
  clientName: string = '';
  serviceId: string = '';
  serviceTitle: string = '';
  startDate: string = '';
  endDate: string = '';
  timesheets: any[] = [];

  private clientService = inject(Clients);
  private serviceService = inject(Service);
  private timesheetService = inject(TimesheetService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadClients();
    this.loadReports();
  }

  loadReports() {
    this.timesheetService.getAllTimesheets().subscribe({
      next: (data: any[]) => {
        console.log(data);
        const grouped = data.reduce((acc, current) => {
          const serviceId = current.service.idService;

          if (!acc[serviceId]) {
            acc[serviceId] = {
              idTimesheet: serviceId,
              service: current.service,
              date: current.service.createDate,
              hours: 0
            };
          }

          acc[serviceId].hours += Number(current.hours);
          return acc;
        }, {});

        this.timesheets = Object.values(grouped);
        this.cdr.detectChanges();
      }
    });
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      }
    });
  }

  loadServices(id: string) {
    this.serviceService.getServicesByClientId(id).subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      }
    });
  }

  onClientChange(event: any) {
    const selectedName = event.target.value;
    const foundClient = this.clients.find(c => c.companyName === selectedName || c.firstName === selectedName || c.lastName === selectedName);
    if (foundClient) {
      this.clientId = foundClient.idClient!;
      this.clientName = foundClient.companyName;
      this.loadServices(this.clientId);
    } else {
      this.clientId = '';
      this.clientName = '';
      this.services = [];
      this.serviceId = '';
      this.serviceTitle = '';
    }
  }

  onServiceChange(event: any) {
    const selectedTitle = event.target.value;
    const foundService = this.services.find(s => s.title === selectedTitle);
    if (foundService) {
      this.serviceId = foundService.idService!;
      this.serviceTitle = foundService.title;
    } else {
      this.serviceId = '';
      this.serviceTitle = '';
    }
  }

  onStartDateChange(event: any) {
    this.startDate = event.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.value;
  }

  onSearch() {
    if (!this.clientId.trim()) {
      Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: "Please fill in the Client.",
                  showConfirmButton: false,
                  timer: 2500
                });
        return;
    }
    
    if (new Date(this.endDate) < new Date(this.startDate)) {
      Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: "End Date cannot be earlier than the Start Date.",
                  showConfirmButton: false,
                  timer: 2500
                });
        return;
    }

    const sId = this.serviceId && this.serviceId.trim() !== '' ? this.serviceId : null;

    this.timesheetService.getReportData(this.clientId, sId, this.startDate, this.endDate).subscribe({
      next: (data: any[]) => {
        const grouped = data.reduce((acc, current) => {
          const serviceId = current.service.idService;

          if (!acc[serviceId]) {
            acc[serviceId] = {
              idTimesheet: serviceId,
              service: current.service,
              date: current.service.createDate,
              hours: 0
            };
          }

          acc[serviceId].hours += Number(current.hours);
          return acc;
        }, {});

        this.timesheets = Object.values(grouped);
        this.cdr.detectChanges();
      },
      error: (err) => console.log("Error:", err)
    });
  }
}