import {Remainders as TRemainders} from '../../../utils/api.types';

export type Remainders = {
  loading: boolean;
  refreshing: boolean;
  descending: boolean;
  data: TRemainders;
};

export enum REMAINDERS_ACTION_TYPES {
  SET_LOADING = 'REMAINDERS_ACTION/SET_LOADING',
  SET_REFRESHING = 'REMAINDERS_ACTION/SET_REFRESHING',
  SET_DESCENDING = 'REMAINDERS_ACTION/SET_DESCENDING',
  SET_REMAINDERS = 'REMAINDERS_ACTION/SET_REMAINDERS',
  CLEAR_REMAINDERS = 'REMAINDERS_ACTION/CLEAR_REMAINDERS',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetRefreshingAction = {
  type: string;
  payload: boolean;
};

export type SetDescendingAction = {
  type: string;
  payload: boolean;
};

export type SetRemaindersAction = {
  type: string;
  loadMore: boolean;
  payload: TRemainders;
};

export type ClearRemaindersAction = {
  type: String;
};

export type RemaindersActions =
  | SetLoadingAction
  | SetRefreshingAction
  | SetDescendingAction
  | SetRemaindersAction
  | ClearRemaindersAction;
