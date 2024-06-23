import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { DynamicComponent } from '../../data-access/models';

@Component({
  selector: 'app-validation-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (errorMessage of data.errorMessages; track $index) {
    <div class="rms-error_text">
      {{ errorMessage }}
    </div>
    }
  `,
})
export class ValidationErrorMessageComponent implements DynamicComponent {
  data: any;

  constructor(public elementRef: ElementRef) {}
}
