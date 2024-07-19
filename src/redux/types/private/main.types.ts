import {
  MainData,
  MainGraph,
  TradePoint,
  TradePoints,
} from '../../../utils/api.types';

export type Main = {
  loading: boolean;
  refreshing: boolean;
  tradePoints: TradePoints;
  tradePoint: TradePoint | undefined;
  mainData: MainData;
  mainGraph: MainGraph[];
};

export enum MAIN_ACTION_TYPES {
  SET_LOADING = 'MAIN_ACTION/SET_LOADING',
  SET_REFRESHING = 'MAIN_ACTION/SET_REFRESHING',
  SET_TRADE_POINTS = 'MAIN_ACTION/SET_TRADE_POINTS',
  SET_TRADE_POINT = 'MAIN_ACTION/SET_TRADE_POINT',
  SET_MAIN_DATA = 'MAIN_ACTION/SET_MAIN_DATA',
  SET_MAIN_GRAPH = 'MAIN_ACTION/SET_MAIN_GRAPH',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetRefreshingAction = {
  type: string;
  payload: boolean;
};

export type SetTradePointsAction = {
  type: string;
  payload: TradePoints;
};

export type SetTradePointAction = {
  type: string;
  payload: TradePoint | undefined;
};

export type SetMainDataAction = {
  type: string;
  payload: MainData;
};

export type SetMainGraphAction = {
  type: string;
  payload: MainGraph[];
};

export type MainActions =
  | SetLoadingAction
  | SetRefreshingAction
  | SetTradePointsAction
  | SetTradePointAction
  | SetMainDataAction
  | SetMainGraphAction;
