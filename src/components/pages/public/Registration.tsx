import React, {useCallback, useContext, useState} from 'react';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../../../utils/navigation.types';
import ThemeContext from '../../../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../../../redux';
import Preloader from '../../loaders/Preloader';
import {registrate} from '../../../redux/actions/authActions';

const User = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="person-outline" />
);

const Email = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const Phone = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="phone-outline" />
);

const Lock = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="lock-outline" />
);

const BackIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PublicStackNavigator, 'Forgot'>;
};

const Registration: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const {theme} = useContext(ThemeContext);

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //Navigation actions
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );
  //----------------

  //Password secure icon
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderToggleIcon = useCallback(
    (props?: Partial<ImageProps>) => (
      <TouchableOpacity onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableOpacity>
    ),
    [secureTextEntry],
  );
  //--------------------

  const handleRegistrate = () =>
    dispatch(registrate(email, password, surname, name, phone));

  if (loading) return <Preloader />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap}>
        <TopNavigation accessoryLeft={BackAction} />
        <View style={styles.formWrap}>
          <Text category="h1">РЕГИСТРАЦИЯ</Text>
          <Input
            value={name}
            onChangeText={setName}
            accessoryLeft={User}
            placeholder="Имя"
            style={styles.name}
            size="large"
            keyboardAppearance={theme}
          />
          <Input
            value={surname}
            onChangeText={setSurname}
            accessoryLeft={User}
            placeholder="Фамилия"
            style={styles.input}
            size="large"
            keyboardAppearance={theme}
          />
          <Input
            value={email}
            onChangeText={setEmail}
            accessoryLeft={Email}
            placeholder="E-mail"
            style={styles.input}
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="email-address"
            size="large"
            keyboardAppearance={theme}
          />
          <Input
            value={phone}
            onChangeText={setPhone}
            accessoryLeft={Phone}
            placeholder="Телефон"
            style={styles.input}
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="phone-pad"
            size="large"
            keyboardAppearance={theme}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            accessoryLeft={Lock}
            accessoryRight={renderToggleIcon}
            placeholder="Пароль"
            style={styles.input}
            size="large"
            secureTextEntry={secureTextEntry}
            keyboardAppearance={theme}
          />

          <Button onPress={handleRegistrate} style={styles.registration}>
            РЕГИСТРАЦИЯ
          </Button>
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  formWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  name: {marginTop: 50},
  input: {marginTop: 10},
  registration: {marginTop: 50, minWidth: 200},
});

export default Registration;
