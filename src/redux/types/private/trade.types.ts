import {DateRange, SetDateAction} from '../../../utils';
import {Sales, Sklad} from '../../../utils/api.types';

export type Tab<T> = {
  loading: boolean;
  refreshing: boolean;
  data: T;
};

export type Tabs = {
  sales: Tab<Sales>;
  income: Tab<Sklad>;
  return: Tab<Sklad>;
  writedOff: Tab<Sales>;
};

export type Trade = {
  index: number;
  date: DateRange;
  tabs: Tabs;
  tradeSession: TradeSession;
};

export enum TAB_TYPES {
  SALES = 'sales',
  INCOME = 'income',
  RETURN = 'return',
  WRITED_OFF = 'writedOff',
}

export type TradeSessionDetail = {
  remainder: number;
  amount: number;
  name: string;
  gProductId: number;
  cost: number;
};

export type TradeSession = {
  discount: number;
  edit: boolean;
  newTrade: boolean;
  type: TAB_TYPES;
  typeId: number;
  date: string;
  payedSumm: number;
  summ: number;
  summBonus: number;
  summCash: number;
  summNoncash: number;
  details: TradeSessionDetail[];
};

export enum TRADE_ACTION_TYPES {
  SET_LOADING = 'TRADE_ACTION/SET_LOADING',
  SET_REFRESHING = 'TRADE_ACTION/SET_REFRESHING',
  SET_DATE = 'TRADE_ACTION/SET_DATE',
  SET_SALES = 'TRADE_ACTION/SET_SALES',
  SET_INCOME = 'TRADE_ACTION/SET_INCOME',
  SET_RETURN = 'TRADE_ACTION/SET_RETURN',
  SET_WRITED_OFF = 'TRADE_ACTION/SET_WRITED_OFF',
  SET_TRADE_SESSION = 'TRADE_ACTION/SET_TRADE_SESSION',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetRefreshingAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetSalesAction = {
  type: string;
  payload: Sales;
};

export type SetIncomeAction = {
  type: string;
  loadMore: boolean;
  payload: Sklad;
};

export type SetReturnAction = {
  type: string;
  loadMore: boolean;
  payload: Sklad;
};

export type SetWritedOffAction = {
  type: string;
  payload: Sales;
};

export type SetTradeSessionAction = {
  type: string;
  payload: TradeSession;
};

export type TradeActions =
  | SetDateAction
  | SetSalesAction
  | SetIncomeAction
  | SetReturnAction
  | SetWritedOffAction
  | SetTradeSessionAction
  | SetLoadingAction
  | SetRefreshingAction;
