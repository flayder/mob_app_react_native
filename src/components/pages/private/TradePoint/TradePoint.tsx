import React, {Fragment} from 'react';
import {Divider, Icon, List, ListItem} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';

import {useAppDispatch, useAppSelector} from '../../../../redux';
import {ImageProps, ListRenderItemInfo, ViewProps} from 'react-native';
import {TradePoint as TTradePoint} from '../../../../utils/api.types';
import {
  getTradePoints,
  setTradePoint,
} from '../../../../redux/actions/private/mainActions';

const CartIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="shopping-cart-outline" />
);

const CheckIcon = (props?: Partial<ViewProps>) => (
  <Icon {...props} name="checkmark-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'TradePoint'>;
};

const TradePoint: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const currentTradePoint = useAppSelector(state => state.main.tradePoint);
  const tradePoints = useAppSelector(state => state.main.tradePoints);
  const loading = useAppSelector(state => state.main.loading);

  const setCurentTradePoint = (tradePoint: TTradePoint) => {
    dispatch(setTradePoint(tradePoint));
    navigation.goBack();
  };

  const loadTradePoints = () => dispatch(getTradePoints(true));

  const keyExtractor = (item: TTradePoint) => item.gTochkaId.toString();

  return (
    <List
      refreshing={loading}
      onRefresh={loadTradePoints}
      data={tradePoints}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Divider}
      renderItem={props => (
        <TradeListItem
          {...props}
          gTochkaId={currentTradePoint?.gTochkaId || 0}
          setCurentTradePoint={setCurentTradePoint}
        />
      )}
    />
  );
};

interface TradeListProps extends ListRenderItemInfo<TTradePoint> {
  gTochkaId: number;
  setCurentTradePoint: (tradePoint: TTradePoint) => void;
}

const TradeListItem: React.FC<TradeListProps> = ({
  item,
  index,
  gTochkaId,
  setCurentTradePoint,
}) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      accessoryLeft={CartIcon}
      accessoryRight={gTochkaId === item.gTochkaId ? CheckIcon : <Fragment />}
      onPress={() => setCurentTradePoint(item)}
    />
  );
};

export default TradePoint;
