import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Drawer,
  DrawerItem,
  Icon,
  IndexPath,
  Layout,
  Text,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import React, {useCallback, useContext, useState} from 'react';
import {ImageProps, StyleSheet} from 'react-native';
import ThemeContext from '../../context/ThemeContext';

import {useAppDispatch} from '../../redux';
import {logout} from '../../redux/actions/authActions';

const ForwardIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="arrow-ios-forward" />
);

const PersonIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="person-outline" />
);

const LogoutIcon = (props?: Partial<ImageProps>) => (
  <Icon {...props} name="log-out-outline" />
);

interface Props extends DrawerContentComponentProps {}

const DrawerContent: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const uiTheme = useTheme();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const [index, setIndex] = useState<number>(1);

  const navToTradePoint = () => {
    navigation.navigate('TradePoint');
    navigation.closeDrawer();
  };
  const navToMain = () => {
    navigation.navigate('Main');
    setIndex(1);
  };
  const navToConReport = () => {
    navigation.navigate('ConReport');
    setIndex(2);
  };
  const navToTrade = () => {
    navigation.navigate('Trade');
    setIndex(3);
  };
  const navToReports = () => {
    navigation.navigate('Reports');
    setIndex(4);
  };
  const navToRemainders = () => {
    navigation.navigate('Remainders');
    setIndex(5);
  };
  const navToFriends = () => {
    navigation.navigate('Friends');
    setIndex(6);
  };
  const navToProfile = () => {
    navigation.navigate('Profile');
    setIndex(7);
  };

  const logOut = () => dispatch(logout());

  const SunIcon = (props?: Partial<ImageProps>) => (
    <Icon
      {...props}
      name="sun-outline"
      fill={uiTheme['color-control-default']}
    />
  );

  const MoonIcon = (props?: Partial<ImageProps>) => (
    <Icon
      {...props}
      name="moon-outline"
      fill={uiTheme['color-control-default']}
    />
  );

  const renderHeader = useCallback(
    () => (
      <Layout
        style={[
          styles.header,
          {backgroundColor: uiTheme['color-primary-800']},
        ]}>
        <Text category="h5" status="control">
          Shopuchet
        </Text>
        <TopNavigationAction
          icon={theme === 'light' ? SunIcon : MoonIcon}
          onPress={toggleTheme}
        />
      </Layout>
    ),
    [theme, toggleTheme],
  );

  const renderFooter = useCallback(
    () => (
      <>
        <DrawerItem
          onPress={navToProfile}
          title={props => <Text {...props}>Профиль</Text>}
          accessoryLeft={PersonIcon}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: uiTheme['background-basic-color-3'],
          }}
          selected={index === 7}
        />
        <DrawerItem
          title={props => <Text {...props}>Выход</Text>}
          accessoryLeft={LogoutIcon}
          onPress={logOut}
        />
      </>
    ),
    [uiTheme, index],
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={new IndexPath(index)}>
      <DrawerItem
        title={props => <Text {...props}>Выбрать торговую точку</Text>}
        accessoryRight={ForwardIcon}
        onPress={navToTradePoint}
      />
      <DrawerItem
        title={props => <Text {...props}>Главная</Text>}
        onPress={navToMain}
      />
      <DrawerItem
        title={props => <Text {...props}>Сводный отчет</Text>}
        onPress={navToConReport}
      />
      <DrawerItem
        title={props => <Text {...props}>Торговля</Text>}
        onPress={navToTrade}
      />
      <DrawerItem
        title={props => <Text {...props}>Отчеты</Text>}
        onPress={navToReports}
      />
      <DrawerItem
        title={props => <Text {...props}>Товарные остатки</Text>}
        onPress={navToRemainders}
      />
      <DrawerItem
        title={props => <Text {...props}>Список друзей</Text>}
        onPress={navToFriends}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    paddingRight: 5,
  },
});

export default DrawerContent;
