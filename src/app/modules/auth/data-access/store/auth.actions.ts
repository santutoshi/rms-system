import { AuthDTO, AuthResponse } from '../models';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_ERROR = '[Auth] Login Error';

export class LoginAction {
  static readonly type = LOGIN;

  constructor(public payload: AuthDTO) {}
}

export class LoginSuccessAction {
  static readonly type = LOGIN_SUCCESS;

  constructor(public payload: AuthResponse) {}
}

export class LoginErrorAction {
  static readonly type = LOGIN_ERROR;

  constructor(public payload: Error) {}
}
