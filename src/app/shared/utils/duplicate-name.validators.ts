/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { RoleService } from '../../modules/role/data-access/service';

export class DuplicateRoleNameValidator {
  static createValidator(
    roleService: RoleService,
    isSignup: boolean
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return roleService.checkDuplicateName(control.value).pipe(
        debounceTime(200),
        map((response: any) => {
          if (response) {
            return { alreadyExists: true };
          } else {
            return null;
          }
        }),
        catchError((err: any) => {
          return of(null);
        })
      );
    };
  }
}
