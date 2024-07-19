import React, {Children, useCallback, useContext, useState} from 'react';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import Preloader from '../../../../loaders/Preloader';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackNavigator} from '../../../../../utils/navigation.types';
import {RouteProp, useFocusEffect} from '@react-navigation/core';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {updateUser} from '../../../../../redux/actions/private/profileActions';
import {show} from '../../../../../utils/snackbar';
import ThemeContext from '../../../../../context/ThemeContext';
import { ScrollView } from 'react-native-gesture-handler';
import ContentWrapper from '../../../../general/ContentWrapper';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackNavigator, 'Edit'>;
  route: RouteProp<ProfileStackNavigator, 'Edit'>;
};

const Edit: React.FC<Props> = ({navigation, route}) => {
  const appTheme = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.profile.loading);

  const [name, setName] = useState<string>(route.params.nm);
  const [surname, setSurname] = useState<string>(route.params.fn);
  const [email, setEmail] = useState<string>(route.params.login);
  const [phone, setPhone] = useState<string>(
    route.params.phone === 'null' ? '' : route.params.phone,
  );
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [secureTextEntryOld, setSecureTextEntryOld] = useState<boolean>(true);

  const theme = useTheme();

  const goBack = () => navigation.goBack();

  useFocusEffect(
    React.useCallback(() => {
      return () => goBack();
    }, []),
  );

  const RenderAcceptAction = (props: Partial<ImageProps>) => (
    <TouchableOpacity onPress={goBack}>
      <Icon {...props} name="checkmark" fill={theme['color-primary-500']} />
    </TouchableOpacity>
  );

  const update = () =>
    dispatch(
      updateUser(surname, name, phone, oldPassword, newPassword, email),
    ).then(res => {
      if (res) {
        show({text: res, type: 'success'});
        goBack();
      }
    });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleSecureEntryOld = () => {
    setSecureTextEntryOld(!secureTextEntryOld);
  };

  const renderToggleIcon = useCallback(
    (props?: Partial<ImageProps>) => (
      <TouchableOpacity onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
      </TouchableOpacity>
    ),
    [secureTextEntry],
  );

  const renderToggleIconOld = useCallback(
    (props?: Partial<ImageProps>) => (
      <TouchableOpacity onPress={toggleSecureEntryOld}>
        <Icon {...props} name={secureTextEntryOld ? 'eye-off' : 'eye'} />
      </TouchableOpacity>
    ),
    [secureTextEntryOld],
  );

  if (loading) return <Preloader />;

  return (
    <Layout style={styles.wrap}>
      <ContentWrapper>
        <View style={styles.row}>
          <Text status="primary">Личные данные</Text>
          <RenderAcceptAction width={20} height={20} />
        </View>
        <Divider style={{marginTop: 16}} />

        <View style={{marginTop: 13}}>
          <Input
            size="large"
            placeholder="Имя"
            value={name}
            onChangeText={setName}
            keyboardAppearance={appTheme.theme}
          />
          <Input
            size="large"
            placeholder="Фамилия"
            style={{marginTop: 10}}
            value={surname}
            onChangeText={setSurname}
          />
          <Input
            size="large"
            placeholder="E-mail"
            style={{marginTop: 10}}
            value={email}
            onChangeText={setEmail}
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType={'email-address'}
            keyboardAppearance={appTheme.theme}
          />
          <Input
            size="large"
            placeholder="Телефон"
            style={{marginTop: 10}}
            value={phone}
            onChangeText={setPhone}
            returnKeyLabel="Готово"
            returnKeyType="done"
            keyboardType={'phone-pad'}
            keyboardAppearance={appTheme.theme}
          />
          <Divider style={{marginTop: 10, marginBottom: 10}} />
          <Input
            size="large"
            placeholder="Старый пароль"
            value={oldPassword}
            onChangeText={setOldPassword}
            keyboardAppearance={appTheme.theme}
            accessoryRight={renderToggleIcon}
            secureTextEntry={secureTextEntry}
          />
          <Input
            size="large"
            placeholder="Новый пароль"
            style={{marginTop: 10}}
            value={newPassword}
            onChangeText={setNewPassword}
            keyboardAppearance={appTheme.theme}
            accessoryRight={renderToggleIconOld}
            secureTextEntry={secureTextEntryOld}
          />
        </View>
        <Button style={{marginTop: 30}} onPress={update}>
          Сохранить
        </Button>
        {/* <View style={{height: focus ? 250 : 0}} /> */}
      </ContentWrapper>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, padding: 16, overflow: 'visible'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Edit;
