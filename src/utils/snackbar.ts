import Snackbar from 'react-native-snackbar';

type Snack = {
  text: string;
  type: 'success' | 'error';
};

export const show = ({text, type = 'success'}: Snack): void =>
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: type === 'success' ? '#00E096' : '#FF3D71',
  });
