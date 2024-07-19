import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerNavigator} from '../../../../utils/navigation.types';

import DrawerTopNavigation from '../../../navigation/DrawerTopNavigation';
import DrawerContent from '../../../navigation/DrawerContent';

import Main from './Main/Main';
import ConReport from './ConReport/ConReport';
import Trade from './Trade/Trade';
import Reports from './Reports/Reports';
import Remainders from './Remainders/Remainders';
import Friends from './Friends/Friends';
import Profile from './Profile/Profile';

const Drawer = createDrawerNavigator<DrawerNavigator>();

const Home: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{header: props => <DrawerTopNavigation {...props} />}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{title: 'Главная'}}
      />
      <Drawer.Screen
        name="ConReport"
        component={ConReport}
        options={{title: 'Сводный отчет'}}
      />
      <Drawer.Screen
        name="Trade"
        component={Trade}
        options={{title: 'Торговля'}}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{title: 'Отчеты'}}
      />
      <Drawer.Screen
        name="Remainders"
        component={Remainders}
        options={{title: 'Товарные остатки'}}
      />
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{title: 'Список друзей'}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Профиль'}}
      />
    </Drawer.Navigator>
  );
};

export default Home;
