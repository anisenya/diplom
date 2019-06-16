import { Action } from '@ngrx/store';
import { UserLogin } from '../models/user-login';
import { UserAuth } from '../models/user-auth';
export enum AuthActionTypes {
  AUTH = '[Auth] Auth',
  AUTH_SUCCESS = '[Auth] Auth Success',
  AUTH_FAIL = '[Auth] Auth Fail',
}

export class Auth implements Action {
  readonly type = AuthActionTypes.AUTH;

  constructor(readonly payload: UserLogin) {}
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;

  constructor(readonly payload: UserAuth) {}
}

export class AuthFail implements Action {
  readonly type = AuthActionTypes.AUTH_FAIL;

  constructor(readonly payload: Error) {}
}

export type AuthActions = Auth | AuthSuccess | AuthFail;
