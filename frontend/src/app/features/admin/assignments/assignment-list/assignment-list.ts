import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AssignmentService } from '../../../../core/services/assignment/assignment-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.scss',
})
export class AssignmentList implements OnInit {
  assignments: any[] = [];
  searchTerm: string = '';

  private assignmentService = inject(AssignmentService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadAssignments();
  }

  checkEmptySearchField(term: string) {
    if (!term) {
      this.loadAssignments();
      return;
    }
  }

  loadAssignments() {
    this.assignmentService.getAllAssignments().subscribe({
      next: (data) => {
        this.assignments = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error gettting assignment!",
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }

  onSearch() {
    const term = this.searchTerm.trim();

    this.checkEmptySearchField(term);

    this.assignmentService.getAssignmentsByEngineerName(term).subscribe({
      next: (data) => {
        this.assignments = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
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

  onDelete(idAssignment: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#007BFF",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentService.deleteAssignment(idAssignment).subscribe({
        next: () => {
          this.loadAssignments();
        },
        error: (err) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Could not delete assignment!",
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
      }
    });
  }
}
