import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Clock: React.FC = () => {
  const theme = useTheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0ZM12 21.6C6.7068 21.6 2.4 17.2932 2.4 12C2.4 6.7068 6.7068 2.4 12 2.4C17.2932 2.4 21.6 6.7068 21.6 12C21.6 17.2932 17.2932 21.6 12 21.6Z"
        fill={theme['color-primary-500']}
      />
      <Path d="M13 7H11V13H17V11H13V7Z" fill={theme['color-primary-500']} />
    </Svg>
  );
};

export default Clock;
