import {ConReport as TConReport} from '../../../utils/api.types';

export type ConReport = {
  loading: boolean;
  refreshing: boolean;
  conReport: TConReport;
};

export enum CON_REPORT_ACTION_TYPES {
  SET_LOADING = 'CON_REPORT_ACTION/SET_LOADING',
  SET_REFRESHING = 'CON_REPORT_ACTION/SET_REFRESHING',
  SET_CON_REPORT = 'CON_REPORT_ACTION/SET_CON_REPORT',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type SetRefreshingAction = {
  type: string;
  payload: boolean;
};

export type SetConReportAction = {
  type: string;
  payload: TConReport;
};

export type ConReportActions =
  | SetLoadingAction
  | SetRefreshingAction
  | SetConReportAction;
