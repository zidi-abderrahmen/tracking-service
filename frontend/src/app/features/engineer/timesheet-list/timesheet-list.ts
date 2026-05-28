import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from '../../../core/services/timesheet/timesheet-service';
import { Auth } from '../../../core/services/auth/auth';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheet-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './timesheet-list.html',
  styleUrl: './timesheet-list.scss',
})
export class TimesheetList implements OnInit {
  private timesheetService = inject(TimesheetService);
  timesheets: any[] = [];

  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);

  engineerId: string | null = this.auth.getId();

  ngOnInit(): void {
    this.loadTimesheets(this.engineerId!)
  }

  checkEmptySearchField(term: string) {
    if (!term) {
      this.loadTimesheets(this.engineerId!);
      return;
    }
  }

  loadTimesheets(idEngineer: string) {
    this.timesheetService.getTimesheetsByEngineerId(idEngineer).subscribe({
      next: (data) => {
        this.timesheets = data;
        console.log(data);
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
            title: "Error gettting timesheets!",
            showConfirmButton: false,
            timer: 2500
          });
        }
        console.log(err);
      }
    });
  }
}
