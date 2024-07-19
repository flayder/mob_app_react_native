import React from 'react';
import {useTheme, Text} from '@ui-kitten/components';
import Preloader from '../../../../loaders/Preloader';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TradeTopTabNavigator} from '../../../../../utils/navigation.types';

import Sales from './Tabs/Sales';
import Incomes from './Tabs/Incomes';
import Returnes from './Tabs/Returnes';
import WritedOff from './Tabs/WritedOff';

const TopTab = createMaterialTopTabNavigator<TradeTopTabNavigator>();

const Trade: React.FC = () => {
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
      initialRouteName="Sales"
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <Preloader />,
        tabBarScrollEnabled: true,
        tabBarStyle: {backgroundColor: theme['background-basic-color-1']},
        tabBarPressColor: theme['color-primary-300'],
        tabBarIndicatorStyle: {backgroundColor: theme['color-primary-500']},
      }}>
      <TopTab.Screen
        name="Sales"
        component={Sales}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Продажи', focused),
        }}
        initialParams={{reload: false}}
      />
      <TopTab.Screen
        name="Incomes"
        component={Incomes}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Приходы', focused),
        }}
        initialParams={{reload: false}}
      />
      <TopTab.Screen
        name="Returns"
        component={Returnes}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Возвраты', focused),
        }}
        initialParams={{reload: false}}
      />
      <TopTab.Screen
        name="WritedOff"
        component={WritedOff}
        options={{
          tabBarLabel: ({focused}) => renderLabel('Списания', focused),
        }}
        initialParams={{reload: false}}
      />
    </TopTab.Navigator>
  );
};

export default Trade;
