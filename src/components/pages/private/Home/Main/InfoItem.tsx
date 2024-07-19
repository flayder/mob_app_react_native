import {Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {addSpaces} from '../../../../../utils';
import {MainDataObject} from '../../../../../utils/api.types';

type Props = {
  title: string;
  info: MainDataObject;
};

const InfoItem: React.FC<Props> = ({title, info}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} status="primary">
        {title}
      </Text>
      <View style={{...styles.row, marginTop: 8}}>
        <Text category="p2">Продаж:</Text>
        <Text category="p2" status="primary">
          {info.cnt}
        </Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text category="p2">На сумму:</Text>
        <Text category="p2" status="primary">
          {addSpaces(info.summ)}
        </Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text category="p2">Прибыль:</Text>
        <Text category="p2" status="primary">
          {addSpaces(info.income)}
        </Text>
      </View>
      <View style={{...styles.row, marginTop: 12}}>
        <Text category="p2">Средний чек:</Text>
        <Text category="p2" status="primary">
          {addSpaces(info.avg)}
        </Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  title: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 28,
  },
});

export default InfoItem;
