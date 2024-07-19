import {Text} from '@ui-kitten/components';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {convertDate, DateRange} from '../../../../../utils';
import Sort from '../../../../icons/Sort';

type Props = {
  date: DateRange;
  reduce: boolean;
  setReduce: () => void;
};

const DateRangeAndSort: React.FC<Props> = ({date, reduce, setReduce}) => {
  return (
    <View style={styles.wrap}>
      <Text category="p2" appearance="hint">
        {convertDate(date.datebegin, false)} -{' '}
        {convertDate(date.dateend, false)}
      </Text>
      <TouchableOpacity onPress={setReduce}>
        <Sort def={!reduce} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DateRangeAndSort;
