import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { NgxsModule } from '@ngxs/store';
import { AuthStates } from './data-access/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    NgxsModule.forFeature([AuthStates]),
  ],
})
export class AuthModule {}
