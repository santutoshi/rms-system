import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import {
  PermissionStateModel,
  initialPermissionStateModel,
} from './permission-state.model';
import { PermissionService } from '../service';
import {
  GetPermissionAction,
  PermissionUpdateAction,
} from './permission.actions';
import { EMPTY } from 'rxjs';
@State<PermissionStateModel>({
  name: 'permissiion',
  defaults: initialPermissionStateModel,
})
@Injectable()
export class PermissionState {
  constructor(
    private readonly _permissionService: PermissionService,
    private readonly _toastrService: ToastrService
  ) {}

  /**Get Permision list*/
  @Action(GetPermissionAction)
  getPermissionList(
    ctx: StateContext<PermissionStateModel>,
    action: GetPermissionAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._permissionService.getPermissionForRole().pipe(
      map((res: any) => {
        ctx.patchState({ permissionList: res });
      }),
      catchError((error) => {
        this._toastrService.error('Error loading the permission List.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Handle Permission  Update */
  @Action(PermissionUpdateAction)
  updatePermission(
    ctx: StateContext<PermissionStateModel>,
    action: PermissionUpdateAction
  ): unknown {
    return this._permissionService.updatePermission(action.payload).pipe(
      map((res: any) => {
        ctx.dispatch(new GetPermissionAction());
      }),
      catchError((error) => {
        this._toastrService.error('Error updating the permission .!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }
}
