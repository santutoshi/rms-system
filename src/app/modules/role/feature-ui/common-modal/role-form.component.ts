import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControlValidationDirective } from '../../../../shared/directives/form-control-validation.directive';
import { DuplicateRoleNameValidator } from '../../../../shared/utils/duplicate-name.validators';
import { RoleService } from '../../data-access/service';
import { Select, Store } from '@ngxs/store';
import {
  CreateRoleAction,
  EditRoleAction,
  RoleStateSelector,
  SelectedRoleDetailAction,
} from '../../data-access/store';
import { Observable, catchError, of } from 'rxjs';
import { Role } from '../../data-access/models/roles';

@Component({
  selector: 'app-role-form-modal',
  imports: [CommonModule, ReactiveFormsModule, FormControlValidationDirective],
  templateUrl: './role-form.component.html',
  standalone: true,
})
export class RoleFormModalComponent implements OnInit, OnDestroy {
  /* Selects slice of role Total count feature state */
  @Select(RoleStateSelector.SliceOf('totalCount'))
  totalCount$!: Observable<number>;

  /* Selects slice of role details feature state */
  @Select(RoleStateSelector.SliceOf('selectedRoleDetail'))
  roleDetails$!: Observable<Role>;

  roleDetails!: Role;

  totalRoleCount!: number;
  @Input() roleId!: number;
  @Input() header!: string;
  @Input() actionType!: string;
  roleForm!: UntypedFormGroup;

  constructor(
    private _fb: UntypedFormBuilder,
    private _store: Store,
    public activeModal: NgbActiveModal,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.initRoleFormGroup();

    /*Get the Next Role id  */
    this.totalCount$.subscribe((res) => {
      this.totalRoleCount = res;
    });

    /** Dispatch role details action on edit  */
    if (this.actionType === 'edit') {
      this._store.dispatch(new SelectedRoleDetailAction(this.roleId));
    }

    /**Patch the Role Values on form */
    this.roleDetails$.subscribe((res: Role) => {
      this.roleDetails = res;
      this.roleForm.patchValue(res);
    });
  }

  ngOnDestroy(): void {
    this.roleForm.reset();
  }

  initRoleFormGroup(): void {
    this.roleForm = this._fb.group({
      roleName: this._fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [
          DuplicateRoleNameValidator.createValidator(
            this._roleService,
            false
          ).bind(this),
        ],
        updateOn: 'change',
        nonNullable: true,
      }),
    });
  }

  submitForm(): void {
    if (this.roleForm.valid) {
      const roleId =
        this.actionType === 'add'
          ? (this.totalRoleCount + 1).toString()
          : this.roleDetails.id;

      const requestObj: Role = {
        id: roleId,
        roleId: roleId,
        roleName: this.roleForm.value.roleName,
        description: '',
        permissions: [],
      };

      if (this.actionType === 'add') {
        this._store
          .dispatch(new CreateRoleAction(requestObj))
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
      } else {
        this._store
          .dispatch(new EditRoleAction(requestObj))
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
  }

  onCancel(): void {
    this.activeModal.dismiss('Cross click');
  }
}
