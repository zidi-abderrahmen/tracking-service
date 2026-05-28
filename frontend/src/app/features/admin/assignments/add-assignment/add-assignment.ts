import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignmentRequest } from '../../../../core/models/assignment-request';
import { AssignmentService } from '../../../../core/services/assignment/assignment-service';
import { UserRequest } from '../../../../core/models/user-request';
import { User } from '../../../../core/services/user/user';
import { ServiceRequest } from '../../../../core/models/service-request';
import { Service } from '../../../../core/services/service/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-assignment',
  imports: [FormsModule],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.scss',
})
export class AddAssignment implements OnInit {
  assignment: any = this.getInitialAssignment();
  engineers: UserRequest[] = [];
  services: ServiceRequest[] = [];
  engineerId: string = '';

  engineerFirstName: string = '';
  serviceTitle: string = '';

  private assignmentService = inject(AssignmentService);
  private cdr = inject(ChangeDetectorRef);
  private userService = inject(User);
  private serviceService = inject(Service);

  ngOnInit() {
    this.loadEngineers();
    this.loadServices();
  }

  loadEngineers() {
    this.userService.getAllEngineers().subscribe({
      next: (data) => {
        this.engineers = data;
        this.cdr.detectChanges();
      }
    });
  }

  loadServices(){
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.cdr.detectChanges();
      }
    })
  }

  onEngineerChange(event: any) {
    const selectedName = event.target.value;
    const foundEngineer = this.engineers.find(a => a.lastName === selectedName);
    if (foundEngineer) {
      this.assignment.engineer = foundEngineer.idUser!;
      this.engineerFirstName = foundEngineer.firstName + ' ' + foundEngineer.lastName;
      console.log(this.assignment.engineer);
    } else {
      this.engineerFirstName = '';
      this.serviceTitle = '';
    }
  }

  onServiceChange(event: any) {
    const selectedTitle = event.target.value;
    const foundService = this.services.find(s => s.title === selectedTitle);
    if (foundService) {
      this.assignment.service = foundService.idService!;
      this.serviceTitle = foundService.title;
    } else {
      this.serviceTitle = '';
    }
  }

  onSave() {
    if (!this.assignment.engineer.trim() || !this.assignment.service.trim()) {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Please fill in the Engineer and Service!",
          showConfirmButton: false,
          timer: 2500
        });
        return;
    }

    this.assignmentService.createAssignment(this.assignment).subscribe({
      next: () => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Assignment Added!",
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
            title: "This engineer is already assigned to this service!",
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

  private getInitialAssignment(): AssignmentRequest {
    return {
      engineer: '',
      service: '',
      createDate: ''
    };
  }

  resetForm() {
    this.assignment = {
      engineer: '',
      service: '',
      createDate: ''
    };
    this.engineerFirstName = '';
    this.serviceTitle = '';
    this.cdr.detectChanges();
  }
}
