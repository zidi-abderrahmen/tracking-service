import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Service } from '../../../../core/services/service/service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss',
})
export class ServiceList implements OnInit {

  services: any[] = [];
  searchTerm: string = '';
  private serviceService = inject(Service);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadServices();
  }


  checkEmptySearchField(term: string) {
    if (!term) {
      this.loadServices();
      return;
    }
  }

  loadServices() {
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data,
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
                  position: "top",
                  icon: "error",
                  title: "Error gettting services!",
                  showConfirmButton: false,
                  timer: 2500
                });
              }
    });
  }

  onSearch() {
    const term = this.searchTerm.trim();

    this.checkEmptySearchField(term);

    this.serviceService.getServicesByTitle(term).subscribe({
      next: (data) => {
        this.services = data;
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

  onDelete(idService: string, title: string) {
    Swal.fire({
          title: "Are you sure?",
          text: `You want to delete ${title}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "#007BFF",
          confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      this.serviceService.deleteService(idService).subscribe({
        next: () => {
          this.loadServices();
        },
        error: (err) => {
          Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Could not delete service!",
                    showConfirmButton: false,
                    timer: 2500
                  });
        }
      });
    });
  }
}
