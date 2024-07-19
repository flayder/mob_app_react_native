import {User} from '../../utils/api.types';
import {
  AuthActions,
  AUTH_ACTION_TYPES,
  Auth,
  SetIsAuthAction,
  SetUserAction,
  SetLoadingAction,
} from '../types/auth.types';

const initialUser: User = {
  fn: '',
  nm: '',
  ft: '',
  phone: '',
  login: '',
};

export const initialState: Auth = {
  loading: false,
  isAuth: false,
  user: initialUser,
};

export const auth = (state: Auth = initialState, action: AuthActions): Auth => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case AUTH_ACTION_TYPES.SET_IS_AUTH:
      return {...state, isAuth: (action as SetIsAuthAction).payload};
    case AUTH_ACTION_TYPES.SET_USER:
      return {...state, user: (action as SetUserAction).payload};
    default:
      return state;
  }
};
