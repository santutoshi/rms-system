export const PERMISSION = '[GET] PERMISSION ';
export const PERMISSION_UPDATE = '[UPDATE] Permission Update';

export class GetPermissionAction {
  static readonly type = PERMISSION;
}

export class PermissionUpdateAction {
  static readonly type = PERMISSION_UPDATE;

  constructor(public payload: any) {}
}
