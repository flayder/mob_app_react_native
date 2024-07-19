import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Week: React.FC = () => {
  const theme = useTheme();

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.6 0H2.4C1.08 0 0 1.35 0 3V21C0 22.65 1.08 24 2.4 24H21.6C22.92 24 24 22.65 24 21V3C24 1.35 22.92 0 21.6 0ZM13.2 3H16.2V21H13.2V3ZM10.8 21H7.8V3H10.8V21ZM2.4 3H5.4V21H2.4V3ZM21.6 21H18.6V3H21.6V21Z"
        fill={theme['color-primary-500']}
      />
    </Svg>
  );
};

export default Week;
