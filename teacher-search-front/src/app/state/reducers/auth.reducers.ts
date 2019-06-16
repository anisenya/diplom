import { AuthActions } from '../actions/auth.actions';
import { initialState, State } from '../state';
import { AuthActionTypes } from '../actions/auth.actions';

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case AuthActionTypes.AUTH_FAIL:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
}
