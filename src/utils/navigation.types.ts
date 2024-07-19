import {SetDate} from '.';
import {
  TAB_TYPES,
  TradeSessionDetail,
} from '../redux/types/private/trade.types';
import {User} from './api.types';

export type PublicStackNavigator = {
  Login: undefined;
  Registration: undefined;
  Forgot: undefined;
};

export enum TradeOptionsTypes {
  SALE = 'Новая продажа',
  INCOME = 'Приход',
  RETURN = 'Возврат',
  WRITED_OFF = 'Списание',
  RECEIPT = 'RECEIPT',
}

type TradeOptions = {
  type: TradeOptionsTypes;
  typeId: number;
  sessionType: TAB_TYPES;
  edit: boolean;
  newTrade: boolean;
  recId?: number;
  zakazId?: number;
  details?: TradeSessionDetail[];
};

export type PrivateStackNavigator = {
  Home: undefined;
  TradePoint: undefined;
  TradeOptions: TradeOptions;
  AddProduct: undefined;
  AddFriendModal: undefined;
  DatePickerModal: {setDate: SetDate};
  DeleteTradeModal: {
    refresh: () => void;
    deleteId: number;
    type: TradeOptionsTypes;
    sessionType: TAB_TYPES;
  };
  AddProductModal: {
    type: 'edit' | 'new';
    detail: TradeSessionDetail;
    callback: () => void;
  };
  PaymentModal: undefined;
};

export type DrawerNavigator = {
  Main: undefined;
  ConReport: undefined;
  Trade: undefined;
  Reports: undefined;
  Remainders: undefined;
  Friends: undefined;
  Profile: undefined;
};

type TradeNav = {
  reload: boolean;
};

export type TradeTopTabNavigator = {
  Sales: TradeNav;
  Incomes: TradeNav;
  Returns: TradeNav;
  WritedOff: TradeNav;
};

export type ReportsTopTabNavigator = {
  SalesByProducts: undefined;
  SalesByGroups: undefined;
  SalesByMonthes: undefined;
  ReturnsByProducts: undefined;
  TopSellingProducts: undefined;
  AvgReceipt: undefined;
};

export type ProfileStackNavigator = {
  Display: undefined;
  Edit: User;
  Delete: undefined;
};
