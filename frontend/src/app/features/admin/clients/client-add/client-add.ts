import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientRequest } from '../../../../core/models/client-request';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from '../../../../core/services/client/clients';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-add',
  imports: [FormsModule],
  templateUrl: './client-add.html',
  styleUrl: './client-add.scss',
})
export class ClientAdd implements OnInit{
  client: ClientRequest = this.getInitialClient();
  isEditMode = false;
  isViewMode = false;

  private route = inject(ActivatedRoute);
  private clientService = inject(Clients);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('idClient');
    const url = this.router.url;

    if (clientId) {
      if (url.includes('details')) {
        this.isViewMode = true;
      } else {
        this.isEditMode = true;
      }
      this.loadClient(clientId);
    }
  }

  loadClient(clientId: string) {
    this.clientService.getClientById(clientId).subscribe({
      next: (data) => {
        this.client = data;
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/clients']);
  }

  onSave() {
    const clientData = this.client as any;
    const idClient = this.route.snapshot.paramMap.get('idClient');

    if (this.isEditMode && idClient) {
      this.clientService.updateClient(idClient, clientData).subscribe({
        next: () => this.router.navigate(['/admin/clients']),
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
      if (!this.client.firstName.trim() || 
          !this.client.lastName.trim() || 
          !this.client.email.trim() || 
          !this.client.companyName.trim() || 
          !this.client.tradeRegister.trim() ||
          !this.client.dailyRate ||
          !this.client.phone.trim() ||
          !this.client.address.trim()) {
            Swal.fire({
              position: "top",
              icon: "warning",
              title: "Please fill in all required fields!",
              showConfirmButton: false,
              timer: 2500
            });
        return;
      }

      this.clientService.createClient(this.client).subscribe({
        next: (res) => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Client Added!",
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
              title: "This email already used by another Client!",
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

  private getInitialClient(): ClientRequest {
    return {
      companyName: '',
      tradeRegister: '',
      dailyRate: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
  }

  resetForm() {
    this.client = {
      companyName: '',
      tradeRegister: '',
      dailyRate: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };
    this.cdr.detectChanges();
  }
}
