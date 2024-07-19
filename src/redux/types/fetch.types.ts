type AppLoading = boolean;

export type Fetch = {
  appLoading: AppLoading;
};

export enum FETCH_ACTION_TYPES {
  SET_APP_LOADING = 'FETCH_ACTION/APP_LOADING',
}

export type SetAppLoadingAction = {
  type: string;
  payload: AppLoading;
};

export type FetchActions = SetAppLoadingAction;
