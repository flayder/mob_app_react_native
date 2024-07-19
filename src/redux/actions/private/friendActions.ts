import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api/api';
import {Friend} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
  SetLoadingAction,
  SetRefreshingAction,
} from '../../types/private/friends.types';
import {handleError} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: FRIENDS_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

const setRefreshing = (loading: boolean): SetRefreshingAction => ({
  type: FRIENDS_ACTION_TYPES.SET_REFRESHING,
  payload: loading,
});

const getFriends = (friends: Friend[], length: number): GetFriendsAction => ({
  type: FRIENDS_ACTION_TYPES.GET_FRIENDS,
  payload: friends,
  tradePointsLength: length,
});

export const loadFriends =
  (
    refreshing: boolean,
    length: number,
  ): ThunkAction<
    void,
    RootState,
    unknown,
    GetFriendsAction | SetLoadingAction
  > =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true));
    else dispatch(setLoading(true));
    api.friends
      .getFriends()
      .then(res => {
        dispatch(getFriends(res.data, length));
        dispatch(setLoading(false));
        dispatch(setRefreshing(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        dispatch(setRefreshing(false));
        dispatch(handleError(e.response));
      });
  };

export const linkUser =
  (
    login: string,
    gtochkaids: string,
    length: number,
  ): ThunkAction<Promise<string>, RootState, unknown, SetLoadingAction> =>
  async dispatch => {
    dispatch(setLoading(true));
    return await new Promise(resolve =>
      api.friends
        .linkUser(login, gtochkaids)
        .then(res => {
          dispatch(loadFriends(false, length));
          resolve(res.data);
        })
        .catch(e => {
          dispatch(handleError(e.response));
          dispatch(setLoading(false));
        }),
    );
  };
