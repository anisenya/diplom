import { ModeratorActions } from '../actions/moderator.actions';
import { initialState, State } from '../state';
import { ModeratorActionTypes } from '../actions/moderator.actions';

export function moderatorReducer(state = initialState, action: ModeratorActions): State {
  switch (action.type) {
    case ModeratorActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
        usersError: null
      };

    case ModeratorActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        usersError: null
      };
    case ModeratorActionTypes.CREATE_USER_FAIL:
      return {
        ...state,
        usersError: action.payload,
      };
    case ModeratorActionTypes.REMOVE_USER_SUCCESS:
      return {
        ...state,
        //@ts-ignore
        users: state.users.filter(user => user.login !== action.payload.login),
        usersError: null
      };
    case ModeratorActionTypes.REMOVE_USER_FAIL:
      return {
        ...state,
        usersError: action.payload,
      };
    default:
      return state;
  }
}
