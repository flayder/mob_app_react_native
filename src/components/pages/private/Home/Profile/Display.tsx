import React from 'react';
import {Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackNavigator} from '../../../../../utils/navigation.types';

import {useAppSelector} from '../../../../../redux';

type Props = {
  navigation: NativeStackNavigationProp<ProfileStackNavigator, 'Display'>;
};

const Display: React.FC<Props> = ({navigation}) => {
  const user = useAppSelector(state => state.auth.user);

  const theme = useTheme();

  const navToEdit = () => navigation.navigate('Edit', user);
  const navToDelete = () => navigation.navigate('Delete');

  const RenderEditAction = (props: Partial<ImageProps>) => (
    <TouchableOpacity onPress={navToEdit}>
      <Icon {...props} name="edit-2" fill={theme['color-primary-500']} />
    </TouchableOpacity>
  );

  const UserIcon = (props: Partial<ImageProps>) => (
    <Icon {...props} name="person-outline" fill={theme['color-basic-600']} />
  );

  const EmailIcon = (props: Partial<ImageProps>) => (
    <Icon {...props} name="email-outline" fill={theme['color-basic-600']} />
  );

  const PhoneIcon = (props: Partial<ImageProps>) => (
    <Icon {...props} name="phone-outline" fill={theme['color-basic-600']} />
  );

  const LockIcon = (props: Partial<ImageProps>) => (
    <Icon {...props} name="lock-outline" fill={theme['color-basic-600']} />
  );

  const TrashIcon = (props: Partial<ImageProps>) => (
    <Icon {...props} name="trash-2-outline" fill={theme['color-danger-500']} />
  );

  return (
    <Layout style={styles.wrap}>
      <View style={styles.row}>
        <Text status="primary">Личные данные</Text>
        <RenderEditAction width={20} height={20} />
      </View>
      <Divider style={{marginTop: 16}} />

      <View style={{marginTop: 16}}>
        <View style={styles.row}>
          <View style={styles.imageWrap}>
            <UserIcon width={18} height={18} />
            <Text category="c2" style={{marginLeft: 8}}>
              Имя:
            </Text>
          </View>
          <Text category="c2" status="primary">
            {user.nm}
          </Text>
        </View>

        <View style={{...styles.row, marginTop: 10}}>
          <View style={styles.imageWrap}>
            <UserIcon width={18} height={18} />
            <Text category="c2" style={{marginLeft: 8}}>
              Фамилия:
            </Text>
          </View>
          <Text category="c2" status="primary">
            {user.fn}
          </Text>
        </View>
        <Divider style={{marginTop: 19}} />
      </View>

      <View style={{marginTop: 16}}>
        <View style={styles.row}>
          <View style={styles.imageWrap}>
            <EmailIcon width={18} height={18} />
            <Text category="c2" style={{marginLeft: 8}}>
              E-mail:
            </Text>
          </View>
          <Text category="c2" status="primary">
            {user.login}
          </Text>
        </View>

        <View style={{...styles.row, marginTop: 10}}>
          <View style={styles.imageWrap}>
            <PhoneIcon width={18} height={18} />
            <Text category="c2" style={{marginLeft: 8}}>
              Телефон:
            </Text>
          </View>
          <Text category="c2" status="primary">
            {user.phone === 'null' || user.phone.length === 0
              ? 'Не указан'
              : user.phone}
          </Text>
        </View>
        <Divider style={{marginTop: 19}} />
      </View>

      <View style={{marginTop: 16}}>
        <View style={styles.row}>
          <View style={styles.imageWrap}>
            <LockIcon width={18} height={18} />
            <Text category="c2" style={{marginLeft: 8}}>
              Пароль:
            </Text>
          </View>
          <Text category="c2" status="primary">
            ********
          </Text>
        </View>
        <Divider style={{marginTop: 19}} />
      </View>
      <View style={{marginTop: 16}}>
        <View style={[styles.row, {justifyContent: 'center'}]}>
          <TouchableOpacity style={styles.imageWrap} onPress={navToDelete}>
            <TrashIcon width={18} height={18} />
            <Text category="c2" status="danger" style={{marginLeft: 8}}>
              Удалить аккаунт
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={{marginTop: 19}} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1, padding: 16},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrap: {flexDirection: 'row', alignItems: 'center'},
});

export default Display;
