import {
  Profile,
  ProfileActions,
  PROFILE_ACTION_TYPES,
} from '../../types/private/profile.tpyes';

export const initialState: Profile = {loading: false};

export const profile = (
  state: Profile = initialState,
  action: ProfileActions,
): Profile => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.SET_LOADING:
      return {loading: action.payload};
    default:
      return state;
  }
};
