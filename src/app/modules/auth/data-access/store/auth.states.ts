import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from '../models';
import { AuthStateModel, initialAuthStateModel } from './auth-state.model';
import {
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { GetPermissionAction } from '../../../permission/data-access/store';

@State<AuthStateModel>({
  name: 'auth',
  defaults: initialAuthStateModel,
})
@Injectable()
export class AuthStates {
  constructor(
    private readonly _authService: AuthService,
    private readonly _toastrService: ToastrService
  ) {}

  /**User Login  Form Submit*/
  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction): unknown {
    ctx.patchState({ isLoading: true });
    return this._authService.login(action.payload).pipe(
      map((user: AuthResponse[]) => {
        const userDetails = user[0];
        if (!userDetails) {
          this._toastrService.error("Username and password dosen't match.!");
        } else {
          if (userDetails.password === action.payload.password) {
            ctx.dispatch(new LoginSuccessAction(user[0]));
            ctx.patchState({ isLoading: false });
          } else {
            this._toastrService.error("Username and password dosen't match.!");
          }
        }
      }),
      catchError((error) => ctx.dispatch(new LoginErrorAction(error)))
    );
  }

  /**Handle Login Success */
  @Action(LoginSuccessAction)
  loginSuccess(
    ctx: StateContext<AuthStateModel>,
    action: LoginSuccessAction
  ): unknown {
    const user = action.payload;
    const token = user.token;
    const fullName = user.firstName + user.lastName;
    const role = user.role;
    const roleId = user.roleId;
    const permisions = user.permissions;
    ctx.patchState({ token: token, isLoading: false });
    localStorage.setItem('auth_token', token);
    localStorage.setItem('full_name', fullName);
    localStorage.setItem('role', role);
    localStorage.setItem('roleId', JSON.stringify(roleId));
    localStorage.setItem('permissions', JSON.stringify(permisions));
    ctx.dispatch(new GetPermissionAction());
    return ctx.dispatch(new Navigate(['/']));
  }

  /**Handle Login Error  */
  @Action(LoginErrorAction)
  loginError(
    ctx: StateContext<AuthStateModel>,
    { payload }: LoginErrorAction
  ): unknown {
    this._toastrService.error(payload.message, '', { timeOut: 5000 });
    return ctx.patchState({ isLoading: false, errorMessage: payload });
  }
}
