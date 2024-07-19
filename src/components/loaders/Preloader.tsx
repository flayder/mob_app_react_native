import React from 'react';
import {StyleSheet} from 'react-native';

import {Layout, Spinner} from '@ui-kitten/components';

const Preloader: React.FC = (): React.ReactElement => (
  <Layout style={styles.wrap}>
    <Spinner />
  </Layout>
);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Preloader;
