import { State } from '../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAuth = createFeatureSelector('auth');

export const getAuthError = createSelector(
  getAuth,
  (state: State) => state.authError,
);
