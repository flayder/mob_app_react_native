import React, {useEffect, useState} from 'react';
import {PieChart as SvgPieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import {getColor} from '../../../../../utils';
import {TopSalesDetail} from '../../../../../utils/api.types';

type RenderItem = {
  key: number;
  amount: number;
  svg: {fill: string};
};

type Props = {
  details: TopSalesDetail[];
};

const PieChart: React.FC<Props> = ({details}) => {
  const [data, setData] = useState<RenderItem[]>([]);

  useEffect(() => {
    const percent =
      details.reduce((acc, detail) => acc + detail.amount, 0) / 100;

    setData(
      details.map((detail, index) => ({
        key: index,
        amount: detail.amount / percent,
        svg: {fill: getColor(index)},
      })),
    );
  }, [details]);

  const Labels = ({slices}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}>
          {data.amount.toFixed(0) + '%'}
        </Text>
      );
    });
  };

  return (
    <SvgPieChart
      style={{height: 327, marginTop: 39, marginBottom: 20}}
      valueAccessor={({item}) => item.amount}
      data={data}
      innerRadius={'50%'}
      outerRadius={'100%'}>
      <Labels />
    </SvgPieChart>
  );
};

export default PieChart;
