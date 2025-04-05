import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { auditReportRoutes } from './audit-reports.routes';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(auditReportRoutes)],
})
export class AuditReportModule {}
