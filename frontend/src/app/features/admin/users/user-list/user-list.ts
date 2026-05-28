import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { User } from '../../../../core/services/user/user';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../core/services/auth/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

interface UserData {
  idUser: string;
  firstName: string;
  lastName: string;
  email?: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  users: UserData[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  
  private userService = inject(User);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(Auth);
  private adminId = this.auth.getId();

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers()
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data: UserData[]) => {
          // Filter out the currently logged-in admin
          this.users = data.filter(u => u.idUser != this.adminId);
        },
        error: () => this.showToast('error', 'Failed to load users')
      });
  }

  onSearch() {
    const term = this.searchTerm.trim();

    if (!term) {
      this.loadUsers();
      return;
    }

    this.isLoading = true;
    this.userService.getUsersByName(term)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data: UserData[]) => {
          this.users = data.filter(u => u.idUser != this.adminId);
        },
        error: () => this.showToast('error', 'Search failed')
      });
  }

  // Called on (input) event to detect when user clears field manually
  checkEmptySearchField(term: string) {
    if (!term.trim()) {
      this.loadUsers();
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadUsers();
  }

  onDelete(idUser: string, firstName: string, lastName: string) {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to remove ${firstName} ${lastName}? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDelete(idUser);
      }
    });
  }

  private performDelete(idUser: string) {
    this.userService.deleteUser(idUser).subscribe({
      next: () => {
        this.showToast('success', 'User deleted successfully');
        this.loadUsers(); // Refresh list
      },
      error: () => this.showToast('error', 'Could not delete user')
    });
  }

  // Helper for consistent toasts
  private showToast(icon: 'success' | 'error' | 'warning', title: string) {
    Swal.fire({
      position: "top-end",
      toast: true,
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000
    });
  }
}
