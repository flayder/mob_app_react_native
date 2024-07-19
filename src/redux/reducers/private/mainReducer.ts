import {MainData, MainDataObject, TradePoint} from '../../../utils/api.types';
import {
  Main,
  MainActions,
  MAIN_ACTION_TYPES,
  SetLoadingAction,
  SetMainDataAction,
  SetMainGraphAction,
  SetRefreshingAction,
  SetTradePointAction,
  SetTradePointsAction,
} from '../../types/private/main.types';

const initialTradePoint: TradePoint = {
  gTochkaId: 0,
  usersId: 0,
  recId: 0,
  name: '',
};

const mainDataObject: MainDataObject = {
  avg: 0,
  cnt: 0,
  income: 0,
  summ: 0,
};

const initialMainData: MainData = {
  summ: 0,
  day: mainDataObject,
  week: mainDataObject,
  month: mainDataObject,
};

export const initialState: Main = {
  loading: false,
  refreshing: false,
  tradePoints: [],
  tradePoint: initialTradePoint,
  mainData: initialMainData,
  mainGraph: [],
};

export const main = (state: Main = initialState, action: MainActions): Main => {
  switch (action.type) {
    case MAIN_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case MAIN_ACTION_TYPES.SET_REFRESHING:
      return {...state, refreshing: (action as SetRefreshingAction).payload};
    case MAIN_ACTION_TYPES.SET_TRADE_POINTS:
      return {
        ...state,
        tradePoints: (action as SetTradePointsAction).payload.sort(
          (a, b) => a.recId - b.recId,
        ),
      };
    case MAIN_ACTION_TYPES.SET_TRADE_POINT:
      const tradeAction = action as SetTradePointAction;
      return {...state, tradePoint: tradeAction.payload};
    case MAIN_ACTION_TYPES.SET_MAIN_DATA:
      return {...state, mainData: (action as SetMainDataAction).payload};
    case MAIN_ACTION_TYPES.SET_MAIN_GRAPH:
      return {...state, mainGraph: (action as SetMainGraphAction).payload};
    default:
      return state;
  }
};
