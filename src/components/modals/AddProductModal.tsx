import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageProps,
  InteractionManager,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux';
import {setTradeSession} from '../../redux/actions/private/tradeActions';
import {TradeSessionDetail} from '../../redux/types/private/trade.types';
import {PrivateStackNavigator} from '../../utils/navigation.types';

const Product = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="shopping-bag-outline" />
);
const Price = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="pricetags-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'AddProductModal'
  >;
  route: RouteProp<PrivateStackNavigator, 'AddProductModal'>;
};

const AddProductModal: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const tradeSession = useAppSelector(state => state.trade.tradeSession);

  const ref = useRef<Input>(null);
  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  useEffect(() => {
    setTimeout(ref.current?.focus, 100);
  }, [ref]);

  const [amount, setAmount] = useState<string>(
    route.params.type === 'new' ? '1' : route.params.detail.amount.toString(),
  );
  const [cost, setCost] = useState<string>(route.params.detail.cost.toFixed(2));

  const hanldeOk = () => {
    const details = [...tradeSession.details];
    const index = details.findIndex(
      d => d.gProductId === route.params.detail.gProductId,
    );
    const detail: TradeSessionDetail = {
      gProductId: route.params.detail.gProductId,
      name: route.params.detail.name,
      remainder: route.params.detail.remainder,
      amount: Number(amount),
      cost: Number(cost),
    };
    if (index > -1) details[index] = detail;
    else details.push(detail);
    dispatch(setTradeSession({...tradeSession, details}));
    navigation.goBack();
    route.params.callback();
  };

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text style={{textAlign: 'center'}}>{route.params.detail.name}</Text>
          <Text style={{textAlign: 'center'}} appearance="hint">
            Остаток: {route.params.detail.remainder} шт.
          </Text>
          <Input
            ref={ref}
            value={amount}
            onChangeText={setAmount}
            accessoryLeft={Product}
            placeholder="Количество"
            style={{marginTop: 30}}
            selectTextOnFocus
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="decimal-pad"
          />
          <Input
            value={cost}
            onChangeText={setCost}
            accessoryLeft={Price}
            placeholder="Цена"
            style={{marginTop: 15}}
            selectTextOnFocus
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="decimal-pad"
          />
          <View style={{marginTop: 30, flexDirection: 'row'}}>
            <Button
              onPress={goBack}
              style={{flex: 1, marginRight: 5}}
              appearance="outline">
              Отмена
            </Button>
            <Button onPress={hanldeOk} style={{flex: 1, marginLeft: 5}}>
              Ок
            </Button>
          </View>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {
    flex: 1,
    backgroundColor: 'color-primary-transparent-100',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {padding: 30, borderRadius: 5, width: '100%'},
});

export default AddProductModal;
