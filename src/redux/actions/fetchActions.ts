import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosResponse} from 'axios';
import {show} from '../../utils/snackbar';
import {AppDispatch} from '../store';
import {FETCH_ACTION_TYPES, SetAppLoadingAction} from '../types/fetch.types';
import {setIsAuth} from './authActions';

export const setAppLoading = (loading: boolean): SetAppLoadingAction => ({
  type: FETCH_ACTION_TYPES.SET_APP_LOADING,
  payload: loading,
});

export const handleError =
  (response: AxiosResponse<string>) => (dispatch: AppDispatch) => {
    if (response.status === 401)
      return AsyncStorage.removeItem('accessToken').then(() =>
        AsyncStorage.removeItem('refreshToken').then(() =>
          dispatch(setIsAuth(false)),
        ),
      );
    show({text: response.data, type: 'error'});
  };
