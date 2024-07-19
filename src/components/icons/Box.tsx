import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Box: React.FC = () => {
  const theme = useTheme();
  return (
    <Svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <Path
        d="M137.5 43.75L75 12.5L12.5 43.75V106.25L75 137.5L137.5 106.25V43.75Z"
        stroke={theme['color-primary-500']}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5005 43.75L75.0005 75"
        stroke={theme['color-primary-500']}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M75.0005 137.5V75"
        stroke={theme['color-primary-500']}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M137.5 43.75L75.0005 75"
        stroke={theme['color-primary-500']}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M106.25 28.125L43.7505 59.375"
        stroke={theme['color-primary-500']}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Box;
