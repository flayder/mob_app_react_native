import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';

type Props = {
  refreshing: boolean;
  onRefresh?: () => void;
};

const RefreshScrollView: React.FC<Props> = ({
  children,
  refreshing,
  onRefresh,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {children}
    </ScrollView>
  );
};

export default RefreshScrollView;
