// @flow
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Image, View, Keyboard, FlatList, ImageBackground} from 'react-native';
import styles from './styles';
import {Text, ScreenWrapper, ButtonView} from '../../../../components';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const SessionEventTemplate = props => {
  const {
    array,
    isPublicView,
    title,
    isViewAllButtonVisible,
    viewAppButtonPress,
  } = props;

  const pressedEvent = item => {
    
    let newItem = _.cloneDeep(item);
    switch (newItem.type) {
      case 'event':
        newItem.eventId = newItem.id;
        Actions.eventDetail({
          data: newItem,
          isUserEnroll: !isPublicView,
        });
        return true;
      case 'season':
        newItem.seasonId = newItem.id;
        Actions.seasonDetail({
          data: newItem,
          isUserEnroll: !isPublicView,
        });
        return true;
      case 'session':
        newItem.sessionId = newItem.id;
        Actions.sessionDetail({
          data: newItem,
          isUserEnroll: !isPublicView,
        });
        return true;
      default:
        Actions.facilityDetail({
          facilityId: newItem.id,
          isPublicView: isPublicView,
        });
        return;
    }
  };

  return (
    <>
      {!!array?.length && (
        <View
          style={{
            ...AppStyles.mTop20,
            paddingHorizontal: 20,
            ...AppStyles.flexRow,
            justifyContent: 'space-between',
          }}>
          {title && (
            <Text
              style={{
                color: Colors.white,
                fontSize: 18,
                fontFamily: Fonts.type.base,
              }}>
              {title}
            </Text>
          )}
          {isViewAllButtonVisible && (
            <ButtonView onPress={viewAppButtonPress}>
              <Text
                color={Colors.white}
                size={Fonts.size.xxSmall}
                style={{marginTop: 2}}>
                View All
              </Text>
            </ButtonView>
          )}
        </View>
      )}
      <FlatList
        data={array}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[AppStyles.pLeft20, AppStyles.mTop15]}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const evenIndex = index % 2 == 1;
          const date = item?.startDate || item?.date;

          return (
            <ButtonView
              style={styles.eventDetailMainView3}
              onPress={() => pressedEvent(item)}>
              <FastImage
                style={styles.eventDetailImg}
                source={{
                  uri: item?.image,
                  // headers: {Authorization: 'default'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0.5}}
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={styles.eventDetailView3}>
                {date && (
                  <View
                    style={evenIndex ? styles.yearViewEven : styles.yearView}>
                    <Text
                      style={evenIndex ? styles.yearTextEven : styles.yearText}>
                      {date?.slice(0, 4)}
                    </Text>
                  </View>
                )}
                <Text style={styles.seasonName}>{item?.title}</Text>
              </LinearGradient>
            </ButtonView>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SessionEventTemplate);
