import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable, catchError, of } from 'rxjs';
import { FilterTableComponent } from '../../../../shared/components/filter-table/filter-table.component';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FormControlValidationDirective } from '../../../../shared/directives/form-control-validation.directive';
import {
  CreateStaffAction,
  GetStaffAction,
  StaffStateSelector,
} from '../../../staff/data-access/store';

@Component({
  selector: 'app-create-staff-popup',
  standalone: true,
  imports: [
    CommonModule,
    FilterTableComponent,
    ReactiveFormsModule,
    FormControlValidationDirective,
  ],
  templateUrl: './create-staff-popup.component.html',
  styleUrl: './create-staff-popup.component.scss',
})
export class CreateStaffPopupComponent implements OnInit {
  /* Selects slice of role Total count feature state */
  @Select(StaffStateSelector.SliceOf('totalCount'))
  totalStaffCount$!: Observable<number>;

  permissionList: string[] = ['standard', 'basic', 'trial'];

  totalStaffCount!: number;
  @Input() roleId!: number;
  @Input() header!: string;
  staffForm!: UntypedFormGroup;

  constructor(
    private _fb: UntypedFormBuilder,
    private _store: Store,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initStaffFormGroup();

    this._store.dispatch(new GetStaffAction());

    this.totalStaffCount$.subscribe((res) => [(this.totalStaffCount = res)]);
  }

  initStaffFormGroup(): void {
    this.staffForm = this._fb.group({
      staffName: this._fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'change',
        nonNullable: true,
      }),
      permissions: this._fb.control('', { validators: [Validators.required] }),
    });
  }

  submitForm(): void {
    if (this.staffForm.valid) {
      const nextId = this.totalStaffCount + 1;
      const requestObj = {
        id: JSON.stringify(nextId),
        staffId: JSON.stringify(nextId),
        name: this.staffForm.value.staffName,
        roleId: this.roleId,
        permissions: this.staffForm.value.permissions,
      };

      this._store
        .dispatch(new CreateStaffAction(requestObj))
        .pipe(
          catchError((error: any) => {
            return of(null); // Return a known value, or re-throw the error if needed
          })
        )
        .subscribe((res: any) => {
          if (res) {
            this.activeModal.close(true);
          }
        });
    }
  }

  onCancel(): void {
    this.activeModal.dismiss('Cross click');
  }
}
