export type Profile = {
  loading: boolean;
};

export enum PROFILE_ACTION_TYPES {
  SET_LOADING = 'PROFILE_ACTION/SET_LOADING',
}

export type SetLoadingAction = {
  type: string;
  payload: boolean;
};

export type ProfileActions = SetLoadingAction;
