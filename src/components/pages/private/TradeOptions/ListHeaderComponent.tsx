import {RouteProp, useRoute} from '@react-navigation/core';
import {
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {setTradeSession} from '../../../../redux/actions/private/tradeActions';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../utils/navigation.types';
import {convertDate} from '../../../../utils';

const ListHeaderComponent: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const tradeSession = useAppSelector(state => state.trade.tradeSession);

  const styles = useStyleSheet(Styles);
  const route = useRoute<RouteProp<PrivateStackNavigator, 'TradeOptions'>>();

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const [discount, setDiscount] = useState<string>(
    tradeSession.discount.toFixed(2),
  );

  useEffect(() => {
    if (tradeSession.date.length) setDate(new Date(tradeSession.date));
  }, [tradeSession.date]);

  const handleBlur = () => setDiscount(dis => Number(dis).toFixed(2));

  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleConfirm = (date: Date) => {
    setOpen(false);
    dispatch(setTradeSession({...tradeSession, date: date.toString()}));
    setDate(date);
  };

  useEffect(() => {
    setDiscount(tradeSession.discount.toString());
  }, [tradeSession.discount]);

  const handleChangeDiscount = (text: string) => {
    dispatch(setTradeSession({...tradeSession, discount: Number(text)}));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap} level="2">
        <View style={styles.itemWrap}>
          <Text appearance="hint">Дата:</Text>
          <TouchableOpacity onPress={handleOpen} disabled={!route.params.edit}>
            <Text status="primary" style={{padding: 10}}>
              {convertDate(date)}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            textColor={theme['color-primary-500']}
            title="Выберете дату"
            confirmText="Ок"
            cancelText="Отмена"
          />
        </View>
        {route.params.type === TradeOptionsTypes.SALE && (
          <View style={styles.itemWrap}>
            <Text appearance="hint">Скидка в %</Text>
            <Input
              value={discount}
              onChangeText={handleChangeDiscount}
              onBlur={handleBlur}
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              selectTextOnFocus
              returnKeyLabel="Готово"
              returnKeyType="done"
              keyboardType="number-pad"
              textStyle={styles.percentage}
            />
          </View>
        )}
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {padding: 16, flexDirection: 'row'},
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'color-primary-500',
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  datepicker: {borderWidth: 0, backgroundColor: 'transparent'},
  percentage: {textAlign: 'center', color: 'color-primary-500'},
});

export default ListHeaderComponent;
