import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceRequest } from '../../../../core/models/service-request';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../../core/services/service/service';
import { ClientRequest } from '../../../../core/models/client-request';
import { Clients } from '../../../../core/services/client/clients';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-add',
  imports: [FormsModule],
  templateUrl: './service-add.html',
  styleUrl: './service-add.scss',
})
export class ServiceAdd implements OnInit {
  service: any = this.getInitialService();
  clients: ClientRequest[] = [];
  isEditMode = false;
  isViewMode = false;
  clientName: string = '';

  private route = inject(ActivatedRoute);
  private serviceService = inject(Service);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private clientService = inject(Clients);

  ngOnInit() {
    const ServiceId = this.route.snapshot.paramMap.get('idService');
    const url = this.router.url;

    if (ServiceId) {
      if (url.includes('details')) {
        this.isViewMode = true;
        this.loadService(ServiceId);
      } else {
        this.isEditMode = true;
        this.loadService(ServiceId);
        this.loadClients();
      }
    } else {
      this.loadClients();
    }
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      }
    });
  }

  onClientChange(event: any) {
    const selectedName = event.target.value;
    const foundClient = this.clients.find(c => c.companyName === selectedName || c.firstName === selectedName || c.lastName === selectedName);
    if (foundClient) {
      this.service.client = foundClient.idClient!;
    }
  }

  loadService(serviceId: string) {
    this.serviceService.getServiceById(serviceId).subscribe({
      next: (data) => {
        this.service = data;
        console.log(data.client);
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/services']);
  }

  onSave() {
    const idService = this.route.snapshot.paramMap.get('idService');

    if (!this.service.startDate || !this.service.endDate) {
      Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: "Please select both Start and End dates.",
                  showConfirmButton: false,
                  timer: 2500
                });
        return;
    }

    const start = new Date(this.service.startDate);
    const end = new Date(this.service.endDate);

    if (end < start) {
      Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: "End Date cannot be earlier than the Start Date.",
                  showConfirmButton: false,
                  timer: 2500
                });
        return;
    }

    if (!this.service.title.trim() || !this.service.description.trim()) {
      Swal.fire({
                  position: "top",
                  icon: "warning",
                  title: "Please fill in the Title and Description.",
                  showConfirmButton: false,
                  timer: 2500
                });
        return;
    }

    const playload = {
      ...this.service,
      client: this.service.client?.idClient || this.service. client
    };

    if (this.isEditMode && idService) {
      this.serviceService.updateService(idService, playload).subscribe({
        next: () => this.router.navigate(['/admin/services']),
        error: () => {
Swal.fire({
            position: "top",
            icon: "error",
            title: "Update failed!",
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
    } else {
      this.serviceService.createService(this.service).subscribe({
        next: () => {
          Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Service Added!",
                    showConfirmButton: false,
                    timer: 2000
                  });
          this.resetForm();
        },
        error: (err) => {
          if (err.status === 500) {
            Swal.fire({
                        position: "top",
                        icon: "warning",
                        title: "This service is already exist!",
                        showConfirmButton: false,
                        timer: 2500
                      });
            this.resetForm();
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
  }

  private getInitialService(): ServiceRequest {
    return {
      title: '',
      client: '',
      requestType: 'CONTRACT',
      startDate: '',
      endDate: '',
      description: ''
    };
  }

  resetForm() {
    this.service = this.getInitialService();
    this.clients = [];
    this.clientName = '';
    this.loadClients();
    this.cdr.detectChanges();
  }
}
