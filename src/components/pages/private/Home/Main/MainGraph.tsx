import {IndexPath, Select, SelectItem, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useAppSelector} from '../../../../../redux';
import {convertDate, graphPrice} from '../../../../../utils';
import {DateSelect} from './Main';

type Props = {
  displayValue: DateSelect;
  selectedIndex: IndexPath;
  setSelectedIndex: React.Dispatch<React.SetStateAction<IndexPath>>;
  data: DateSelect[];
};

const MainGraph: React.FC<Props> = ({
  displayValue,
  selectedIndex,
  setSelectedIndex,
  data,
}) => {
  const mainGraph = useAppSelector(state => state.main.mainGraph);

  const [datasets, setDatasets] = useState({
    labels: [],
    datasets: [
      {
        data: [0],
        color: () => '#0066FF',
        strokeWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const dataset = {
      labels: mainGraph.map(graph => convertDate(graph.date)),
      datasets: [
        {
          data: mainGraph.map(graph => graph.summ),
          color: () => '#0066FF',
          strokeWidth: 2,
        },
        {
          data: mainGraph.map(graph => graph.income),
          color: () => '#96C0FF',
          strokeWidth: 2,
        },
      ],
    };
    if (mainGraph.length) setDatasets(dataset);
  }, [mainGraph]);

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: () => `gray`,
    labelColor: () => `black`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: 'white',
    },
  };

  const renderOption = (data: DateSelect, index: number) => (
    <SelectItem title={data.name} key={index} />
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.select}>
        <Select
          style={{flex: 1.2}}
          placeholder="Дата"
          value={displayValue.name}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index as IndexPath)}>
          {data.map(renderOption)}
        </Select>
        <View style={{flex: 2, alignItems: 'flex-end'}}>
          <Text category="p2" appearance="hint">
            {convertDate(displayValue.date.datebegin, false) +
              ' - ' +
              convertDate(displayValue.date.dateend, false)}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <View
          style={{
            ...styles.dot,
            backgroundColor: '#0066FF',
          }}
        />
        <Text category="label">Продажи</Text>
        <View
          style={{
            ...styles.dot,
            backgroundColor: '#96C0FF',
            marginLeft: 16,
          }}
        />
        <Text category="label">Прибыль</Text>
      </View>

      {mainGraph.length ? (
        <LineChart
          style={{marginTop: 15}}
          data={datasets}
          width={screenWidth}
          height={256}
          chartConfig={chartConfig}
          formatYLabel={graphPrice}
          bezier
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingVertical: 16},
  select: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16},
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  dot: {width: 8, height: 8, borderRadius: 8, marginRight: 4},
  graph: {
    width: 100,
    height: 180,
    transform: [{rotate: '-90deg'}],
    justifyContent: 'center',
  },
  cnt: {
    backgroundColor: '#0066FF',
    borderRadius: 2,
    paddingVertical: 5,
    minWidth: 70,
    transform: [{translateX: -40}],
  },
  income: {
    backgroundColor: '#5E9CFA',
    marginTop: 6,
    borderRadius: 2,
    paddingVertical: 5,
    minWidth: 70,
    transform: [{translateX: -40}],
  },
  text: {color: 'white', textAlign: 'center'},
});

export default MainGraph;
