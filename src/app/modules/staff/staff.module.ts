import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { staffRoute } from './staff.routes';
import { NgxsModule } from '@ngxs/store';
import { StaffStates } from './data-access/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(staffRoute),
    NgxsModule.forFeature([StaffStates]),
  ],
})
export class StaffModule {}
