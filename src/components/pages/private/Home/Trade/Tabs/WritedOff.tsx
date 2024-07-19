import {RouteProp, useFocusEffect} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Icon,
  Layout,
  List,
  MenuItem,
  OverflowMenu,
  Text,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getWritedOff,
  setLoading,
} from '../../../../../../redux/actions/private/tradeActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/trade.types';
import {addSpaces, convertDate} from '../../../../../../utils';
import {SalesDetail} from '../../../../../../utils/api.types';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
  TradeTopTabNavigator,
} from '../../../../../../utils/navigation.types';
import Preloader from '../../../../../loaders/Preloader';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

const Edit = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="edit-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  route: RouteProp<TradeTopTabNavigator, 'WritedOff'>;
};

const WritedOff: React.FC<Props> = ({navigation, route}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.trade.tabs.writedOff.loading);
  const refreshing = useAppSelector(
    state => state.trade.tabs.writedOff.refreshing,
  );
  const {sales, details} = useAppSelector(
    state => state.trade.tabs.writedOff.data,
  );
  const date = useAppSelector(state => state.trade.date);
  const index = useAppSelector(state => state.trade.index);
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const loadWritedOff = useCallback(
    (refreshing: boolean) => {
      if (currentGTochkaId)
        dispatch(
          getWritedOff(
            refreshing,
            currentGTochkaId,
            date.datebegin,
            date.dateend,
          ),
        );
    },
    [currentGTochkaId, date],
  );

  useEffect(() => {
    if (route.params.reload) {
      loadWritedOff(false);
      navigation.setParams({reload: false});
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaId) {
        loadWritedOff(false);
      }
      return () => dispatch(setLoading(true, TAB_TYPES.WRITED_OFF));
    }, [currentGTochkaId, date]),
  );

  const handleRefresh = () => loadWritedOff(true);

  const navToNewTrade = () =>
    currentGTochkaId &&
    navigation.navigate('TradeOptions', {
      type: TradeOptionsTypes.WRITED_OFF,
      sessionType: TAB_TYPES.WRITED_OFF,
      edit: true,
      newTrade: true,
      typeId: currentGTochkaId,
    });

  const ListHeaderComponent = useCallback(() => {
    return (
      <Layout style={styles.headerWrap}>
        <View style={styles.item}>
          <Text appearance="hint">Всего cписаний:</Text>
          <Text status="primary">{sales.cnt}</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">На сумму:</Text>
          <Text status="primary">{addSpaces(sales.summ)}</Text>
        </View>
        <View style={[styles.item, styles.margin]}>
          <Text appearance="hint">Прибыль:</Text>
          <Text status="primary">{addSpaces(sales.income)}</Text>
        </View>
      </Layout>
    );
  }, [sales]);

  if (loading) return <Preloader />;

  return (
    <Layout style={styles.wrap}>
      <List
        ListHeaderComponent={ListHeaderComponent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        style={{backgroundColor: theme['background-color-1']}}
        data={details}
        renderItem={props => (
          <ListItem
            {...props}
            dateIndex={index}
            theme={theme}
            navigation={navigation}
            reload={() => loadWritedOff(false)}
          />
        )}
      />
    </Layout>
  );
};

interface ListItemProps extends ListRenderItemInfo<SalesDetail> {
  dateIndex: number;
  theme: Record<string, string>;
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
  reload: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  dateIndex,
  theme,
  navigation,
  reload,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => {
    setVisible(true);
    if (Platform.OS === 'android') Vibration.vibrate(100);
    else
      ReactNativeHapticFeedback.trigger('effectTick', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
  };

  const navToDelete = () => {
    setVisible(false);
    navigation.navigate('DeleteTradeModal', {
      refresh: reload,
      deleteId: item.zakazId,
      type: TradeOptionsTypes.SALE,
      sessionType: TAB_TYPES.WRITED_OFF,
    });
  };

  const navToEdit = () => {
    setVisible(false);
    navigation.navigate('TradeOptions', {
      edit: true,
      newTrade: false,
      type: TradeOptionsTypes.RECEIPT,
      sessionType: TAB_TYPES.WRITED_OFF,
      recId: item.recId,
      zakazId: item.zakazId,
      typeId: item.zakazId,
    });
  };

  const navToReceipt = () => {
    setVisible(false);
    navigation.navigate('TradeOptions', {
      edit: false,
      newTrade: false,
      type: TradeOptionsTypes.RECEIPT,
      sessionType: TAB_TYPES.WRITED_OFF,
      recId: item.recId,
      zakazId: item.zakazId,
      typeId: item.zakazId,
    });
  };

  const renderDate = useCallback(() => {
    const dateArray = item.date.split('T');
    if (dateIndex === 0) return `в ${dateArray[1]}`;
    else return `от ${convertDate(dateArray[0])}`;
  }, [item]);

  const RenderAnchor = () => (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme['color-basic-500'],
        flexDirection: 'row',
      }}>
      <View
        style={{
          padding: 5,
          flex: 3,
          borderRightWidth: 1,
          borderColor: theme['color-basic-500'],
        }}>
        <Text category="p2" status="primary">{`Чек № ${
          item.recId
        } ${renderDate()}`}</Text>
        {item.products.slice(0, 3).map((item, index) => (
          <Text category="label" key={index} numberOfLines={1}>
            {item.name}
          </Text>
        ))}
        {item.products.length > 3 && (
          <Text category="label" appearance="hint" style={{marginTop: 5}}>
            ... ещё позиций - {item.products.length - 3}шт.
          </Text>
        )}
      </View>
      <View
        style={{
          padding: 5,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item.products.slice(0, 3).map((item, index) => (
          <Text category="label" key={index}>
            {item.price} x {item.amount?.toFixed(2)}
          </Text>
        ))}
        <Text category="p2" status="primary">
          ={' '}
          {item.products.reduce(
            (acc, item) => acc + item.price * item.amount,
            0,
          )}
        </Text>
      </View>
    </View>
  );

  return (
    <TouchableHighlight
      underlayColor={theme['color-basic-transparent-active']}
      onPress={navToReceipt}
      onLongPress={toggle}
      key={index}
      style={{marginHorizontal: 16, marginVertical: 8}}>
      <OverflowMenu
        anchor={RenderAnchor}
        visible={false} // set 'visible' when time comes true
        onBackdropPress={() => setVisible(false)}
        backdropStyle={{
          backgroundColor: theme['color-basic-transparent-focus'],
        }}
        placement="top">
        <MenuItem title="Изменить" accessoryLeft={Edit} onPress={navToEdit} />
        <MenuItem title="Удалить" accessoryLeft={Trash} onPress={navToDelete} />
      </OverflowMenu>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  button: {marginHorizontal: 16, marginVertical: 20},
  headerWrap: {
    padding: 16,
  },
  item: {flexDirection: 'row', justifyContent: 'space-between'},
  margin: {marginTop: 6},
});

export default WritedOff;
