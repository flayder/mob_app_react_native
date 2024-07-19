import React, {useEffect} from 'react';
import Preloader from '../components/loaders/Preloader';

import ErrorBoundary from '../components/loaders/ErrorBoundary';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Public from './Public';
import Private from './Private';

import {useAppDispatch, useAppSelector} from '../redux';
import {getUser} from '../redux/actions/authActions';

const Navigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.fetch.appLoading);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          {loading ? <Preloader /> : isAuth ? <Private /> : <Public />}
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default Navigator;
