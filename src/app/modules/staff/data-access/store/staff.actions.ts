import { Staff } from '../models/staff.model';

export const GET_STAFF = '[GET] Staff';
export const CREATE_STAFF = '[CREATE] Staff';
export const GET_STAFF_ROLEID = '[GET] Staff fro RoleId';
export const EDIT_STAFF = '[EDIT] Staff';
export const DELETE_STAFF = '[DELETE] Staff';

export class GetStaffAction {
  static readonly type = GET_STAFF;
}

export class CreateStaffAction {
  static readonly type = CREATE_STAFF;

  constructor(public payLoad: any) {}
}

export class EditStaffAction {
  static readonly type = EDIT_STAFF;

  constructor(public staffId: any, public payLoad: Staff) {}
}

export class RoleStaffAction {
  static readonly type = GET_STAFF_ROLEID;

  constructor(public roleId: number) {}
}

export class DeleteStaffAction {
  static readonly type = DELETE_STAFF;

  constructor(public staffId: number, public roleId: number) {}
}
