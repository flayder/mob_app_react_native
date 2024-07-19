import {ThunkAction} from 'redux-thunk';
import api from '../../../utils/api/api';
import {ConReport} from '../../../utils/api.types';
import {RootState} from '../../store';
import {
  ConReportActions,
  CON_REPORT_ACTION_TYPES,
  SetConReportAction,
  SetLoadingAction,
  SetRefreshingAction,
} from '../../types/private/conReport.types';
import {handleError} from '../fetchActions';

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: CON_REPORT_ACTION_TYPES.SET_LOADING,
  payload: loading,
});

const setRefreshing = (loading: boolean): SetRefreshingAction => ({
  type: CON_REPORT_ACTION_TYPES.SET_REFRESHING,
  payload: loading,
});

const setConReport = (conReport: ConReport): SetConReportAction => ({
  type: CON_REPORT_ACTION_TYPES.SET_CON_REPORT,
  payload: conReport,
});

export const getConReport =
  (
    refreshing: boolean,
    gtochkaid: number,
    datebegin: Date,
  ): ThunkAction<void, RootState, unknown, ConReportActions> =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true));
    else dispatch(setLoading(true));
    api.conReport
      .getConReport(gtochkaid, datebegin)
      .then(res => {
        dispatch(setRefreshing(false));
        dispatch(setLoading(false));
        dispatch(setConReport(res.data));
      })
      .catch(e => {
        dispatch(handleError(e.response));
        dispatch(setRefreshing(false));
        dispatch(setLoading(false));
      });
  };
