import React, {Fragment, useCallback, useRef, useState} from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Divider, Layout, List, Text} from '@ui-kitten/components';

import Filter from './Filter';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {even} from '../../../../../utils';
import {RemaindersDetail} from '../../../../../utils/api.types';
import {useFocusEffect} from '@react-navigation/core';
import {
  clearRemainders,
  getRemainders,
} from '../../../../../redux/actions/private/remaindersActions';
import FooterLoader from '../../../../general/FooterLoader';
import Preloader from '../../../../loaders/Preloader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Sort from '../../../../icons/Sort';

const Remainders: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const remainders = useAppSelector(state => state.remainders);
  const details = useAppSelector(state => state.remainders.data.details);
  const loading = useAppSelector(state => state.remainders.loading);
  const refreshing = useAppSelector(state => state.remainders.refreshing);

  const [cnt, setCnt] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);
  const [sort, setSort] = useState<string>('name');
  const [order, setOrder] = useState<boolean>(false);
  const sortCurrent = useRef<string>('name')
  const orderCurrent = useRef<boolean>(false)

  const loadRemainders =
    (
      refreshing: boolean,
      loadMore: boolean,
      page: number
    ) => {
      console.log(sort, order)
      if (currentGTochkaId)
        return dispatch(
          getRemainders(
            refreshing,
            loadMore,
            currentGTochkaId,
            page,
            orderCurrent.current,
            cnt,
            filter,
            10,
            sortCurrent.current
          ),
        );
    };

  useFocusEffect(
    useCallback(() => {
      loadRemainders(false, false, 0);
      return () => dispatch(clearRemainders());
    }, []),
  );

  const RenderItem = useCallback<
    (props: ListRenderItemInfo<RemaindersDetail>) => JSX.Element
  >(
    ({item, index}) => {
      const level = even(index) ? '2' : '1';
      return (
        <Layout key={index} level={level} style={styles.tableHead}>
          <View style={{flex: 2}}>
            <Text category="c1" appearance="hint" numberOfLines={2}>
              {item.name}
            </Text>
          </View>
          <View style={styles.tableCenter}>
            <Text category="c1" appearance="hint">
              {item.amount.toFixed(1)}
            </Text>
          </View>
          <View style={styles.tableRemainder}>
            <Text category="c1" appearance="hint">
              {item.cost.toFixed(2)}
            </Text>
          </View>
        </Layout>
      );
    },
    [details],
  );

  const handleRefreshOrSearch = () =>
    loadRemainders(true, false, 0);

  const handleLoadMore = () => {
    if (isDataLoaded && remainders.data.hasNext) {
      setIsDataLoaded(false);
      loadRemainders(
        false,
        true,
        remainders.data.currentPage + 1,
      )
        ?.then(() => setIsDataLoaded(true))
        .catch(() => setIsDataLoaded(true));
    }
  };

  const RenderFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  if (loading) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <Filter
        cnt={cnt}
        setCnt={setCnt}
        filter={filter}
        setFilter={setFilter}
        handleSearch={handleRefreshOrSearch}
      />
      <Divider />

      <View style={styles.tableHead}>
        <View style={{flex: 2}}>
          <TouchableOpacity style={styles.sort} onPress={() => {
            sortCurrent.current = 'name';
            orderCurrent.current = false;
            setSort('name');
            setOrder(false)
            loadRemainders(false, false, 0);
          }}>
            <Text appearance="hint">
              Товар
            </Text>
            {sort == 'name' && <View style={{marginLeft: 10}}>
              <Sort def />
            </View>}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.tableHeadCenter}>
        <TouchableOpacity style={styles.sort} onPress={() => {
            sortCurrent.current = 'amount';
            orderCurrent.current = true;
            setSort('amount');
            setOrder(true)
            loadRemainders(false, false, 0);
          }}>
            <Text appearance="hint">
              Остаток
            </Text>
            {sort == 'amount' && <View style={{marginLeft: 10}}>
              <Sort def />
            </View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <Text appearance="hint" style={styles.tableHeadRemainder}>
          Цена
        </Text>
      </View>
      <Divider />

      <List
        ListFooterComponent={RenderFooter}
        refreshing={refreshing}
        onRefresh={handleRefreshOrSearch}
        data={details}
        renderItem={RenderItem}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sort: {flexDirection: 'row', alignItems: 'center'},
  tableHeadCenter: {flex: 1, textAlign: 'center'},
  tableHeadRemainder: {flex: 1, textAlign: 'right'},
  tableCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRemainder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  item: {flex: 3},
  remainder: {flex: 1, textAlign: 'right'},
});

export default Remainders;
