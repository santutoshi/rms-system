import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auditReportRoutes } from './audit-reports.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(auditReportRoutes)],
})
export class AuditReportModule {}
