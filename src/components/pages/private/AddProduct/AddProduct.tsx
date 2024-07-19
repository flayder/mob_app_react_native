import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Layout, List, useTheme} from '@ui-kitten/components';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux';
import {getRemainders} from '../../../../redux/actions/private/remaindersActions';
import {TradeSessionDetail} from '../../../../redux/types/private/trade.types';
import {PrivateStackNavigator} from '../../../../utils/navigation.types';
import FooterLoader from '../../../general/FooterLoader';
import ListItem from '../../../general/ListItem';
import Preloader from '../../../loaders/Preloader';
import ListHeaderComponent from './ListHeaderComponent';

type Props = {
  navigation: NativeStackNavigationProp<PrivateStackNavigator, 'AddProduct'>;
};

const AddProduct: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const currentGTochkaId = useAppSelector(
    state => state.main.tradePoint?.gTochkaId,
  );

  const remainders = useAppSelector(state => state.remainders);
  const details = useAppSelector(state => state.remainders.data.details);
  const loading = useAppSelector(state => state.remainders.loading);
  const refreshing = useAppSelector(state => state.remainders.refreshing);

  const [search, setSearch] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);
  const initiation = useRef<boolean>(false)
  const timeout = useRef<any>(null)

  const loadRemainders = useCallback(
    (
      refreshing: boolean,
      loadMore: boolean,
      page: number,
      descending: boolean,
    ) => {
      if (currentGTochkaId)
        return dispatch(
          getRemainders(
            refreshing,
            loadMore,
            currentGTochkaId,
            page,
            false,
            '',
            search,
            30,
            'name'
          ),
        );
    },
    [currentGTochkaId, search],
  );

  useEffect(() => {
    loadRemainders(false, false, 0, remainders.descending);
  }, [remainders.descending]);

  useEffect(() => {
    if(initiation.current) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        //console.log('ini')
        loadRemainders(false, false, 0, remainders.descending);
      }, 1500);
    }
    initiation.current = true
  }, [search])

  const handleRefresh = () =>
    loadRemainders(true, false, 0, remainders.descending);

  const handleLoadMore = () => {
    if (isDataLoaded && remainders.data.hasNext) {
      setIsDataLoaded(false);
      loadRemainders(
        false,
        true,
        remainders.data.currentPage + 1,
        false,
      )
        ?.then(() => setIsDataLoaded(true))
        .catch(() => setIsDataLoaded(true));
    }
  };

  const navToAddProductModal = (detail: TradeSessionDetail) =>
    navigation.navigate('AddProductModal', {
      detail,
      callback: () => setTimeout(navigation.goBack, 100),
      type: 'new',
    });

  const RenderFooter = () => (isDataLoaded ? <Fragment /> : <FooterLoader />);

  if (loading && !focus) return <Preloader />;

  return (
    <Layout style={{flex: 1}}>
      <ListHeaderComponent value={search} setValue={setSearch} setFocus={setFocus} />
      {
        loading && focus
        ?
        <Preloader />
        :
        <List
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          ListFooterComponent={RenderFooter}
          style={{
            backgroundColor: theme['background-basic-color-1'],
            paddingVertical: 10,
          }}
          data={details.map<TradeSessionDetail>(detail => ({
            ...detail,
            remainder: detail.amount,
          }))}
          renderItem={props => (
            <ListItem {...props} theme={theme} onPress={navToAddProductModal} />
          )}
        />
      }
      
    </Layout>
  );
};

export default AddProduct;
