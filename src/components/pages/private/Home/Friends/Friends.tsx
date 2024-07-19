import React, {useEffect, useReducer} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {Button, Divider, Layout, List, ListItem} from '@ui-kitten/components';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {loadFriends} from '../../../../../redux/actions/private/friendActions';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PrivateStackNavigator} from '../../../../../utils/navigation.types';
import {Friend} from '../../../../../utils/api.types';
import Preloader from '../../../../loaders/Preloader';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator>;
};

const Friends: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.friends.loading);
  const refreshing = useAppSelector(state => state.friends.refreshing);
  const friends = useAppSelector(state => state.friends.friends);
  const tradePoints = useAppSelector(state => state.main.tradePoints);

  useEffect(() => {
    dispatch(loadFriends(false, tradePoints.length));
  }, [tradePoints]);

  const onRefresh = () => dispatch(loadFriends(true, tradePoints.length));

  const navToModal = () => navigation.navigate('AddFriendModal');

  if (loading) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <List
        refreshing={refreshing}
        onRefresh={onRefresh}
        ItemSeparatorComponent={Divider}
        data={friends}
        renderItem={RenderItem}
      />
      <Divider />
      <View style={{paddingVertical: 18, paddingHorizontal: 27}}>
        <Button onPress={navToModal}>Добавить</Button>
      </View>
    </Layout>
  );
};

const RenderItem: React.FC<ListRenderItemInfo<Friend>> = ({item, index}) => (
  <ListItem
    key={index}
    title={item.login}
    description={item.nameGTochka}
    disabled
  />
);

export default Friends;
