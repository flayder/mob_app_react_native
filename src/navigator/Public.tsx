import React from 'react';
import {Layout} from '@ui-kitten/components';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PublicStackNavigator} from '../utils/navigation.types';

import Login from '../components/pages/public/Login';
import Forgot from '../components/pages/public/Forgot';
import Registration from '../components/pages/public/Registration';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<PublicStackNavigator>();

const Public: React.FC = () => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Layout style={{paddingTop: top, paddingBottom: bottom, flex: 1}}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </Layout>
  );
};

export default Public;
