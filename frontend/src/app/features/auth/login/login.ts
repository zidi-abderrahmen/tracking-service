import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      this.redirectByRole(role);
    }
  }

  errorMessage: string = '';

  onSubmit() {
    this.errorMessage = '';

  // TC-02: catches empty password
  if (this.loginForm.get('password')?.value === '') {
    this.errorMessage = 'Le mot de passe est requis';
    return;
  }

  if (this.loginForm.invalid) {
    this.errorMessage = 'Le mot de passe est requis';
    return;
  }

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      // save token, navigate to dashboard
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      // TC-03: wrong credentials
      this.errorMessage = 'Identifiants invalides';
    }
  });
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.redirectByRole(response.role);
        },
        error: (err) => {
          if (err.status === 401) {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Invalid email or password",
              showConfirmButton: false,
              timer: 2500
            });
          } else if (err.status === 0) {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Database is not connected!",
              showConfirmButton: false,
              timer: 2500
            });
          }
          console.error('Login failed', err);
        }
      });
    }
  }

  private redirectByRole(role: string | null) {
    if (role === 'ADMIN') {
      this.router.navigate(['/admin/reports']);
    } else if (role === 'ENGINEER') {
      this.router.navigate(['/engineer/my-services']);
    }
  }
}
