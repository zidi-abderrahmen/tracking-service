import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { ClientList } from './features/admin/clients/client-list/client-list';
import { UserList } from './features/admin/users/user-list/user-list';
import { EngineerLayout } from './layout/engineer-layout/engineer-layout';
import { MyServices } from './features/engineer/my-services/my-services';
import { TimesheetList } from './features/engineer/timesheet-list/timesheet-list';
import { roleGuard } from './core/guards/role-guard';
import { Reports } from './features/admin/reports/reports';
import { UserAdd } from './features/admin/users/user-add/user-add';
import { ClientAdd } from './features/admin/clients/client-add/client-add';
import { TimesheetAdd } from './features/engineer/timesheet-add/timesheet-add';
import { ServiceList } from './features/admin/services/service-list/service-list';
import { ServiceAdd } from './features/admin/services/service-add/service-add';
import { AssignmentList } from './features/admin/assignments/assignment-list/assignment-list';
import { AddAssignment } from './features/admin/assignments/add-assignment/add-assignment';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login - Monitoring App' },

  {
    path: 'admin', 
    component: AdminLayout,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', component: Reports },

      { 
        path: 'services', 
        children: [
          { path: '', component: ServiceList },
          { path: 'add', component: ServiceAdd },
          { path: 'edit/:idService', component: ServiceAdd },
          { path: 'details/:idService', component: ServiceAdd },
        ]
      },

      { 
        path: 'clients', 
        children: [
          { path: '', component: ClientList },
          { path: 'add', component: ClientAdd },
          { path: 'edit/:idClient', component: ClientAdd },
          { path: 'details/:idClient', component: ClientAdd },
        ]
      },

      { 
        path: 'users', 
        children: [
          { path: '', component: UserList },
          { path: 'add', component: UserAdd },
          { path: 'edit/:idUser', component: UserAdd },
          { path: 'details/:idUser', component: UserAdd },
        ]
      },

      { 
        path: 'assignments', 
        children: [
          { path: '', component: AssignmentList },
          { path: 'add', component: AddAssignment }
        ]
      }
    ]
  },

  {
    path: 'engineer',
    component: EngineerLayout,
    canActivate: [roleGuard],
    data: { expectedRole: 'ENGINEER' },
    children: [
      { path: '', redirectTo: 'my-services', pathMatch: 'full' },
      { path: 'my-services', component: MyServices },
      { path: 'my-services/details/:idService', component: ServiceAdd },
      { path: 'timesheets', component: TimesheetList },
      { path: 'timesheets/add', component: TimesheetAdd }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];