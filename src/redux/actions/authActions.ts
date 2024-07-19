import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkAction} from 'redux-thunk';
import api from '../../utils/api/api';
import {User} from '../../utils/api.types';
import {RootState} from '../store';
import {
  AuthActions,
  AUTH_ACTION_TYPES,
  SetIsAuthAction,
  SetLoadingAction,
  SetUserAction,
  UserLogoutAction,
} from '../types/auth.types';
import {SetAppLoadingAction} from '../types/fetch.types';
import {handleError, setAppLoading} from './fetchActions';
import {getTradePoints} from './private/mainActions';
import {show} from '../../utils/snackbar';

const userLogout = (): UserLogoutAction => ({
  type: AUTH_ACTION_TYPES.USER_LOGOUT,
});

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: AUTH_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

export const setIsAuth = (isAuth: boolean): SetIsAuthAction => ({
  type: AUTH_ACTION_TYPES.SET_IS_AUTH,
  payload: isAuth,
});

export const setUser = (user: User): SetUserAction => ({
  type: AUTH_ACTION_TYPES.SET_USER,
  payload: user,
});

export const getUser =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetUserAction | SetAppLoadingAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api.main
      .getUser()
      .then(res => {
        dispatch(setUser(res.data));
        dispatch(getTradePoints());
        dispatch(setIsAuth(true));
      })
      .catch(e => {
        dispatch(setAppLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const logout =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction | UserLogoutAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    AsyncStorage.removeItem('accessToken').then(() =>
      AsyncStorage.removeItem('refreshToken').then(() => {
        dispatch(setIsAuth(false));
        dispatch(setAppLoading(false));
        dispatch(userLogout());
      }),
    );
  };

export const login =
  (
    username: string,
    password: string,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    SetAppLoadingAction | SetIsAuthAction
  > =>
  dispatch => {
    dispatch(setAppLoading(true));
    api.auth
      .login(username, password)
      .then(res => {
        AsyncStorage.setItem('accessToken', res.data['X-Auth-Token']).then(() =>
          AsyncStorage.setItem('refreshToken', res.data['Refresh-Token']).then(
            () => {
              dispatch(getUser());
            },
          ),
        );
      })
      .catch(e => {
        dispatch(setAppLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const registrate =
  (
    email: string,
    password: string,
    fn: string,
    nm: string,
    phone: string,
  ): ThunkAction<void, RootState, unknown, AuthActions> =>
  dispatch => {
    dispatch(setLoading(true));
    api.auth
      .registrate(email, password, fn, nm, '', phone)
      .then(res => {
        show({text: res.data, type: 'success'});
        dispatch(login(email, password));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };

export const resetPassword =
  (
    email: string,
    goBack: () => void,
  ): ThunkAction<void, RootState, unknown, SetLoadingAction> =>
  dispatch => {
    dispatch(setLoading(true));
    api.auth
      .resetPassword(email)
      .then(res => {
        goBack();
        show({text: res.data, type: 'success'});
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(handleError(e.response));
      });
  };
