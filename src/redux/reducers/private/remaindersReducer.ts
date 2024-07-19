import {Remainders as TRemainders} from '../../../utils/api.types';
import {
  Remainders,
  RemaindersActions,
  REMAINDERS_ACTION_TYPES,
  SetDescendingAction,
  SetLoadingAction,
  SetRefreshingAction,
  SetRemaindersAction,
} from '../../types/private/remainders.types';

const initialData: TRemainders = {
  currentPage: 0,
  hasNext: false,
  hasPrevious: false,
  totalPages: 0,
  details: [],
};

export const initialState: Remainders = {
  loading: true,
  refreshing: false,
  descending: true,
  data: initialData,
};

export const remainders = (
  state: Remainders = initialState,
  action: RemaindersActions,
): Remainders => {
  switch (action.type) {
    case REMAINDERS_ACTION_TYPES.SET_LOADING:
      const loadingAction = action as SetLoadingAction;
      return {...state, loading: loadingAction.payload};
    case REMAINDERS_ACTION_TYPES.SET_REFRESHING:
      const refreshingAction = action as SetRefreshingAction;
      return {...state, refreshing: refreshingAction.payload};
    case REMAINDERS_ACTION_TYPES.SET_DESCENDING:
      const descendingAction = action as SetDescendingAction;
      return {...state, descending: descendingAction.payload};
    case REMAINDERS_ACTION_TYPES.SET_REMAINDERS:
      const remaindersAction = action as SetRemaindersAction;
      if (remaindersAction.loadMore) {
        return {
          ...state,
          data: {
            ...remaindersAction.payload,
            details: [
              ...state.data.details,
              ...remaindersAction.payload.details,
            ],
          },
        };
      } else return {...state, data: remaindersAction.payload};
    case REMAINDERS_ACTION_TYPES.CLEAR_REMAINDERS:
      return initialState;
    default:
      return state;
  }
};
