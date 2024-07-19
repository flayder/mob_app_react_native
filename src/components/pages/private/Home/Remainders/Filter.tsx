import {Icon, Input, Text, Tooltip, Button} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import ThemeContext from '../../../../../context/ThemeContext';
import {useAppSelector} from '../../../../../redux';

type Props = {
  cnt: string;
  setCnt: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

const Filter: React.FC<Props> = ({
  cnt,
  setCnt,
  filter,
  setFilter,
  handleSearch,
}) => {
  const {theme} = useContext(ThemeContext);

  const loading = useAppSelector(state => state.remainders.loading);

  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => setVisible(!visible);

  const onSearch = () => {
    handleSearch();
    Keyboard.dismiss();
  };

  return (
    <View style={{padding: 16}}>
      <Text style={{textAlign: 'center'}}>Фильтр</Text>
      <Input
        value={cnt}
        onChangeText={setCnt}
        returnKeyLabel="Готово"
        returnKeyType="done"
        keyboardType="number-pad"
        keyboardAppearance={theme}
        selectTextOnFocus
        style={{marginTop: 8}}
        placeholder="Остаток"
        accessoryRight={props => (
          <Tooltip
            placement={'bottom end'}
            anchor={() => (
              <TouchableOpacity onPress={toggle}>
                <Icon {...props} name="info-outline" />
              </TouchableOpacity>
            )}
            visible={visible}
            onBackdropPress={() => setVisible(false)}>
            Показать товары с остатком меньше указанного
          </Tooltip>
        )}
      />
      <Input
        value={filter}
        onChangeText={setFilter}
        selectTextOnFocus
        keyboardAppearance={theme}
        style={{marginTop: 16}}
        placeholder="Товар"
      />
      <Button disabled={loading} onPress={onSearch} style={{marginTop: 16}}>
        Поиск
      </Button>
    </View>
  );
};

export default Filter;
