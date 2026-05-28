import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { RouterLink, RouterLinkActive } from "@angular/router";
import Swal from 'sweetalert2';
import {MatIconModule} from '@angular/material/icon';

interface NavLink {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private authService = inject(Auth);
  readonly role = this.authService.getRole();
  isMobileMenuOpen = false;

  private readonly allLinks: NavLink[] = [
    { path: '/admin/reports', label: 'Repots', icon: 'analytics', roles: ['ADMIN'] },
    { path: '/admin/users', label: 'Users', icon: 'groups_2', roles: ['ADMIN'] },
    { path: '/admin/clients', label: 'Clients', icon: 'account_circle', roles: ['ADMIN'] },
    { path: '/admin/services', label: 'Services', icon: 'home_repair_service', roles: ['ADMIN'] },
    { path: '/admin/assignments', label: 'Assignments', icon: 'assignment', roles: ['ADMIN'] },

    { path: '/engineer/my-services', label: 'My Services', icon: 'home_repair_service', roles: ['ENGINEER'] },
    { path: '/engineer/timesheets', label: 'Timesheets', icon: 'punch_clock', roles: ['ENGINEER'] }
  ];

  get dashboardLink() {
    return this.role === 'ADMIN' ? '/admin/reports' : '/engineer/my-services';
  }

  get filteredLinks() {
    return this.allLinks.filter(link => link.roles.includes(this.role!));
  }

  async onLogout() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E60026",
      cancelButtonColor: "#233940",
      confirmButtonText: "Logout"
    });

    if (result.isConfirmed) {
      this.authService.logout();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
  }
  
}
