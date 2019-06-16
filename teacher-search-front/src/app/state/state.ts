import {CreateUserInterface} from '../interfaces/app.interface';

export interface State {
  readonly authError: Error;
  readonly users: CreateUserInterface[];
  readonly usersError: Error;
}

export const initialState: State = {
  authError: null,
  usersError: null,
  users: []
};
