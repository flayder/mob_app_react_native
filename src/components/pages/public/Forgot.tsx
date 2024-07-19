import React, {useContext, useState} from 'react';
import {
  ImageProps,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../../../utils/navigation.types';
import ThemeContext from '../../../context/ThemeContext';
import {useAppDispatch, useAppSelector} from '../../../redux';
import {resetPassword} from '../../../redux/actions/authActions';
import Preloader from '../../loaders/Preloader';

const Email = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="email-outline" />
);

const BackIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-back-outline" />
);

type Props = {
  navigation: NativeStackNavigationProp<PublicStackNavigator, 'Forgot'>;
};

const Forgot: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);

  const {theme} = useContext(ThemeContext);
  const [email, setEmail] = useState<string>('');

  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );

  const handleResetPassword = () => dispatch(resetPassword(email, goBack));

  if (loading) return <Preloader />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.wrap}>
        <TopNavigation accessoryLeft={BackAction} />
        <Layout style={styles.formWrap}>
          <Input
            value={email}
            onChangeText={setEmail}
            accessoryLeft={Email}
            placeholder="E-mail"
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType="email-address"
            keyboardAppearance={theme}
            style={styles.email}
            size="large"
          />

          <Button onPress={handleResetPassword} style={styles.login}>
            ОТПРАВИТЬ
          </Button>
        </Layout>
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
  email: {marginTop: 50},
  password: {marginTop: 10},
  forgot: {marginTop: 8, alignSelf: 'flex-start'},
  login: {marginTop: 20, minWidth: 200},
  registration: {marginTop: 10, minWidth: 200},
});

export default Forgot;
