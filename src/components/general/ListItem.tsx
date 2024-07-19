import {Icon, MenuItem, OverflowMenu, Text} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  TouchableHighlight,
  Vibration,
  View,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useAppDispatch, useAppSelector} from '../../redux';
import {setTradeSession} from '../../redux/actions/private/tradeActions';
import {TradeSessionDetail} from '../../redux/types/private/trade.types';

const Trash = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="trash-2-outline" />
);

interface Props extends ListRenderItemInfo<TradeSessionDetail> {
  theme: Record<string, string>;
  disabled?: boolean;
  modal?: boolean;
  onPress?: (detail: TradeSessionDetail) => void;
}

const ListItem: React.FC<Props> = ({
  item,
  index,
  theme,
  disabled,
  modal,
  onPress,
}) => {
  const dispatch = useAppDispatch();
  const tradeSession = useAppSelector(state => state.trade.tradeSession);
  const [visibale, setVisibale] = useState<boolean>(false);

  const toggle = () => {
    setVisibale(true);
    if (Platform.OS === 'android') Vibration.vibrate(100);
    else
      ReactNativeHapticFeedback.trigger('effectTick', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
  };

  const handleDelete = () => {
    dispatch(
      setTradeSession({
        ...tradeSession,
        details: tradeSession.details.filter(
          data => data.gProductId !== item.gProductId,
        ),
      }),
    );
    setVisibale(false);
  };

  const RenderAnchor = useCallback(() => {
    return (
      <TouchableHighlight
        disabled={disabled}
        onPress={() => onPress && onPress(item)}
        onLongPress={toggle}
        key={index}
        style={styles.wrap}
        underlayColor={theme['color-basic-transparent-200']}>
        <View style={[styles.item]}>
          <Text
            numberOfLines={1}
            status="primary"
            style={[styles.product, {borderWidth: 1, borderColor: '#D2D8E1'}]}>
            {item.name}
          </Text>
          <Text
            status="primary"
            style={[
              styles.data,
              {
                flex: 1,
                borderColor: '#D2D8E1',
                borderWidth: 1,
              },
            ]}>
            {item.amount}
          </Text>
          <Text
            status="primary"
            style={[
              styles.data,
              {
                flex: 1.2,
                borderColor: '#D2D8E1',
                borderWidth: 1,
              },
            ]}>
            {item.cost?.toFixed(2)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }, [disabled, onPress]);

  return (
    <OverflowMenu
      anchor={RenderAnchor}
      onBackdropPress={() => setVisibale(false)}
      backdropStyle={{backgroundColor: theme['color-basic-transparent-focus']}}
      visible={modal && visibale}
      placement="bottom end">
      <MenuItem title="Удалить" accessoryLeft={Trash} onPress={handleDelete} />
    </OverflowMenu>
  );
};

const styles = StyleSheet.create({
  wrap: {marginVertical: 5, marginHorizontal: 16},
  item: {
    flexDirection: 'row',
  },
  product: {flex: 3, padding: 5},
  data: {
    padding: 5,
    borderLeftWidth: 1,
    textAlign: 'center',
  },
});

export default ListItem;
