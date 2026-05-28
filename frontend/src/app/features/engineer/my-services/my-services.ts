import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { AssignmentService } from '../../../core/services/assignment/assignment-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-services',
  imports: [FormsModule, RouterLink],
  templateUrl: './my-services.html',
  styleUrl: './my-services.scss',
})
export class MyServices implements OnInit {
  private idEngineer: string | null = null;
  assignments: any[] = [];
  searchTerm: string = '';

  private authService = inject(Auth);
  private assignmentService = inject(AssignmentService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.idEngineer = this.authService.getId();
    if (this.idEngineer) {
      this.loadAssignments(this.idEngineer);
    }
  }

  loadAssignments(idEngineer: string) {
    this.assignmentService.getAssignmentsByEngineerId(idEngineer).subscribe({
      next: (data) => {
        this.assignments = data;
        console.log("Data", data);
        this.cdr.detectChanges();
      },
      error: (err) => console.log("Error:", err)
    });
  }

  checkEmptySearchField(term: string) {
    if (!term) {
      this.idEngineer = this.authService.getId();
      if (this.idEngineer) {
        this.loadAssignments(this.idEngineer);
      }
      return;
    }
  }

  onSearch() {
    const term = this.searchTerm.trim();

    this.checkEmptySearchField(term);

    this.assignmentService.getAssignmentsByClientName(term).subscribe({
      next: (data) => {
        this.assignments = data.filter(a => a.engineer.idUser == this.idEngineer);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        if (err.status === 0) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Databse is not connected",
            showConfirmButton: false,
            timer: 2500
          });
        } else if (err.status === 401) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Search Failed!",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }
    });
  }
}
