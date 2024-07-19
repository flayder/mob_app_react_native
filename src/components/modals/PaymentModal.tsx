import {CompositeNavigationProp, RouteProp} from '@react-navigation/core';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  StyleService,
  Text,
  Toggle,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {EvaStatus} from '@ui-kitten/components/devsupport';
import {AxiosResponse} from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useAppSelector} from '../../redux';
import {TAB_TYPES} from '../../redux/types/private/trade.types';
import {convertDate, convertDateTime} from '../../utils';
import api from '../../utils/api/api';
import {
  Body,
  GProductsReceipt,
  ReceiptBody,
  ReceiptEditBody,
  SellBody,
  SellEditBody,
} from '../../utils/api/routes/trade';
import {
  PrivateStackNavigator,
  TradeTopTabNavigator,
} from '../../utils/navigation.types';
import {show} from '../../utils/snackbar';
import Preloader from '../loaders/Preloader';

type Props = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<PrivateStackNavigator, 'PaymentModal'>,
    MaterialTopTabNavigationProp<TradeTopTabNavigator>
  >;
  route: RouteProp<PrivateStackNavigator, 'PaymentModal'>;
};

const PaymentModal: React.FC<Props> = ({navigation}) => {
  const {details, discount, type, newTrade, typeId} = useAppSelector(
    state => state.trade.tradeSession,
  );

  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();
  const [loading, setLoading] = useState<boolean>(false);

  const [method, setMethod] = useState<number>(0);
  const [bonus, setBonus] = useState<boolean>(false);

  const [summCash, setSummCash] = useState<string>('');
  const [summNocash, setSummNocash] = useState<string>('');
  const [summBonus, setSummBonus] = useState<string>('');

  useEffect(() => {
    const summ =
      details.reduce((acc, d) => acc + d.cost * d.amount, 0) *
      (1 - discount / 100);
    if (method === 0 || method === 2) {
      setSummCash(summ.toFixed(2));
      setSummNocash('');
    } else if (method === 1) {
      setSummCash('');
      setSummNocash(summ.toFixed(2));
    }
  }, [details, discount, method]);

  const handleError = (response: AxiosResponse) => {
    show({text: response.data as string, type: 'error'});
    setLoading(false);
  };

  const handleSuccess = (text: string) => {
    show({text, type: 'success'});
    setLoading(false);
  };

  const handleSave = () => {
    setLoading(true);

    const body: Body = {
      summ: Number(summCash) + Number(summNocash) + Number(summBonus),
      summCash: Number(summCash),
      summNoncash: Number(summNocash),
      summBonus: Number(summBonus),
      date: convertDateTime(new Date()),
    };

    const saleDetails = details.map(detail => ({
      ...detail,
      cost: detail.cost * (1 - discount / 100),
    }));

    switch (type) {
      case TAB_TYPES.SALES:
        if (newTrade) {
          const selBody: SellBody = {
            ...body,
            gTochkaId: typeId,
            gProducts: saleDetails,
          };
          api.trade
            .sell(selBody)
            .then(res => {
              navigation.navigate('Sales', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        } else {
          const selEdBody: SellEditBody = {
            ...body,
            zakazId: typeId,
            gProducts: saleDetails,
          };
          api.trade
            .sellEdit(selEdBody)
            .then(res => {
              navigation.navigate('Sales', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        }
        break;
      case TAB_TYPES.INCOME:
        if (newTrade) {
          const recBody: ReceiptBody = {
            ...body,
            type: 0,
            gTochkaId: typeId,
            gProducts: saleDetails.map<GProductsReceipt>(d => ({
              ...d,
              price: d.cost,
            })),
          };
          api.trade
            .receipt(recBody)
            .then(res => {
              navigation.navigate('Incomes', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        } else {
          const recEdBody: ReceiptEditBody = {
            ...body,
            type: 0,
            skladId: typeId,
            gProducts: saleDetails.map<GProductsReceipt>(d => ({
              ...d,
              price: d.cost,
            })),
          };
          api.trade
            .receiptEdit(recEdBody)
            .then(res => {
              navigation.navigate('Incomes', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        }
        break;
      case TAB_TYPES.RETURN:
        if (newTrade) {
          const retBody: ReceiptBody = {
            ...body,
            type: 1,
            gTochkaId: typeId,
            gProducts: saleDetails.map<GProductsReceipt>(d => ({
              ...d,
              price: d.cost,
            })),
          };
          api.trade
            .receipt(retBody)
            .then(res => {
              navigation.navigate('Returns', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        } else {
          const retEdBody: ReceiptEditBody = {
            ...body,
            type: 1,
            skladId: typeId,
            gProducts: saleDetails.map<GProductsReceipt>(d => ({
              ...d,
              price: d.cost,
            })),
          };
          api.trade
            .receiptEdit(retEdBody)
            .then(res => {
              navigation.navigate('Returns', {reload: true});
              handleSuccess(res.data);
            })
            .catch(e => handleError(e.response));
        }
        break;
      default:
        setLoading(false);
    }
  };

  const title = useMemo(() => {
    switch (type) {
      case TAB_TYPES.SALES:
        return 'Оплата';
      case TAB_TYPES.INCOME:
        return 'Приход';
      case TAB_TYPES.RETURN:
        return 'Возврат';
      default:
        return '';
    }
  }, [type]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          {loading ? (
            <Preloader />
          ) : (
            <>
              <Text>{title}</Text>
              <Method method={method} setMethod={setMethod} />

              {type === TAB_TYPES.SALES && (
                <View style={styles.toggle}>
                  <Text>Оплата бонусами:</Text>
                  <Toggle checked={bonus} onChange={setBonus} />
                </View>
              )}

              {method === 2 ? (
                <>
                  <Input
                    value={summCash}
                    onChangeText={setSummCash}
                    onBlur={() => setSummCash(text => Number(text).toFixed(2))}
                    style={{marginTop: 24}}
                    label="Сумма наличными"
                    selectTextOnFocus
                    returnKeyLabel="Готово"
                    returnKeyType="done"
                    keyboardType="decimal-pad"
                  />
                  <Input
                    value={summNocash}
                    onChangeText={setSummNocash}
                    onBlur={() =>
                      setSummNocash(text => Number(text).toFixed(2))
                    }
                    style={{marginTop: 16}}
                    label="Сумма безналом"
                    selectTextOnFocus
                    returnKeyLabel="Готово"
                    returnKeyType="done"
                    keyboardType="decimal-pad"
                  />
                </>
              ) : (
                <Input
                  value={method === 0 ? summCash : summNocash}
                  onChangeText={method === 0 ? setSummCash : setSummNocash}
                  onBlur={() =>
                    method === 0
                      ? setSummCash(text => Number(text).toFixed(2))
                      : setSummNocash(text => Number(text).toFixed(2))
                  }
                  style={{marginTop: 24}}
                  label="Сумма к оплате"
                  selectTextOnFocus
                  returnKeyLabel="Готово"
                  returnKeyType="done"
                  keyboardType="decimal-pad"
                />
              )}
              {bonus && (
                <Input
                  value={summBonus}
                  onChangeText={setSummBonus}
                  onBlur={() => setSummBonus(text => Number(text).toFixed(2))}
                  style={{marginTop: 16}}
                  label="Сумма бонусами"
                  selectTextOnFocus
                  returnKeyLabel="Готово"
                  returnKeyType="done"
                  keyboardType="decimal-pad"
                />
              )}

              <View style={styles.all}>
                <Text appearance="hint">Итог:</Text>
                <Text status="primary">
                  {(
                    Number(summCash) +
                    Number(summNocash) +
                    Number(summBonus)
                  ).toFixed(2)}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Button
                  onPress={goBack}
                  style={{flex: 1, marginRight: 5}}
                  appearance="outline">
                  Отмена
                </Button>
                <Button style={{flex: 1, marginLeft: 5}} onPress={handleSave}>
                  Оплата
                </Button>
              </View>
            </>
          )}
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

type MethodProps = {
  method: number;
  setMethod: React.Dispatch<React.SetStateAction<number>>;
};

const Method: React.FC<MethodProps> = ({method, setMethod}) => {
  const theme = useTheme();

  const background = (index: number): StyleProp<ViewStyle> =>
    index === method
      ? {
          backgroundColor: theme['color-primary-500'],
        }
      : undefined;
  const status = (index: number): EvaStatus =>
    index === method ? 'control' : 'primary';
  const handleChangeMethod = (index: number) => setMethod(index);

  return (
    <>
      <Text style={{marginTop: 20}} appearance="hint">
        Способ оплаты
      </Text>
      <ButtonGroup style={{marginTop: 16}} appearance="outline">
        <Button style={background(0)} onPress={() => handleChangeMethod(0)}>
          {() => <Text status={status(0)}>Наличные</Text>}
        </Button>
        <Button style={background(1)} onPress={() => handleChangeMethod(1)}>
          {() => <Text status={status(1)}>Безнал</Text>}
        </Button>
        <Button style={background(2)} onPress={() => handleChangeMethod(2)}>
          {() => <Text status={status(2)}>Смешанный</Text>}
        </Button>
      </ButtonGroup>
    </>
  );
};

const Styles = StyleService.create({
  wrap: {
    flex: 1,
    backgroundColor: 'color-primary-transparent-100',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    minHeight: '50%',
  },
  toggle: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  all: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
});

export default PaymentModal;
