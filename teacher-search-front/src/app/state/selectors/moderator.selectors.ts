import { State } from '../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUsers = createFeatureSelector('moderator');

export const getUsersError = createSelector(
  getUsers,
  (state: State) => state.usersError,
);

export const getAllUsers = createSelector(
  getUsers,
  (state: State) => state.users,
);

export const getUsersByName = (name: string) => {
  return createSelector(
    getUsers,
    (state: State) => state.users.filter(user => user.secondName.startsWith(name))
  );
};
