import {
  ConReport,
  ConReportActions,
  CON_REPORT_ACTION_TYPES,
  SetConReportAction,
  SetLoadingAction,
  SetRefreshingAction,
} from '../../types/private/conReport.types';

export const initialState: ConReport = {
  loading: true,
  refreshing: false,
  conReport: {
    sales: {
      cnt: 0,
      summ: 0,
      products: 0,
      avg: 0,
      income: 0,
    },
    payed: {
      cntPayed: 0,
      cach: 0,
      nonCach: 0,
      bonus: 0,
    },
    ret: {
      cnt: 0,
      summ: 0,
      products: 0,
    },
    kassa: {
      inSumm: 0,
      outSumm: 0,
    },
  },
};

export const conReport = (
  state: ConReport = initialState,
  action: ConReportActions,
): ConReport => {
  switch (action.type) {
    case CON_REPORT_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case CON_REPORT_ACTION_TYPES.SET_REFRESHING:
      return {...state, refreshing: (action as SetRefreshingAction).payload};
    case CON_REPORT_ACTION_TYPES.SET_CON_REPORT:
      return {...state, conReport: (action as SetConReportAction).payload};
    default:
      return state;
  }
};
