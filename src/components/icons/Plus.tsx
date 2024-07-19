import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Plus: React.FC = () => {
  const theme = useTheme();

  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.59657 20V12.1399H0V7.90123H7.59657V0H12.4034V7.90123H20V12.1399H12.4034V20H7.59657Z"
        fill={theme['color-basic-100']}
      />
    </Svg>
  );
};

export default Plus;
