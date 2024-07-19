import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {setTradeSession} from '../../../../redux/actions/private/tradeActions';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';

type Props = {
  goBack: () => void;
  handlePay: () => void;
};

const ListFooterComponent: React.FC<Props> = ({goBack, handlePay}) => {
  const {summ, payedSumm, summCash, summNoncash, summBonus, discount, details} =
    useAppSelector(state => state.trade.tradeSession);

  const route = useRoute<RouteProp<PrivateStackNavigator, 'TradeOptions'>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap} level="2">
        <View style={styles.row}>
          <Text appearance="hint">Сумма:</Text>
          <Text status="primary">
            {(
              details.reduce((acc, d) => acc + d.cost * d.amount, 0) *
              (1 - discount / 100)
            ).toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Оплачено:</Text>
          <Text status="primary">{payedSumm?.toFixed(2)}</Text>
        </View>

        <View style={[styles.row, styles.margin]}>
          <Text appearance="hint">Наличными:</Text>
          <Text status="primary">{summCash?.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Безналичными:</Text>
          <Text status="primary">{summNoncash?.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text appearance="hint">Бонусами:</Text>
          <Text status="primary">{summBonus?.toFixed(2)}</Text>
        </View>

        {route.params.edit && (
          <View style={styles.buttonsWrap}>
            <Button
              onPress={goBack}
              appearance="outline"
              style={{flex: 1, marginRight: 5}}>
              Отмена
            </Button>
            <Button style={{flex: 1, marginLeft: 5}} onPress={handlePay}>
              Сохранить
            </Button>
          </View>
        )}
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {padding: 16},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  margin: {marginTop: 16},
  buttonsWrap: {flexDirection: 'row', marginTop: 24},
});

export default ListFooterComponent;
