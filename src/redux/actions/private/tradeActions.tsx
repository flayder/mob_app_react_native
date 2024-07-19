import {ThunkAction} from 'redux-thunk';
import {DateRange, SetDateAction} from '../../../utils';
import {Sales, Sklad} from '../../../utils/api.types';
import api from '../../../utils/api/api';
import {SellBody} from '../../../utils/api/routes/trade';
import {RootState} from '../../store';
import {
  SetIncomeAction,
  SetLoadingAction,
  SetRefreshingAction,
  SetReturnAction,
  SetSalesAction,
  SetTradeSessionAction,
  SetWritedOffAction,
  TAB_TYPES,
  TradeActions,
  TradeSession,
  TradeSessionDetail,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';
import {handleError} from '../fetchActions';

export const setDate = (index: number, date: DateRange): SetDateAction => ({
  type: TRADE_ACTION_TYPES.SET_DATE,
  index,
  date,
});

export const setLoading = (
  loading: boolean,
  tab: TAB_TYPES,
): SetLoadingAction => ({
  type: TRADE_ACTION_TYPES.SET_LOADING,
  payload: loading,
  tab,
});

export const setRefreshing = (
  loading: boolean,
  tab: TAB_TYPES,
): SetRefreshingAction => ({
  type: TRADE_ACTION_TYPES.SET_REFRESHING,
  payload: loading,
  tab,
});

export const setTradeSession = (
  tradeSession: TradeSession,
): SetTradeSessionAction => ({
  type: TRADE_ACTION_TYPES.SET_TRADE_SESSION,
  payload: tradeSession,
});

export const setSales = (sales: Sales): SetSalesAction => ({
  type: TRADE_ACTION_TYPES.SET_SALES,
  payload: sales,
});

export const setIncome = (
  loadMore: boolean,
  income: Sklad,
): SetIncomeAction => ({
  type: TRADE_ACTION_TYPES.SET_INCOME,
  loadMore,
  payload: income,
});

export const setReturns = (
  loadMore: boolean,
  returns: Sklad,
): SetReturnAction => ({
  type: TRADE_ACTION_TYPES.SET_RETURN,
  loadMore,
  payload: returns,
});

export const setWritedOff = (writedOff: Sales): SetWritedOffAction => ({
  type: TRADE_ACTION_TYPES.SET_WRITED_OFF,
  payload: writedOff,
});

export const getSales =
  (
    refreshing: boolean,
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<any, RootState, unknown, TradeActions> =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true, TAB_TYPES.SALES));
    else dispatch(setLoading(true, TAB_TYPES.SALES));
    api.trade
      .getSales(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setSales(res.data));
        dispatch(setRefreshing(false, TAB_TYPES.SALES));
        dispatch(setLoading(false, TAB_TYPES.SALES));
      })
      .catch(e => {
        dispatch(setRefreshing(false, TAB_TYPES.SALES));
        dispatch(setLoading(false, TAB_TYPES.SALES));
        dispatch(handleError(e.response));
      });
  };

export const getIncome =
  (
    refreshing: boolean,
    loadMore: boolean,
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ): ThunkAction<any, RootState, unknown, TradeActions> =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true, TAB_TYPES.INCOME));
    else dispatch(setLoading(true, TAB_TYPES.INCOME));
    api.trade
      .getIncome(gtochkaid, datebegin, dateend, page)
      .then(res => {
        dispatch(setIncome(loadMore, res.data));
        dispatch(setLoading(false, TAB_TYPES.INCOME));
        dispatch(setRefreshing(false, TAB_TYPES.INCOME));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.INCOME));
        dispatch(setRefreshing(false, TAB_TYPES.INCOME));
        dispatch(handleError(e.response));
      });
  };

export const getReturns =
  (
    refreshing: boolean,
    loadMore: boolean,
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ): ThunkAction<any, RootState, unknown, TradeActions> =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true, TAB_TYPES.RETURN));
    else dispatch(setLoading(true, TAB_TYPES.RETURN));
    api.trade
      .getReturn(gtochkaid, datebegin, dateend, page)
      .then(res => {
        dispatch(setReturns(loadMore, res.data));
        dispatch(setLoading(false, TAB_TYPES.RETURN));
        dispatch(setRefreshing(false, TAB_TYPES.RETURN));
      })
      .catch(e => {
        dispatch(setLoading(false, TAB_TYPES.RETURN));
        dispatch(setRefreshing(false, TAB_TYPES.RETURN));
        dispatch(handleError(e.response));
      });
  };

export const getWritedOff =
  (
    refreshing: boolean,
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
  ): ThunkAction<any, RootState, unknown, TradeActions> =>
  dispatch => {
    if (refreshing) dispatch(setRefreshing(true, TAB_TYPES.WRITED_OFF));
    else dispatch(setLoading(true, TAB_TYPES.WRITED_OFF));
    api.trade
      .getWritedOff(gtochkaid, datebegin, dateend)
      .then(res => {
        dispatch(setWritedOff(res.data));
        dispatch(setRefreshing(false, TAB_TYPES.WRITED_OFF));
        dispatch(setLoading(false, TAB_TYPES.WRITED_OFF));
      })
      .catch(e => {
        dispatch(setRefreshing(false, TAB_TYPES.WRITED_OFF));
        dispatch(setLoading(false, TAB_TYPES.WRITED_OFF));
        dispatch(handleError(e.response));
      });
  };

export const deleteSale =
  (
    deleteId: number,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true, TAB_TYPES.SALES));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteSale([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false, TAB_TYPES.SALES);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false, TAB_TYPES.SALES));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };

export const getZakazInfo =
  (
    zakazid: number,
    edit: boolean,
    newTrade: boolean,
    type: TAB_TYPES,
    typeId: number,
  ): ThunkAction<Promise<void>, RootState, any, TradeActions> =>
  async dispatch => {
    return await api.trade
      .getZakazInfo(zakazid)
      .then(res => {
        dispatch(
          setTradeSession({
            discount: 0,
            typeId,
            edit,
            newTrade,
            type,
            ...res.data.head,
            details: res.data.details.map<TradeSessionDetail>(det => ({
              ...det,
              cost: det.price,
            })),
          }),
        );
      })
      .catch(e => {
        dispatch(handleError(e.response));
      });
  };

export const deleteReceipt =
  (
    deleteId: number,
    tab: TAB_TYPES,
  ): ThunkAction<Promise<string>, RootState, any, TradeActions> =>
  async dispatch => {
    dispatch(setLoading(true, tab));
    return await new Promise((resolve, reject) =>
      api.trade
        .deleteReceipt([deleteId])
        .then(res => {
          let str: string = '';
          for (let [_, value] of Object.entries(res.data)) str = value;
          setLoading(false, tab);
          resolve(str);
        })
        .catch(e => {
          dispatch(setLoading(false, tab));
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
  };

export const sell =
  (
    data: SellBody,
  ): ThunkAction<Promise<string>, RootState, unknown, TradeActions> =>
  async dispatch =>
    await new Promise((resolve, reject) =>
      api.trade
        .sell(data)
        .then(res => resolve(res.data))
        .catch(e => {
          dispatch(handleError(e.response));
          reject(e);
        }),
    );
