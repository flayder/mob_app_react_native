import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackNavigator} from '../../../../../utils/navigation.types';

import Display from './Display';
import Edit from './Edit';
import DeleteAccountModal from '../../../../modals/DeleteAccountModal';

const Stack = createNativeStackNavigator<ProfileStackNavigator>();

const Profile: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Display"
      screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Display" component={Display} />
        <Stack.Screen name="Edit" component={Edit} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen name="Delete" component={DeleteAccountModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Profile;
