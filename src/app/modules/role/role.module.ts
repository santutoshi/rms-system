import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './components/role/role.component';
import { RouterModule } from '@angular/router';
import { roleRoute } from './role.routes';
import { NgxsModule } from '@ngxs/store';
import { RoleStates } from './data-access/store';
import { StaffStates } from '../staff/data-access/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoleComponent,
    RouterModule.forChild(roleRoute),
    NgxsModule.forFeature([StaffStates]),
  ],
})
export class RoleModule {}
