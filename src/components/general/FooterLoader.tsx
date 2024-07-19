import {Layout, Spinner} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const FooterLoader: React.FC = () => {
  return (
    <Layout style={styles.footer}>
      <Spinner size="small" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  footer: {alignItems: 'center', justifyContent: 'center', padding: 10},
});

export default FooterLoader;
