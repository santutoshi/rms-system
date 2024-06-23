import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { permissionRoutes } from './permission.routes';
import { PermissionComponent } from './components/permission/permission.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PermissionComponent,
    RouterModule.forChild(permissionRoutes),
  ],
})
export class PermissionModule {}
