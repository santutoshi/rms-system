import { Routes } from '@angular/router';
import { PermissionComponent } from './components/permission/permission.component';

export const permissionRoutes: Routes = [
  {
    path: '',
    component: PermissionComponent,
  },
  {
    path: ':id',
    component: PermissionComponent,
  },
];
