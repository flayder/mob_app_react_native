import {Fetch, FetchActions, FETCH_ACTION_TYPES} from '../types/fetch.types';

export const initialState: Fetch = {appLoading: false};

export const fetch = (
  state: Fetch = initialState,
  action: FetchActions,
): Fetch => {
  switch (action.type) {
    case FETCH_ACTION_TYPES.SET_APP_LOADING:
      return {...state, appLoading: action.payload};
    default:
      return state;
  }
};
