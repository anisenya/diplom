import { Action } from '@ngrx/store';
import {CreateUserInterface} from '../../interfaces/app.interface';

export enum ModeratorActionTypes {
  LOAD_USER = '[Moderator] Load user',
  LOAD_USER_SUCCESS = '[Moderator] Load user Success',
  LOAD_USER_FAIL = '[Moderator] Load user Fail',
  CREATE_USER = '[Moderator] Create user',
  CREATE_USER_SUCCESS = '[Moderator] Create user Success',
  CREATE_USER_FAIL = '[Moderator] Create user Fail',
  REMOVE_USER = '[Moderator] Remove user',
  REMOVE_USER_SUCCESS = '[Moderator] Remove user Success',
  REMOVE_USER_FAIL = '[Moderator] Remove user Fail',
}

export class LoadUser implements Action {
  readonly type = ModeratorActionTypes.LOAD_USER;
}

export class LoadUserSuccess implements Action {
  readonly type = ModeratorActionTypes.LOAD_USER_SUCCESS;

  constructor(readonly payload: CreateUserInterface[]) {}
}

export class LoadUserFail implements Action {
  readonly type = ModeratorActionTypes.LOAD_USER_FAIL;
}

export class CreateUser implements Action {
  readonly type = ModeratorActionTypes.CREATE_USER;

  constructor(readonly payload: CreateUserInterface) {}
}

export class CreateUserSuccess implements Action {
  readonly type = ModeratorActionTypes.CREATE_USER_SUCCESS;

  constructor(readonly payload: CreateUserInterface) {}
}

export class CreateUserFail implements Action {
  readonly type = ModeratorActionTypes.CREATE_USER_FAIL;

  constructor(readonly payload: Error) {}
}

export class RemoveUser implements Action {
  readonly type = ModeratorActionTypes.REMOVE_USER;

  constructor(readonly payload: string) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = ModeratorActionTypes.REMOVE_USER_SUCCESS;

  constructor(readonly payload: string) {}
}

export class RemoveUserFail implements Action {
  readonly type = ModeratorActionTypes.REMOVE_USER_FAIL;

  constructor(readonly payload: Error) {}
}

export type ModeratorActions =
  LoadUser |
  LoadUserSuccess |
  LoadUserFail |
  CreateUser |
  CreateUserSuccess |
  CreateUserFail |
  RemoveUser |
  RemoveUserSuccess |
  RemoveUserFail;
