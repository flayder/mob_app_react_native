import {Friend} from '../../../utils/api.types';

export type Friends = {
  loading: boolean;
  refreshing: boolean;
  friends: Friend[];
};

export enum FRIENDS_ACTION_TYPES {
  SET_LOADING = 'FRIENDS_ACTION/SET_LOADING',
  SET_REFRESHING = 'FRIENDS_ACTION/SET_REFRESHING',
  GET_FRIENDS = 'FRIENDS_ACTION/GET_FRIENDS',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetRefreshingAction = {
  type: string;
  payload: boolean;
};

export type GetFriendsAction = {
  type: string;
  payload: Friend[];
  tradePointsLength: number;
};

export type FriendsActions =
  | SetLoadingAction
  | SetRefreshingAction
  | GetFriendsAction;
