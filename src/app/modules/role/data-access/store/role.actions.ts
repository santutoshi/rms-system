import { Role } from '../models/roles';

export const GET_ROLE = '[GET] Role';
export const GET_ROLE_DETAILS = '[GET] Role Details';
export const GET_SELECTED_ROLE = '[GET] Selected Role  Details';
export const CREATE_ROLE = '[CREATE] Role';
export const EDIT_ROLE = '[EDIT] Role';
export const DELETE_ROLE = '[DELETE] Role';

export class GetRoleAction {
  static readonly type = GET_ROLE;
}

export class CreateRoleAction {
  static readonly type = CREATE_ROLE;

  constructor(public payLoad: any) {}
}

export class RoleDetailAction {
  static readonly type = GET_ROLE_DETAILS;

  constructor(public roleId: any) {}
}

export class SelectedRoleDetailAction {
  static readonly type = GET_SELECTED_ROLE;

  constructor(public roleId: any) {}
}

export class EditRoleAction {
  static readonly type = EDIT_ROLE;

  constructor(public payLoad: Role) {}
}

export class DeleteRoleAction {
  static readonly type = DELETE_ROLE;

  constructor(public roleId: number) {}
}
