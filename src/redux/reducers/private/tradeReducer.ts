import {getDayRange, SetDateAction} from '../../../utils';
import {Sales, Sklad, SkladHead} from '../../../utils/api.types';
import {
  SetIncomeAction,
  SetLoadingAction,
  SetRefreshingAction,
  SetReturnAction,
  SetSalesAction,
  SetTradeSessionAction,
  SetWritedOffAction,
  Tab,
  TAB_TYPES,
  Trade,
  TradeActions,
  TradeSession,
  TRADE_ACTION_TYPES,
} from '../../types/private/trade.types';

const initialSale: Tab<Sales> = {
  loading: true,
  refreshing: false,
  data: {
    sales: {cnt: 0, income: 0, summ: 0},
    details: [],
  },
};

const initialHead: SkladHead = {
  cntReceipt: 0,
  cntReturn: 0,
  sumReceipt: 0,
  sumReturn: 0,
};

const initialSklad: Tab<Sklad> = {
  loading: true,
  refreshing: false,
  data: {
    currentPage: 0,
    hasNext: false,
    hasPrevious: false,
    totalPages: 0,
    details: [],
    head: initialHead,
  },
};

export const initialTradeSession: TradeSession = {
  discount: 0,
  type: TAB_TYPES.SALES,
  typeId: 0,
  newTrade: false,
  edit: false,
  date: new Date().toString(),
  payedSumm: 0,
  summ: 0,
  summBonus: 0,
  summCash: 0,
  summNoncash: 0,
  details: [],
};

export const initialState: Trade = {
  index: 0,
  date: getDayRange(),
  tabs: {
    sales: initialSale,
    income: initialSklad,
    return: initialSklad,
    writedOff: initialSale,
  },
  tradeSession: initialTradeSession,
};

export const trade = (
  state: Trade = initialState,
  action: TradeActions,
): Trade => {
  switch (action.type) {
    case TRADE_ACTION_TYPES.SET_LOADING:
      const loadingAction = action as SetLoadingAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [loadingAction.tab]: {
            ...state.tabs[loadingAction.tab],
            loading: loadingAction.payload,
          },
        },
      };
    case TRADE_ACTION_TYPES.SET_REFRESHING:
      const refAction = action as SetRefreshingAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [refAction.tab]: {
            ...state.tabs[refAction.tab],
            refreshing: refAction.payload,
          },
        },
      };
    case TRADE_ACTION_TYPES.SET_DATE:
      const dateAction = action as SetDateAction;
      return {...state, ...dateAction};
    case TRADE_ACTION_TYPES.SET_SALES:
      const salesAction = action as SetSalesAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          sales: {...state.tabs.sales, data: salesAction.payload},
        },
      };
    case TRADE_ACTION_TYPES.SET_INCOME:
      const incomeAction = action as SetIncomeAction;
      if (incomeAction.loadMore)
        return {
          ...state,
          tabs: {
            ...state.tabs,
            income: {
              ...state.tabs.income,
              data: {
                ...incomeAction.payload,
                details: [
                  ...state.tabs.income.data.details,
                  ...incomeAction.payload.details,
                ],
              },
            },
          },
        };
      return {
        ...state,
        tabs: {
          ...state.tabs,
          income: {...state.tabs.income, data: incomeAction.payload},
        },
      };
    case TRADE_ACTION_TYPES.SET_RETURN:
      const returnAction = action as SetReturnAction;
      if (returnAction.loadMore)
        return {
          ...state,
          tabs: {
            ...state.tabs,
            return: {
              ...state.tabs.return,
              data: {
                ...returnAction.payload,
                details: [
                  ...state.tabs.return.data.details,
                  ...returnAction.payload.details,
                ],
              },
            },
          },
        };
      return {
        ...state,
        tabs: {
          ...state.tabs,
          return: {...state.tabs.return, data: returnAction.payload},
        },
      };
    case TRADE_ACTION_TYPES.SET_WRITED_OFF:
      const writedOffAction = action as SetWritedOffAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          writedOff: {...state.tabs.writedOff, data: writedOffAction.payload},
        },
      };
    case TRADE_ACTION_TYPES.SET_TRADE_SESSION:
      const sessionAction = action as SetTradeSessionAction;
      return {...state, tradeSession: sessionAction.payload};
    default:
      return state;
  }
};
