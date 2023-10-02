import React, {useEffect, useState, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {investmentRequest} from '../../../actions/GeneralActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  ParentAthleteTemplate,
  TopTabbar,
} from '../../../components';
import {strings, InvestmentsTabsArray} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from './styles';

const Investments = props => {
  const {refreshNow, tab} = props;
  const [tabs, setTabs] = useState(tab ? tab : 1);
  const [loading, setLoading] = useState(true);
  const [isListViewVisible, setIsListViewVisible] = useState(() => false);
  const {investments} = useSelector(state => state.general);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(
      investmentRequest({status: tabs == 1 ? 'completed' : 'refund'}, res => {
        setLoading(false);
      }),
    );
  }, [tabs]);

  useEffect(() => {
    if (investments.length > 0) {
      setIsListViewVisible(true);
    } else {
      setIsListViewVisible(false);
    }
  }, [investments]);

  const renderInvestments = useMemo(() => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={investments}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item}) => {
          if (item) {
            return (
              <ParentAthleteTemplate item={item} waletList onPress={() => {}} />
            );
          }
        }}
      />
    );
  }, [investments]);

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.WALLET}>
      <View style={styles.container}>
        <TopTabbar array={InvestmentsTabsArray} tabs={tabs} setTabs={setTabs} />
        {!loading && (
          <>
            {!isListViewVisible ? (
              <View style={{flex: 1, ...AppStyles.centerInner}}>
                <Text
                  size={22}
                  color={Colors.white}
                  textAlign="center"
                  style={AppStyles.mBottom10}>
                  Data Not Found
                </Text>
                <Text color={Colors.grey2} size={10}>
                  Data Not Found.
                </Text>
              </View>
            ) : (
              <>{renderInvestments}</>
            )}
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Investments;
