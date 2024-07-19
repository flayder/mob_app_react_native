import {getDayRange} from '../../../utils';
import {AvgReceipt, ReturnsProducts, TopSales} from '../../../utils/api.types';
import {
  Reports,
  ReportsActions,
  REPORTS_ACTION_TYPES,
  SetAvgReceiptAction,
  SetLoadingAction,
  SetReduceAction,
  SetRefreshingAction,
  SetReturnsProductsAction,
  SetSalesGroupsAction,
  SetSalesMonthAction,
  SetSalesProductsAction,
  SetTopSalesAction,
  Tab,
  Tabs,
} from '../../types/private/reports.types';

const salesObject = {
  loading: true,
  refreshing: false,
  reduce: false,
  data: {
    head: {cnt: 0, summ: 0, income: 0},
    details: [],
  },
};

const initialReturns: Tab<ReturnsProducts> = {
  reduce: false,
  loading: true,
  refreshing: false,
  data: {
    currentPage: 0,
    hasNext: false,
    hasPrevious: false,
    totalPages: 0,
    head: {cnt: 0, summ: 0},
    details: [],
  },
};

const initialTopSales: Tab<TopSales> = {
  reduce: false,
  loading: true,
  refreshing: false,
  data: {
    currentPage: 0,
    hasNext: false,
    hasPrevious: false,
    totalPages: 0,
    head: {cnt: 0, summ: 0},
    details: [],
  },
};

const initialAvgReceipt: Tab<AvgReceipt[]> = {
  reduce: false,
  loading: true,
  refreshing: false,
  data: [],
};

const initialTabs: Tabs = {
  salesGroups: salesObject,
  salesProducts: salesObject,
  salesMonth: salesObject,
  returnsByProducts: initialReturns,
  topSales: initialTopSales,
  avgReceipt: initialAvgReceipt,
};

export const initialState: Reports = {
  index: 0,
  date: getDayRange(),
  tabs: initialTabs,
};

export const reports = (
  state: Reports = initialState,
  action: ReportsActions,
): Reports => {
  switch (action.type) {
    case REPORTS_ACTION_TYPES.SET_DATE:
      return {...state, ...action};
    case REPORTS_ACTION_TYPES.SET_LOADING:
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
    case REPORTS_ACTION_TYPES.SET_REFRESHING:
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
    case REPORTS_ACTION_TYPES.SET_REDUCE:
      const reduceAction = action as SetReduceAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          [reduceAction.tab]: {
            ...state.tabs[reduceAction.tab],
            reduce: reduceAction.payload,
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_GROUPS:
      const groupsAction = action as SetSalesGroupsAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesGroups: {
            ...state.tabs.salesGroups,
            data: {
              ...groupsAction.payload,
              details: groupsAction.payload.details.sort((a, b) =>
                state.tabs.salesGroups.reduce
                  ? a.summ - b.summ
                  : b.summ - a.summ,
              ),
            },
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_PRODUCTS:
      const productsAction = action as SetSalesProductsAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesProducts: {
            ...state.tabs.salesProducts,
            data: {
              ...productsAction.payload,
              details: productsAction.payload.details.sort((a, b) =>
                state.tabs.salesProducts.reduce
                  ? a.summ - b.summ
                  : b.summ - a.summ,
              ),
            },
          },
        },
      };
    case REPORTS_ACTION_TYPES.SET_SALES_MONTH:
      const monthAction = action as SetSalesMonthAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          salesMonth: {
            ...state.tabs.salesMonth,
            data: {
              ...monthAction.payload,
              details: monthAction.payload.details.sort((a, b) =>
                state.tabs.salesMonth.reduce
                  ? a.summ - b.summ
                  : b.summ - a.summ,
              ),
            },
          },
        },
      };

    case REPORTS_ACTION_TYPES.SET_RETURNS_PRODUCTS:
      const returnsAction = action as SetReturnsProductsAction;
      if (returnsAction.loadMore) {
        return {
          ...state,
          tabs: {
            ...state.tabs,
            returnsByProducts: {
              ...state.tabs.returnsByProducts,
              data: {
                ...returnsAction.payload,
                details: [
                  ...state.tabs.returnsByProducts.data.details,
                  ...returnsAction.payload.details,
                ],
              },
            },
          },
        };
      } else
        return {
          ...state,
          tabs: {
            ...state.tabs,
            returnsByProducts: {
              ...state.tabs.returnsByProducts,
              data: returnsAction.payload,
            },
          },
        };
    case REPORTS_ACTION_TYPES.SET_TOP_SALES:
      const topAction = action as SetTopSalesAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          topSales: {...state.tabs.topSales, data: topAction.payload},
        },
      };
    case REPORTS_ACTION_TYPES.SET_AVG_RECEIPT:
      const avgAction = action as SetAvgReceiptAction;
      return {
        ...state,
        tabs: {
          ...state.tabs,
          avgReceipt: {
            ...state.tabs.avgReceipt,
            data: avgAction.payload.sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return state.tabs.avgReceipt.reduce
                ? dateA - dateB
                : dateB - dateA;
            }),
          },
        },
      };
    default:
      return state;
  }
};
