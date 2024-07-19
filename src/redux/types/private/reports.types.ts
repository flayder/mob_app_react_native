import {DateRange, SetDateAction} from '../../../utils';
import {
  SalesGroups,
  SalesMonth,
  SalesProducts,
  ReturnsProducts,
  TopSales,
  AvgReceipt,
} from '../../../utils/api.types';

export type Tab<T> = {
  reduce: boolean;
  loading: boolean;
  refreshing: boolean;
  data: T;
};

export type Tabs = {
  salesGroups: Tab<SalesGroups>;
  salesProducts: Tab<SalesProducts>;
  salesMonth: Tab<SalesMonth>;
  returnsByProducts: Tab<ReturnsProducts>;
  topSales: Tab<TopSales>;
  avgReceipt: Tab<AvgReceipt[]>;
};

export type Reports = {
  index: number;
  date: DateRange;
  tabs: Tabs;
};

export enum TAB_TYPES {
  SALES_GROUPS = 'salesGroups',
  SALES_PRODUCTS = 'salesProducts',
  SALES_MONTH = 'salesMonth',
  RETURNS_PRODUCTS = 'returnsByProducts',
  TOP_SALES = 'topSales',
  AVG_RECEIPT = 'avgReceipt',
}

export enum REPORTS_ACTION_TYPES {
  SET_DATE = 'REPORTS_ACTION/SET_DATE',
  SET_LOADING = 'REPORTS_ACTION/SET_LOADING',
  SET_REFRESHING = 'REPORTS_ACTION/SET_REFRESHING',
  SET_REDUCE = 'REPORTS_ACTION/SET_REDUCE',
  SET_SALES_GROUPS = 'REPORTS_ACTION/SET_SALES_GROUPS',
  SET_SALES_PRODUCTS = 'REPORTS_ACTION/SET_SALES_PRODUCTS',
  SET_SALES_MONTH = 'REPORTS_ACTION/SET_SALES_MONTH',
  SET_RETURNS_PRODUCTS = 'REPORTS_ACTION/SET_RETURNS_PRODUCTS',
  SET_TOP_SALES = 'REPORTS_ACTION/SET_TOP_SALES',
  SET_AVG_RECEIPT = 'REPORTS_ACTION/SET_AVG_RECEIPT',
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

export type SetReduceAction = {
  type: string;
  payload: boolean;
  tab: TAB_TYPES;
};

export type SetSalesGroupsAction = {
  type: string;
  payload: SalesGroups;
};

export type SetSalesProductsAction = {
  type: string;
  payload: SalesProducts;
};

export type SetSalesMonthAction = {
  type: string;
  payload: SalesMonth;
};

export type SetReturnsProductsAction = {
  type: string;
  loadMore: boolean;
  payload: ReturnsProducts;
};

export type SetTopSalesAction = {
  type: string;
  payload: TopSales;
};

export type SetAvgReceiptAction = {
  type: string;
  payload: AvgReceipt[];
};

export type ReportsActions =
  | SetDateAction
  | SetLoadingAction
  | SetRefreshingAction
  | SetReduceAction
  | SetSalesGroupsAction
  | SetSalesProductsAction
  | SetSalesMonthAction
  | SetReturnsProductsAction
  | SetTopSalesAction
  | SetAvgReceiptAction;
