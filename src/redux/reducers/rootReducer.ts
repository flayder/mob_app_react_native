import {AnyAction, combineReducers} from 'redux';

import {auth, initialState as authInitialState} from './authReducer';
import {Auth} from '../types/auth.types';

import {fetch, initialState as fetchInitialState} from './fetchReducer';
import {Fetch} from '../types/fetch.types';

import {main, initialState as mainInitialState} from './private/mainReducer';
import {Main} from '../types/private/main.types';

import {
  profile,
  initialState as profileInitialState,
} from './private/profileReducer';
import {Profile} from '../types/private/profile.tpyes';

import {
  friends,
  initialState as friendsInitialState,
} from './private/friendsReducer';
import {Friends} from '../types/private/friends.types';

import {
  remainders,
  initialState as remaindersInitialState,
} from './private/remaindersReducer';
import {Remainders} from '../types/private/remainders.types';

import {
  reports,
  initialState as reportsInitialState,
} from './private/reportsReducer';
import {Reports} from '../types/private/reports.types';

import {trade, initialState as tradeInitialState} from './private/tradeReducer';
import {Trade} from '../types/private/trade.types';

import {
  conReport,
  initialState as conReportInitialState,
} from './private/conReportReducer';
import {ConReport} from '../types/private/conReport.types';

type RootReducer = {
  auth: Auth;
  fetch: Fetch;
  main: Main;
  profile: Profile;
  friends: Friends;
  remainders: Remainders;
  reports: Reports;
  trade: Trade;
  conReport: ConReport;
};

const initialRootState: RootReducer = {
  auth: authInitialState,
  fetch: fetchInitialState,
  main: mainInitialState,
  profile: profileInitialState,
  friends: friendsInitialState,
  remainders: remaindersInitialState,
  reports: reportsInitialState,
  trade: tradeInitialState,
  conReport: conReportInitialState,
};

const appReducer = combineReducers<RootReducer>({
  auth,
  fetch,
  main,
  profile,
  friends,
  remainders,
  reports,
  trade,
  conReport,
});

const rootReducer = (state: RootReducer, action: AnyAction) => {
  if (action.type === 'AUTH_ACTION/USER_LOGOUT')
    return appReducer(initialRootState, action);
  return appReducer(state, action);
};

export default rootReducer;
