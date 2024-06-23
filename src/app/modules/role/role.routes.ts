import { Routes } from '@angular/router';
import { RoleComponent } from './components/role/role.component';
import { RoleStaffsComponent } from './components/role-staffs/role-staffs.component';

export const roleRoute: Routes = [
  { path: '', component: RoleComponent },
  { path: 'details/:id', component: RoleStaffsComponent },
];
