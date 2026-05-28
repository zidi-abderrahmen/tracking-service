import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientRequest } from '../../../core/models/client-request';
import { Service } from '../../../core/services/service/service';
import { ServiceRequest } from '../../../core/models/service-request';
import { TimesheetService } from '../../../core/services/timesheet/timesheet-service';
import { TimesheetRequest } from '../../../core/models/timesheets-request';
import { Clients } from '../../../core/services/client/clients';
import { Auth } from '../../../core/services/auth/auth';
import { AssignmentService } from '../../../core/services/assignment/assignment-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheet-add',
  imports: [FormsModule],
  templateUrl: './timesheet-add.html',
  styleUrl: './timesheet-add.scss',
})
export class TimesheetAdd implements OnInit {
  timesheet: TimesheetRequest = this.getInitialTimesheet();
  private auth = inject(Auth);
  engineerId: string | null = this.auth.getId();
  clientName: string = '';
  clients: ClientRequest[] = [];
  services: ServiceRequest[] = [];
  assignments: any[] = [];
  serviceTitle: string = '';
  client: ClientRequest = this.getInitialClient();

  private cdr = inject(ChangeDetectorRef);
  private timesheetService = inject(TimesheetService);
  private clientService = inject(Clients);
  private assignmentService = inject(AssignmentService);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log(data);
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  loadServices(id: string) {
    this.assignmentService.getServicesFromIdClientAndIdEngineer(id, this.engineerId!).subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  onServiceChange(event: any) {
    const selectedTitle = event.target.value;
    const foundService = this.services.find(s => s.title === selectedTitle);
    if (foundService) {
      this.timesheet.service = foundService.idService!;
      this.serviceTitle = foundService.title;
    } else {
      this.serviceTitle = '';
      this.timesheet.service = '';
    }
  }

  onClientChange(event: any) {
    const selectedName = event.target.value;
    const foundClient = this.clients.find(c => c.companyName === selectedName || c.firstName === selectedName || c.lastName === selectedName);
    if (foundClient) {
      this.client = foundClient;
      this.timesheet.service = foundClient.idClient!;
      this.clientName = foundClient.companyName;
      this.loadServices(this.timesheet.service);
    } else {
      this.client = this.getInitialClient();
      this.timesheet.service = '';
      this.clientName = '';
      this.serviceTitle = '';
    }
  }

  onHoursChange(event: any) {
    this.timesheet.hours = event.target.value;
  }

  onSubmit() {
    if (!this.client.idClient!.trim()) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Choose a client!",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    if (!this.timesheet.service.trim()) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Choose a service!",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    if(!this.timesheet.hours) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Add hours!",
        showConfirmButton: false,
        timer: 2500
      });
      return
    }

    this.timesheet.engineer = this.engineerId!;
    this.timesheet.date = new Date().toISOString().split('T')[0];

    this.timesheetService.createTimesheet(this.timesheet).subscribe({
      next: () => {
        Swal.fire({
        position: "top",
        icon: "success",
        title: "Timesheet Added!",
        showConfirmButton: false,
        timer: 2000
      });
        this.timesheet = this.getInitialTimesheet();
        this.clientName = '';
        this.serviceTitle = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 0) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Databse is not connected",
            showConfirmButton: false,
            timer: 2500
          });
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Error happened!",
            showConfirmButton: false,
            timer: 2500
          });
        }
    }
    });
  }

  private getInitialTimesheet(): TimesheetRequest {
    return {
      engineer: '',
      service: '',
      hours: 0,
      date: ''
    }
  }

  private getInitialClient(): ClientRequest {
    return {
      idClient: '',
      companyName: '',
      tradeRegister: '',
      dailyRate: 0,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: ''
    }
  }
}
