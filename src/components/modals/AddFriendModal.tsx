import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {
  ImageProps,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../../redux';
import {linkUser} from '../../redux/actions/private/friendActions';
import {TradePoint} from '../../utils/api.types';
import {PrivateStackNavigator} from '../../utils/navigation.types';
import {show} from '../../utils/snackbar';

const EmailIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const CheckIcon = (props?: Partial<ViewProps>) => (
  <Icon {...props} name="checkmark-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<
    PrivateStackNavigator,
    'AddFriendModal'
  >;
};

interface ExtendTradePoint extends TradePoint {
  active: boolean;
}

const AddFriendModal: React.FC<Props> = ({navigation}) => {
  const {theme} = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const tradePoints = useAppSelector(state => state.main.tradePoints);

  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  const [email, setEmail] = useState<string>('');
  const [extendTradePoints, setExtendTradePoints] = useState<
    ExtendTradePoint[]
  >([]);

  useEffect(() => {
    setExtendTradePoints(
      tradePoints.map(tradePoint => ({...tradePoint, active: false})),
    );
  }, [tradePoints]);

  const setActive = (index: number) =>
    setExtendTradePoints(tradePoints =>
      tradePoints.map((tradePoint, i) => ({
        ...tradePoint,
        active: index === i ? !tradePoint.active : tradePoint.active,
      })),
    );

  const addFriend = () => {
    const friends = extendTradePoints.reduce(
      (acc, item) => acc + (item.active ? `&gtochkaids=${item.gTochkaId}` : ''),
      '',
    );

    dispatch(linkUser(email, friends, tradePoints.length)).then(text => {
      navigation.goBack();
      show({text, type: 'success'});
    });
  };

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Input
            accessoryLeft={EmailIcon}
            placeholder="E-mail"
            size="large"
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="email-address"
            keyboardAppearance={theme}
            value={email}
            onChangeText={t => setEmail(t)}
          />
          <List
            style={{marginTop: 10}}
            ItemSeparatorComponent={Divider}
            data={extendTradePoints}
            renderItem={props => (
              <RenderItem {...props} setActive={setActive} key={props.index} />
            )}
          />
          <Button style={{marginTop: 20}} onPress={addFriend}>
            Добавить
          </Button>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

interface ItemProps extends ListRenderItemInfo<ExtendTradePoint> {
  setActive: (index: number) => void;
}

const RenderItem: React.FC<ItemProps> = ({item, index, setActive}) => (
  <ListItem
    key={index}
    title={item.name}
    accessoryRight={item.active ? CheckIcon : undefined}
    onPress={() => setActive(index)}
  />
);

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

export default AddFriendModal;
