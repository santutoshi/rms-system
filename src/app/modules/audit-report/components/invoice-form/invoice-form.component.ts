import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormControlValidationDirective } from '../../../../shared/directives/form-control-validation.directive';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlValidationDirective],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss',
})
export class InvoiceFormComponent {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      invoiceDate: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      items: this.fb.array([]),
      totalAmount: [{ value: 0, disabled: true }],
    });

    this.addItem(); // Add an initial empty item
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });

    itemGroup.valueChanges.subscribe(() => this.updateItemTotal(itemGroup));
    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateTotalAmount();
  }

  updateItemTotal(itemGroup: FormGroup): void {
    const quantity = itemGroup.get('quantity')?.value;
    const price = itemGroup.get('price')?.value;
    const total = quantity * price;

    itemGroup.patchValue({ total }, { emitEvent: false });
    this.updateTotalAmount();
  }

  updateTotalAmount(): void {
    const total = this.items.controls.reduce(
      (sum, item) => sum + item.get('total')?.value,
      0
    );
    this.invoiceForm.patchValue({ totalAmount: total }, { emitEvent: false });
  }

  submitInvoice(): void {
    if (this.invoiceForm.valid) {
      console.log('Invoice Data:', this.invoiceForm.getRawValue());
      alert('Invoice Submitted!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
