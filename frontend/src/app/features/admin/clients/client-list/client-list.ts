import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Clients } from '../../../../core/services/client/clients';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList implements OnInit {

  clients: any[] = [];
  searchTerm: string = '';
  private clientService = inject(Clients);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadClients();
  }

  checkEmptySearchField(term: string) {
    if (!term) {
      this.loadClients();
      return;
    }
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data,
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error gettting clients!",
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }

  onSearch() {
    const term = this.searchTerm.trim();

    this.checkEmptySearchField(term);

    this.clientService.getClientsByName(term).subscribe({
      next: (data) => {
        this.clients = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Search Failed!",
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }

  onDelete(idClient: string, firstName: string, lastName: string) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${firstName} ${lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#007BFF",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(idClient).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (err) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Could not delete client!",
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
      }
    });
  }
}
