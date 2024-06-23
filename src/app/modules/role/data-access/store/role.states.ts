import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { RoleStateModel, initialRoleStateModel } from './role-state.model';
import {
  CreateRoleAction,
  DeleteRoleAction,
  EditRoleAction,
  GetRoleAction,
  RoleDetailAction,
  SelectedRoleDetailAction,
} from './role.actions';
import { RoleService } from '../service';
import { EMPTY, catchError, map } from 'rxjs';
import { Role } from '../models/roles';

@State<RoleStateModel>({
  name: 'role',
  defaults: initialRoleStateModel,
})
@Injectable()
export class RoleStates {
  constructor(
    private readonly _roleService: RoleService,
    private readonly _toastrService: ToastrService
  ) {}

  /**Get Role List*/
  @Action(GetRoleAction)
  getRoleList(
    ctx: StateContext<RoleStateModel>,
    action: GetRoleAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.getRoleList().pipe(
      map((res: Array<Role>) => {
        return ctx.patchState({
          roleList: res,
          totalCount: res.length,
          isLoading: false,
        });
      }),
      catchError((error) => {
        this._toastrService.error('Error loading the role list.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Get Role Details with role Id */
  @Action(RoleDetailAction)
  getRoleDetail(
    ctx: StateContext<RoleStateModel>,
    { roleId }: RoleDetailAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.getRoleDetails(roleId).pipe(
      map((res: Array<Role>) => {
        return ctx.patchState({
          roleDetail: res[0],
          isLoading: false,
        });
      }),
      catchError((error) => {
        this._toastrService.error('Error loading the role details.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Get Selected Role Details with role Id */
  @Action(SelectedRoleDetailAction)
  getSelectedtRoleDetail(
    ctx: StateContext<RoleStateModel>,
    { roleId }: SelectedRoleDetailAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.getRoleDetails(roleId).pipe(
      map((res: Array<Role>) => {
        return ctx.patchState({
          selectedRoleDetail: res[0],
          isLoading: false,
        });
      }),
      catchError((error) => {
        this._toastrService.error('Error loading the role details.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Create Role*/
  @Action(CreateRoleAction, { cancelUncompleted: true })
  createRole(
    ctx: StateContext<RoleStateModel>,
    { payLoad }: CreateRoleAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.createRole(payLoad).pipe(
      map((res: any) => {
        this._toastrService.success('Role created successfully.');

        return ctx.dispatch(new GetRoleAction());
      }),
      catchError((error) => {
        this._toastrService.error('Faild to create role.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Edit Role*/
  @Action(EditRoleAction, { cancelUncompleted: true })
  editRole(
    ctx: StateContext<RoleStateModel>,
    { payLoad }: EditRoleAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.updateRole(payLoad).pipe(
      map((res: any) => {
        this._toastrService.success('Role updated successfully.');

        return ctx.dispatch(new GetRoleAction());
      }),
      catchError((error) => {
        this._toastrService.error('Faild to create role.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Delete Role*/
  @Action(DeleteRoleAction, { cancelUncompleted: true })
  deleteRole(
    ctx: StateContext<RoleStateModel>,
    { roleId }: DeleteRoleAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._roleService.deleteRole(roleId).pipe(
      map((res: any) => {
        this._toastrService.error('Role deleted successfully.');
        return ctx.dispatch(new GetRoleAction());
      }),
      catchError((error) => {
        this._toastrService.error('Faild to delete role.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }
}
