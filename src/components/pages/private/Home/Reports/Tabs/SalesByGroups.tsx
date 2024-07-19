import {useFocusEffect} from '@react-navigation/core';
import {Layout, List, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getSalesGroups,
  setLoading,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {even} from '../../../../../../utils';
import {SalesProductsDetails} from '../../../../../../utils/api.types';
import Preloader from '../../../../../loaders/Preloader';
import SalesHeader from '../SalesHeader';

const SalesByGroups: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.salesGroups.reduce);
  const data = useAppSelector(state => state.reports.tabs.salesGroups.data);
  const loading = useAppSelector(
    state => state.reports.tabs.salesGroups.loading,
  );
  const refreshing = useAppSelector(
    state => state.reports.tabs.salesGroups.refreshing,
  );
  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const loadSalesGroups = useCallback(
    (refreshing: boolean) => {
      if (currentGTochkaid)
        dispatch(
          getSalesGroups(
            refreshing,
            currentGTochkaid,
            date.datebegin,
            date.dateend,
          ),
        );
    },
    [currentGTochkaid, date],
  );

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        loadSalesGroups(false);
      }
      return () => dispatch(setLoading(true, TAB_TYPES.SALES_GROUPS));
    }, [currentGTochkaid, date]),
  );

  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.SALES_GROUPS));
    loadSalesGroups(false);
  };

  const handleRefresh = () => loadSalesGroups(true);

  if (loading) return <Preloader />;

  return (
    <List
      ListHeaderComponent={
        <SalesHeader
          date={date}
          reduce={reduce}
          setReduce={handleReduce}
          head={data.head}
        />
      }
      refreshing={refreshing}
      onRefresh={handleRefresh}
      data={data.details}
      renderItem={ListItem}
    />
  );
};

const ListItem: React.FC<ListRenderItemInfo<SalesProductsDetails>> = ({
  item,
  index,
}) => {
  return (
    <Layout key={index} style={styles.wrap} level={even(index) ? '4' : '2'}>
      <View style={{flex: 1.5}}>
        <Text category="s2" numberOfLines={2} style={{marginBottom: 5}}>
          {item.name}
        </Text>
        <Text category="p2" appearance="hint">
          {item.amount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.number}>
        <Text category="p2" appearance="hint">
          {item.summ?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.number}>
        <Text category="p2" appearance="hint">
          {item.income?.toFixed(2)}
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  number: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default SalesByGroups;
