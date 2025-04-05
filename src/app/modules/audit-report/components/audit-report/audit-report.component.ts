import { Component } from '@angular/core';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-audit-report',
  standalone: true,
  imports: [InvoiceFormComponent],
  templateUrl: './audit-report.component.html',
  styleUrl: './audit-report.component.scss',
})
export class AuditReportComponent {}
