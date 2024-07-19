import {Friend} from '../../../utils/api.types';
import {
  Friends,
  FriendsActions,
  FRIENDS_ACTION_TYPES,
  GetFriendsAction,
  SetLoadingAction,
  SetRefreshingAction,
} from '../../types/private/friends.types';

export const initialState: Friends = {
  loading: true,
  refreshing: false,
  friends: [],
};

export const friends = (
  state: Friends = initialState,
  action: FriendsActions,
): Friends => {
  switch (action.type) {
    case FRIENDS_ACTION_TYPES.SET_LOADING:
      return {...state, loading: (action as SetLoadingAction).payload};
    case FRIENDS_ACTION_TYPES.SET_REFRESHING:
      return {...state, refreshing: (action as SetRefreshingAction).payload};
    case FRIENDS_ACTION_TYPES.GET_FRIENDS:
      const friendsAction = action as GetFriendsAction;
      const friends = friendsAction.payload.reduce<Friend[]>((prev, curr) => {
        const index = prev.findIndex(friend => friend.login === curr.login);
        if (index !== -1)
          prev[index].nameGTochka =
            prev[index].nameGTochka + ', ' + curr.nameGTochka;
        else prev.push(curr);
        return prev.map(pr => ({
          ...pr,
          nameGTochka:
            pr.nameGTochka.split(',').length === friendsAction.tradePointsLength
              ? 'Все торговые точки'
              : pr.nameGTochka,
        }));
      }, []);
      return {...state, friends};
    default:
      return state;
  }
};
