import React, {useCallback, useContext, useState} from 'react';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

import {login} from '../../../redux/actions/authActions';
import ThemeContext from '../../../context/ThemeContext';
import {useAppDispatch} from '../../../redux';

const Email = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const Lock = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="lock-outline" />
);

const SunIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="sun-outline" />
);

const MoonIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="moon-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PublicStackNavigator, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail = (text: string) => setEmail(text);
  const handleChangePassword = (text: string) => setPassword(text);

  //Navigation actions
  const navToForgot = () => navigation.navigate('Forgot');
  const navToReg = () => navigation.navigate('Registration');
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

  const logIn = () => dispatch(login(email, password));

  //--------------------

  const ThemeAction = useCallback(
    () => (
      <TopNavigationAction
        icon={theme === 'light' ? SunIcon : MoonIcon}
        onPress={toggleTheme}
      />
    ),
    [theme, toggleTheme],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.topWrap}>
        <TopNavigation accessoryRight={ThemeAction} />
        <Layout style={styles.wrap}>
          <Text category="h1">ВХОД</Text>
          <Input
            value={email}
            onChangeText={handleChangeEmail}
            accessoryLeft={Email}
            placeholder="E-mail"
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="email-address"
            keyboardAppearance={theme}
            style={styles.email}
            size="large"
          />
          <Input
            value={password}
            onChangeText={handleChangePassword}
            accessoryLeft={Lock}
            accessoryRight={renderToggleIcon}
            placeholder="Password"
            style={styles.password}
            secureTextEntry={secureTextEntry}
            keyboardAppearance={theme}
            size="large"
          />
          <TouchableOpacity style={styles.forgot} onPress={navToForgot}>
            <Text category="p2" status="primary">
              Забыли пароль?
            </Text>
          </TouchableOpacity>
          <Button style={styles.login} onPress={logIn}>
            ВХОД
          </Button>
          <Button
            style={styles.registration}
            appearance="ghost"
            onPress={navToReg}>
            РЕГИСТРАЦИЯ
          </Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topWrap: {flex: 1},
  wrap: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15},
  email: {marginTop: 50},
  password: {marginTop: 10},
  forgot: {marginTop: 8, alignSelf: 'flex-start'},
  login: {marginTop: 50, minWidth: 200},
  registration: {marginTop: 10, minWidth: 200},
});

export default Login;
