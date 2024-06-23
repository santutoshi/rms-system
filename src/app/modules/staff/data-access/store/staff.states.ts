import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, map } from 'rxjs';
import { StaffService } from '../service';
import {
  CreateStaffAction,
  DeleteStaffAction,
  EditStaffAction,
  GetStaffAction,
  RoleStaffAction,
} from './staff.actions';
import { StaffStateModel, initialStaffStateModel } from './staff-state.model';
import { Staff } from '../models/staff.model';

@State<StaffStateModel>({
  name: 'staff',
  defaults: initialStaffStateModel,
})
@Injectable()
export class StaffStates {
  constructor(
    private readonly _staffService: StaffService,
    private readonly _toastrService: ToastrService
  ) {}

  /**Get Staff List*/
  @Action(GetStaffAction)
  getRoleList(
    ctx: StateContext<StaffStateModel>,
    action: GetStaffAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._staffService.getStaffList().pipe(
      map((res: Array<Staff>) => {
        return ctx.patchState({
          staffList: res,
          totalCount: res.length,
          isLoading: false,
        });
      }),
      catchError((error) => {
        this._toastrService.error('Error loading the staff list.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Create Staff*/
  @Action(CreateStaffAction, { cancelUncompleted: true })
  createStaff(
    ctx: StateContext<StaffStateModel>,
    { payLoad }: CreateStaffAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._staffService.createStaff(payLoad).pipe(
      map((res: any) => {
        this._toastrService.success('Staff created successfully.');

        return ctx.dispatch(new GetStaffAction());
      }),
      catchError((error) => {
        this._toastrService.error('Faild to create role.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Edit Staff*/
  @Action(EditStaffAction, { cancelUncompleted: true })
  editStaff(
    ctx: StateContext<StaffStateModel>,
    { staffId, payLoad }: EditStaffAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._staffService.updateStaff(staffId, payLoad).pipe(
      map((res: any) => {
        this._toastrService.success('Staff Edited successfully.');

        return ctx.dispatch(new GetStaffAction());
      }),
      catchError((error) => {
        this._toastrService.error('Faild to edit Staff.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Get Staf for rolef*/
  @Action(RoleStaffAction, { cancelUncompleted: true })
  roleStaffList(
    ctx: StateContext<StaffStateModel>,
    { roleId }: RoleStaffAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._staffService.getStaffForRole(roleId).pipe(
      map((res: any) => {
        ctx.patchState({ roleStaffList: res, isLoading: false });
      }),
      catchError((error) => {
        this._toastrService.error('Faild to load Staff for role.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }

  /**Delete Staff*/
  @Action(DeleteStaffAction, { cancelUncompleted: true })
  deleteRole(
    ctx: StateContext<StaffStateModel>,
    { staffId, roleId }: DeleteStaffAction
  ): unknown {
    ctx.patchState({ isLoading: true });
    return this._staffService.deleteStaff(staffId).pipe(
      map((res: any) => {
        this._toastrService.success('Staff deleted successfully.');
        return ctx.dispatch(new RoleStaffAction(roleId));
      }),
      catchError((error) => {
        this._toastrService.error('Faild to delete Staff.!');
        ctx.patchState({ isLoading: false });
        return EMPTY;
      })
    );
  }
}
