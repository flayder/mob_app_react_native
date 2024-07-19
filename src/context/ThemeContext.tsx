import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@ui-kitten/components';
import React, {createContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {useAppSelector} from '../redux';

export type Theme = 'light' | 'dark';

type TThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<TThemeContext>({
  theme: 'light',
  toggleTheme: () => {},
});

type Props = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContextProvider: React.FC<Props> = ({
  children,
  theme,
  setTheme,
}) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const uiTheme = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      AsyncStorage.setItem('theme', 'dark').then(() => setTheme('dark'));
    } else {
      AsyncStorage.setItem('theme', 'light').then(() => setTheme('light'));
    }
  };

  useEffect(() => {
    changeNavigationBarColor(
      uiTheme['background-basic-color-1'],
      theme === 'light' ? true : false,
      true,
    );
  }, [theme, uiTheme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <StatusBar
        backgroundColor={
          isAuth
            ? uiTheme['color-primary-800']
            : uiTheme['background-basic-color-1']
        }
        barStyle={
          isAuth
            ? 'light-content'
            : theme === 'light'
            ? 'dark-content'
            : 'light-content'
        }
      />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
