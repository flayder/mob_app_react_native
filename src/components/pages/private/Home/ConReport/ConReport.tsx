import {useFocusEffect} from '@react-navigation/core';
import {Divider, Icon, Layout, Text, useTheme} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {ImageProps, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux';
import {getConReport} from '../../../../../redux/actions/private/conReportActions';
import {
  addSpaces,
  convertDate,
  incrementDecrementDate,
} from '../../../../../utils';
import RefreshScrollView from '../../../../loaders/RefreshScrollView';
import Preloader from '../../../../loaders/Preloader';

const ConReport: React.FC = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.conReport.loading);
  const refreshing = useAppSelector(state => state.conReport.refreshing);
  const conReport = useAppSelector(state => state.conReport.conReport);
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const loadConReport = useCallback(
    (refreshing: boolean, date: Date) => {
      if (currentGTochkaId)
        dispatch(getConReport(refreshing, currentGTochkaId, date));
    },
    [currentGTochkaId],
  );

  useFocusEffect(
    useCallback(() => {
      loadConReport(false, date);
    }, [currentGTochkaId]),
  );

  const increaseDate = () => {
    const newDate = incrementDecrementDate(date, 'inc');
    loadConReport(true, newDate);
    setDate(newDate);
  };
  const decreaseDate = () => {
    const newDate = incrementDecrementDate(date, 'dec');
    loadConReport(true, newDate);
    setDate(newDate);
  };

  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const handleConfirm = (date: Date) => {
    setOpen(false);
    loadConReport(true, date);
    setDate(date);
  };

  const ArrowLeft = (props: Partial<ImageProps>) => (
    <TouchableOpacity onPress={decreaseDate} disabled={loading}>
      <Icon
        {...props}
        name="arrow-back-outline"
        fill={theme['color-basic-500']}
      />
    </TouchableOpacity>
  );

  const ArrowRight = (props: Partial<ImageProps>) => (
    <TouchableOpacity onPress={increaseDate} disabled={loading}>
      <Icon
        {...props}
        name="arrow-forward-outline"
        fill={theme['color-basic-500']}
      />
    </TouchableOpacity>
  );

  const handleRefresh = () => loadConReport(true, date);

  if (loading) return <Preloader />;

  return (
    <Layout style={styles.wrap}>
      <RefreshScrollView refreshing={refreshing} onRefresh={handleRefresh}>
        <View style={styles.date}>
          <ArrowLeft width={25} height={25} />
          <TouchableOpacity onPress={handleOpen}>
            <Text status="primary">{convertDate(date)}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            textColor={theme['color-primary-500']}
            title="Выберете дату"
            confirmText="Ок"
            cancelText="Отмена"
          />
          <ArrowRight width={25} height={25} />
        </View>
        <Divider />

        <View style={styles.info}>
          <View style={styles.line}>
            <Text status="primary" style={styles.item}>
              Всего продаж:
            </Text>
            <Text status="primary" style={styles.item}>
              {conReport.sales.cnt}
            </Text>
          </View>
          <View style={styles.line}>
            <Text status="primary" style={styles.item}>
              На сумму:
            </Text>
            <Text status="primary" style={styles.item}>
              {addSpaces(conReport.sales.summ)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Товаров
            </Text>
            <Text category="p2" style={styles.item}>
              {conReport.sales.products}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Средний чек
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.sales.avg)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Прибыль
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.sales.income)}
            </Text>
          </View>
        </View>
        <Divider />

        <View style={styles.info}>
          <View style={styles.line}>
            <Text status="primary" style={styles.item}>
              Оплачено:
            </Text>
            <Text status="primary" style={styles.item}>
              {addSpaces(
                conReport.payed.cach +
                conReport.payed.nonCach +
                conReport.payed.bonus
              )}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Наличными
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.payed.cach)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Безналом
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.payed.nonCach)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Бонусами
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.payed.bonus)}
            </Text>
          </View>
        </View>
        <Divider />

        <View style={styles.info}>
          <View style={styles.line}>
            <Text status="primary" style={styles.item}>
              Всего возвратов:
            </Text>
            <Text status="primary" style={styles.item}>
              {conReport.ret.cnt}
            </Text>
          </View>
          <View style={styles.line}>
            <Text status="primary" style={styles.item}>
              На сумму:
            </Text>
            <Text status="primary" style={styles.item}>
              {addSpaces(conReport.ret.summ)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Товаров
            </Text>
            <Text category="p2" style={styles.item}>
              {conReport.ret.products}
            </Text>
          </View>
        </View>
        <Divider />

        <View style={styles.info}>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Изъято из кассы
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.kassa.outSumm)}
            </Text>
          </View>
          <View style={styles.line}>
            <Text category="p2" style={styles.item}>
              Внесено в кассу
            </Text>
            <Text category="p2" style={styles.item}>
              {addSpaces(conReport.kassa.inSumm)}
            </Text>
          </View>
        </View>
      </RefreshScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrap: {flex: 1},
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  info: {
    padding: 16,
    paddingTop: 10,
  },
  line: {
    marginTop: 6,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});

export default ConReport;
