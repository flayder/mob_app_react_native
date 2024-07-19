import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, IndexPath, Layout, Text} from '@ui-kitten/components';

import RefreshScrollView from '../../../../loaders/RefreshScrollView';
import InfoItem from './InfoItem';

import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {
  getMainData,
  getMainGraph,
} from '../../../../../redux/actions/private/mainActions';
import {useFocusEffect} from '@react-navigation/core';
import MainGraph from './MainGraph';
import Preloader from '../../../../loaders/Preloader';
import {
  addSpaces,
  DateRange,
  getDayRange,
  getMonthRange,
  getWeekRange,
} from '../../../../../utils';

export type DateSelect = {
  name: string;
  date: DateRange;
};

const data: DateSelect[] = [
  {name: 'День', date: getDayRange()},
  {name: 'Неделя', date: getWeekRange()},
  {name: 'Месяц', date: getMonthRange()},
];

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const mainData = useAppSelector(state => state.main.mainData);
  const tradePoint = useAppSelector(state => state.main.tradePoint);
  const loading = useAppSelector(state => state.main.loading);
  const refreshing = useAppSelector(state => state.main.refreshing);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];

  const loadMainData = useCallback(
    (refreshing: boolean) => {
      if (tradePoint) dispatch(getMainData(refreshing, tradePoint.gTochkaId));
    },
    [tradePoint],
  );

  const loadMainGraph = useCallback(() => {
    if (tradePoint)
      dispatch(
        getMainGraph(
          tradePoint.gTochkaId,
          displayValue.date.datebegin,
          displayValue.date.dateend,
        ),
      );
  }, [tradePoint, displayValue]);

  useFocusEffect(
    useCallback(() => {
      loadMainData(false);
    }, [loadMainData]),
  );

  useFocusEffect(loadMainGraph);

  const onRefresh = () => {
    if (tradePoint) {
      loadMainData(true);
      loadMainGraph();
    }
  };

  if (loading) return <Preloader />;

  return (
    <Layout style={styles.wrap}>
      <RefreshScrollView refreshing={refreshing} onRefresh={onRefresh}>
        <View style={styles.row}>
          <Text status="primary">В кассе на сегодня:</Text>
          <Text status="primary">{addSpaces(mainData.summ, false)}</Text>
        </View>
        <Divider style={{marginTop: 16}} />
        <InfoItem title="Сегодня" info={mainData.day} />
        <InfoItem title="За последние 7 дней" info={mainData.week} />
        <InfoItem title="За последние 30 дней" info={mainData.month} />
        <MainGraph
          data={data}
          displayValue={displayValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Main;
