import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux';
import {logout} from '../../redux/actions/authActions';
import {deleteAccount} from '../../redux/actions/private/profileActions';
import {ProfileStackNavigator} from '../../utils/navigation.types';
import {show} from '../../utils/snackbar';
import Preloader from '../loaders/Preloader';

type Props = NativeStackScreenProps<ProfileStackNavigator, 'Delete'>;

const DeleteAccountModal: React.FC<Props> = ({navigation}) => {
  const styles = useStyleSheet(Styles);
  const goBack = () => navigation.goBack();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.profile.loading);

  const deleteAcc = () =>
    dispatch(deleteAccount()).then(res => {
      show({text: res, type: 'success'});
      dispatch(logout());
      goBack();
    });

  if (loading) return <Preloader />;

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.wrap}>
        <Layout style={styles.form}>
          <Text style={{textAlign: 'center'}} status="primary">
            Вы точно хотите удалить аккаунт?
          </Text>
          <Button
            disabled={false}
            style={{marginTop: 40}}
            status="danger"
            onPress={deleteAcc}>
            Удалить
          </Button>
          <Button
            disabled={false}
            style={{marginTop: 15}}
            appearance="outline"
            onPress={goBack}>
            Отмена
          </Button>
        </Layout>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleService.create({
  wrap: {
    flex: 1,
    backgroundColor: 'color-primary-transparent-100',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {padding: 30, borderRadius: 5, width: '100%'},
});

export default DeleteAccountModal;
