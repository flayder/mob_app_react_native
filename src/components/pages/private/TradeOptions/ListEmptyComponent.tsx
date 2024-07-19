import {RouteProp, useRoute} from '@react-navigation/native';
import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  PrivateStackNavigator,
  TradeOptionsTypes,
} from '../../../../utils/navigation.types';
import Box from '../../../icons/Box';

type Props = {
  navToAddProduct: () => void;
};

const ListEmptyComponent: React.FC<Props> = ({navToAddProduct}) => {
  const route = useRoute<RouteProp<PrivateStackNavigator, 'TradeOptions'>>();

  const renderTitle = () => {
    switch (route.params.type) {
      case TradeOptionsTypes.SALE:
        return 'Добавьте товар';
      case TradeOptionsTypes.INCOME:
        return 'Добавьте товар для прихода';
      case TradeOptionsTypes.RETURN:
        return 'Добавьте возврат';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      disabled={!route.params.edit}
      style={styles.wrap}
      onPress={navToAddProduct}>
      <Layout style={styles.box}>
        <Box />
        <Text category="h3" status="primary">
          {renderTitle()}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  box: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ListEmptyComponent;
