import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';

const Day: React.FC = () => {
  const styles = useStyleSheet(Styles);
  return (
    <View style={styles.wrap}>
      <Text category="label" status="primary">
        {new Date().getDate()}
      </Text>
    </View>
  );
};

const Styles = StyleService.create({
  wrap: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'color-primary-500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Day;
