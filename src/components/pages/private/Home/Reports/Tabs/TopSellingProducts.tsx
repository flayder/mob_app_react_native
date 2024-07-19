import {useFocusEffect} from '@react-navigation/core';
import {Divider, Layout, Text} from '@ui-kitten/components';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {
  getTopSales,
  setLoading,
  setReduce,
} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import {getColor} from '../../../../../../utils';
import Preloader from '../../../../../loaders/Preloader';
import RefreshScrollView from '../../../../../loaders/RefreshScrollView';
import DateRangeAndSort from '../DateRangeAndSort';
import PieChart from '../PieChart';

const TopSellingProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.topSales.reduce);
  const data = useAppSelector(state => state.reports.tabs.topSales.data);
  const loading = useAppSelector(state => state.reports.tabs.topSales.loading);
  const refreshing = useAppSelector(
    state => state.reports.tabs.topSales.refreshing,
  );
  const currentGTochkaid = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const loadTopSales = useCallback(
    (refreshing: boolean, descending: boolean) => {
      if (currentGTochkaid)
        dispatch(
          getTopSales(
            refreshing,
            currentGTochkaid,
            date.datebegin,
            date.dateend,
            descending,
          ),
        );
    },
    [currentGTochkaid, date, reduce],
  );

  useFocusEffect(
    useCallback(() => {
      if (currentGTochkaid) {
        loadTopSales(false, !reduce);
      }
      return () => dispatch(setLoading(true, TAB_TYPES.TOP_SALES));
    }, [currentGTochkaid, date]),
  );

  const handleRefresh = () => loadTopSales(true, !reduce);
  const handleReduce = () => {
    dispatch(setReduce(!reduce, TAB_TYPES.TOP_SALES));
    loadTopSales(false, reduce);
  };

  const ListHeader = () => (
    <Layout>
      <DateRangeAndSort date={date} reduce={reduce} setReduce={handleReduce} />
      <Divider />
      <View style={{padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text category="s2">Продано товаров:</Text>
          <Text category="s2" status="primary">
            {data.head.cnt}
          </Text>
        </View>
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text category="s2">На сумму:</Text>
          <Text category="s2" status="primary">
            {data.head.summ?.toFixed(2)}
          </Text>
        </View>
      </View>
      <Divider />
    </Layout>
  );

  if (loading) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <RefreshScrollView refreshing={refreshing} onRefresh={handleRefresh}>
        <ListHeader />
        <View style={{padding: 16}}>
          {data.details.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <View style={styles.textWrap}>
                <View
                  style={[styles.dot, {backgroundColor: getColor(index)}]}
                />
                <Text category="label">{item.name}</Text>
              </View>
              <Text
                category="p2"
                numberOfLines={1}
                appearance="hint"
                style={{flex: 0.3, textAlign: 'right'}}>
                {item.amount?.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
        <PieChart details={data.details} />
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default TopSellingProducts;
