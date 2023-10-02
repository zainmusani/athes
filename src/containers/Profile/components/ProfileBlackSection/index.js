// @flow
import React, {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {Image, View, Keyboard, FlatList} from 'react-native';
import styles from './styles';
import {Text, ScreenWrapper, ButtonView} from '../../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import {debug} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const ProfileBlackSection = props => {
  const {
    array,
    array_type,
    publicView,
    title,
    user_role,
    calendar,
    isViewAllButtonVisible,
    viewAppButtonPress,
    parent_id,
  } = props;

  const loggedInUser = useSelector(state => state.user.data)

  const itemClicked = item => {
    
    if (array_type == 'team' || array_type == 'players') {
      Actions.pop();
      Actions.profile({
        userId: item.id,
        requested_role: array_type == 'team' ? user_role : item.role_id,
        publicView: publicView,
      });
    }
    if (array_type == 'child') {
      Actions.pop();
      if (parent_id == loggedInUser.id) {
        Actions.push('profile', {
          child_data: item,
          userId: item.id,
          isParentAthleteManagementView: loggedInUser.id == parent_id,
        });
      } else {
        Actions.push('profile', {
          userId: item.id,
          requested_role: item.role_id,
          publicView: loggedInUser.id != item.id,
        });
      }
    }
    if (array_type == 'season') {
      
      let newItem = _.cloneDeep(item);
      newItem.seasonId = newItem.id;
      Actions.seasonDetail({
        isCreatorView: !publicView,
        isEnrollButton: publicView,
        data: newItem,
      });
    }
    if (array_type == 'facility') {
      Actions.facilityDetail({facilityId: item.id, isPublicView: publicView});
    }
  };

  return (
    <View style={styles.eventDetailMainView2}>
      <View style={{...AppStyles.flexRow, justifyContent: 'space-between'}}>
        <Text style={styles.teamText}>{title}</Text>

        {isViewAllButtonVisible && (
          <ButtonView onPress={viewAppButtonPress} style={{marginRight: 20}}>
            <Text
              color={Colors.grey6}
              size={Fonts.size.xxSmall}
              style={{marginTop: 2}}>
              View All
            </Text>
          </ButtonView>
        )}
      </View>
      <FlatList
        data={array}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              {calendar ? (
                <>
                  <Text
                    color={Colors.grey6}
                    size={Fonts.size.xxSmall}
                    style={{marginTop: 2}}>
                    {item.month} {item.year}
                  </Text>
                  <View style={{...AppStyles.flexRow}}>
                    {item.dates.map(date => {
                      return (
                        <ButtonView style={styles.innerRound}>
                          <Text color={Colors.black}>{date}</Text>
                        </ButtonView>
                      );
                    })}
                  </View>
                </>
              ) : (
                <ButtonView
                  onPress={() => itemClicked(item)}
                  style={styles.teamIcon}>
                  
                  <FastImage
                    style={styles.teamIconImg}
                    source={{
                      uri: item?.photo || item?.image || Images.userEmptyImage,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </ButtonView>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

ProfileBlackSection.propTypes = {
  calendar: PropTypes.bool,
  viewAllLink: PropTypes.func,
  publicView: PropTypes.bool,
  isViewAllButtonVisible: PropTypes.bool,
  viewAppButtonPress: PropTypes.func,
  array_type: PropTypes.string,
  user_role: PropTypes.string,
};

ProfileBlackSection.defaultProps = {
  calendar: false,
  viewAllLink: () => {},
  isViewAllButtonVisible: false,
  publicView: true,
  viewAppButtonPress: () => {},
  array_type: '',
  user_role: '',
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ProfileBlackSection);
