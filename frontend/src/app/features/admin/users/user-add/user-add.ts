import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserRequest } from '../../../../core/models/user-request';
import { User } from '../../../../core/services/user/user';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd implements OnInit {
  user: UserRequest = this.getInitialUser();
  confirmPassword = '';
  newUser: any = {};
  isViewMode = false;
  isEditMode = false;
  private cdr = inject(ChangeDetectorRef);

  private userService = inject(User);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('idUser');
    const url = this.router.url;

    if (userId) {
      if (url.includes('details')) {
        this.isViewMode = true;
      } else {
        this.isEditMode = true;
      }
      this.loadUser(userId);
    }
  }

  goBack() {
    this.router.navigate(['/admin/users']);
  }

  loadUser(userId: string) {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.user.password = '********';
        this.confirmPassword = '********';
        this.cdr.detectChanges();
      }
    });
  }

  onSave() {
    const userData = this.user as any;
    const idUser = this.route.snapshot.paramMap.get('idUser');

    if (this.isEditMode && idUser) {
      this.userService.updateUser(idUser, userData).subscribe({
        next: () => this.router.navigate(['/admin/users']),
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
      if (!this.user.firstName.trim() || 
          !this.user.lastName.trim() || 
          !this.user.email.trim() || 
          !this.user.password.trim()) {
            Swal.fire({
                      position: "top",
                      icon: "warning",
                      title: "Please fill in all required fields.",
                      showConfirmButton: false,
                      timer: 2500
                    });
        return;
      }

      if (this.user.password !== this.confirmPassword) {
        Swal.fire({
                      position: "top",
                      icon: "warning",
                      title: "Password do not match!",
                      showConfirmButton: false,
                      timer: 2500
                    });
        return;
      }

      this.userService.createUser(this.user).subscribe({
        next: (res) => {
          Swal.fire({
                      position: "top",
                      icon: "success",
                      title: "User Added!",
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
                      title: "This email already used by another User!",
                      showConfirmButton: false,
                      timer: 2500
                    });
            this.resetForm();
          } else {
            Swal.fire({
                      position: "top",
                      icon: "error",
                      title: "Error happend!",
                      showConfirmButton: false,
                      timer: 2500
                    });
          }
        }
      });
    }
  }

  private getInitialUser(): UserRequest {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'ENGINEER'
    };
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'ENGINEER'
    };
    this.confirmPassword = '';
    this.cdr.detectChanges();
  }
}
