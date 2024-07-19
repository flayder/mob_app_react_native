import React from 'react';
import Preloader from '../../../../loaders/Preloader';
import {Text, useTheme} from '@ui-kitten/components';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ReportsTopTabNavigator} from '../../../../../utils/navigation.types';

import SalesByProducts from './Tabs/SalesByProducts';
import SalesByGroups from './Tabs/SalesByGroups';
import SalesByMonthes from './Tabs/SalesByMonthes';
import ReturnsByProducts from './Tabs/ReturnsByProducts';
import TopSellingProducts from './Tabs/TopSellingProducts';
import AvgReceipt from './Tabs/AvgReceipt';

const TopTab = createMaterialTopTabNavigator<ReportsTopTabNavigator>();

const Reports: React.FC = () => {
  const theme = useTheme();

  const renderLabel = (text: string, focused: boolean) => (
    <Text
      category="c1"
      status={focused ? 'primary' : 'basic'}
      style={{textAlign: 'center'}}>
      {text}
    </Text>
  );

  return (
    <TopTab.Navigator
      initialRouteName="SalesByProducts"
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Preloader />,
        tabBarScrollEnabled: true,
        tabBarStyle: {backgroundColor: theme['background-basic-color-1']},
        tabBarPressColor: theme['color-primary-300'],
        tabBarIndicatorStyle: {backgroundColor: theme['color-primary-500']},
      }}>
      <TopTab.Screen
        name="SalesByProducts"
        component={SalesByProducts}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Продажи по товарам', focused),
        }}
      />
      <TopTab.Screen
        name="SalesByGroups"
        component={SalesByGroups}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Продажи по группам', focused),
        }}
      />
      <TopTab.Screen
        name="SalesByMonthes"
        component={SalesByMonthes}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Продажи по месяцам', focused),
        }}
      />
      <TopTab.Screen
        name="ReturnsByProducts"
        component={ReturnsByProducts}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Возвраты по товарам', focused),
        }}
      />
      <TopTab.Screen
        name="TopSellingProducts"
        component={TopSellingProducts}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Топ продаваемых товаров', focused),
        }}
      />
      <TopTab.Screen
        name="AvgReceipt"
        component={AvgReceipt}
        options={{
          tabBarLabel: ({focused}) =>
            renderLabel('Средний чек (по дням)', focused),
        }}
      />
    </TopTab.Navigator>
  );
};

export default Reports;
