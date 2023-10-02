import React, { useEffect, useState } from 'react';
import {View, FlatList, Image, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {
  ButtonView,
  EventTemplate,
  Loader,
  ScreenWrapper,
  Text,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {getOwnFacilitiesRequest} from '../../../actions/Facility';

const Facility = props => {
  const {ownFacilitiesList} = useSelector(state => state.facility);
  const {isListViewVisible = !!ownFacilitiesList.length} = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getOwnFacilities();
  }, []);

  const getOwnFacilities = () => {
    dispatch(
      getOwnFacilitiesRequest({limit: 300, offset: 0}, (res, err) => {
        setLoading(true);
        if (res) setLoading(false);
      }),
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      headerTitle={strings.MANAGE_FACILITIES}>
      {!isListViewVisible && (
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
      )}

      {isListViewVisible && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={ownFacilitiesList}
          style={{flex: 1}}
          // onRefresh={() => {
          //   setLoading(true);
          //   getOwnFacilities();
          // }}
          // refreshing={loading}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                setLoading(true);
                getOwnFacilities();
              }}
              tintColor={Colors.black}
            />
          }
          renderItem={({item}) => {
            return (
              <EventTemplate
                item={item}
                onPress={() => Actions.facilityDetail({facilityId: item.id})}
              />
            );
          }}
        />
      )}

      <ButtonView
        style={styles.addIconButton}
        onPress={() => Actions.addFacility()}>
        <Image source={Images.addIconBlack} />
      </ButtonView>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default Facility;
