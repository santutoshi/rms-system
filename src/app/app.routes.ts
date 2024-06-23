import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/component/layout/layout.component';
import { authGuard } from './core/gaurds';

export const routes: Routes = [
  {
    path: 'account/login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/role/role.module').then((mod) => mod.RoleModule),
      },
      {
        path: 'permission',
        loadChildren: () =>
          import('./modules/permission/permission.module').then(
            (mod) => mod.PermissionModule
          ),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./modules/staff/staff.module').then((mod) => mod.StaffModule),
      },
      {
        path: 'audit-reports',
        loadChildren: () =>
          import('./modules/audit-report/audit-report.module').then(
            (mod) => mod.AuditReportModule
          ),
      },
    ],
  },
];
