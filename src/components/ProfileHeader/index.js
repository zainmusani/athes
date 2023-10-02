import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {Image, ImageBackground, StatusBar, View} from 'react-native';
import {Button, ButtonView, Text} from '..';
import {strings, UserRoles} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import _ from 'lodash';
import {
  getFollowersRequest,
  getFollowingsRequest,
} from '../../actions/UserActions';
import {useSelector} from 'react-redux';
import util from '../../util';
import FastImage from 'react-native-fast-image';

const ProfileHeader = props => {
  const {
    buttonText,
    buttonOnPress,
    isPublicView,
    isParentAthleteManagementView,
    backButtonOnPress,
    secondButtonText,
    secondButtonOnPress,
    showButton,
  } = props;

  const {followers, following} = useSelector(
    state => state.profile.profileDetail,
  );

  const {user, isMember} = useSelector(state => state.profile.profileDetail);

  const sheetRef = useRef(null);

  const selectProfileView = (url, thumbnail = '') => {
    sheetRef.current?.close();
    Actions.profileImageView({
      src: url,
      thumbnail: thumbnail,
    });
  };

  return (
    <>
      {user && (
        <>
          <View style={styles.profileHeader}>
            <ImageBackground
              source={{uri: user?.detail?.coverphoto || user?.cover}}
              style={styles.profileBGImage}>
              <StatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor="transparent"
              />
              <View style={styles.bgOverlay}></View>
              <View style={styles.topArea}>
                <ButtonView
                  style={styles.btnWrapper}
                  onPress={() => backButtonOnPress()}>
                  <Image
                    source={Images.back_btn}
                    size={styles.btnImage}
                    style={{tintColor: Colors.white}}
                  />
                </ButtonView>
              </View>
              <View
                style={{
                  ...AppStyles.flexRow,
                  ...AppStyles.mBottom20,
                  ...AppStyles.mTop20,
                }}>
                {/* <ButtonView onPress={() => Actions.profileImageView({ src: {uri: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4'}, hasIntroVideo: true })}> */}
                <ButtonView onPress={() => sheetRef.current?.open()}>
                  <FastImage
                    style={styles.profileImg}
                    source={{
                      uri: user?.detail?.photo || user?.image,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </ButtonView>
                <View style={{justifyContent: 'center', ...AppStyles.pLeft10}}>
                  <Text
                    size={Fonts.size.medium}
                    type={Fonts.type.medium}
                    bold="500"
                    color={Colors.white}
                    style={
                      isParentAthleteManagementView
                        ? AppStyles.mBottom5
                        : styles.profileName
                    }>
                    {user.role_id == 4
                      ? user.detail.team_name
                      : user.role_id == 5
                      ? user.detail.organization_name
                      : user.name || user.username}
                  </Text>

                  {isParentAthleteManagementView && (
                    <Text
                      size={Fonts.size.xxxSmall}
                      type={Fonts.type.base}
                      bold="400"
                      color={Colors.white}>
                      @{user.username || user.name}
                    </Text>
                  )}

                  <>
                    {!isParentAthleteManagementView && (
                      <View
                        style={{
                          ...AppStyles.flexRow,
                          ...AppStyles.mBottom10,
                          ...AppStyles.mTop10,
                        }}>
                        <ButtonView
                          onPress={() => {
                            Actions.replace('followers', {
                              hasFollowers: true,
                              isPublicView,
                              isProfileView: true,
                              userId: user.id,
                              request: getFollowersRequest,
                            });
                          }}>
                          <Text
                            textAlign="center"
                            size={Fonts.size.medium}
                            type={Fonts.type.medium}
                            bold="500"
                            color={Colors.white}>
                            {followers}
                          </Text>
                          <Text
                            size={12}
                            type={Fonts.type.medium}
                            bold="500"
                            color={Colors.whiteGrey}>
                            Followers
                          </Text>
                        </ButtonView>
                        <View style={styles.seprator}></View>
                        <ButtonView
                          onPress={() => {
                            Actions.replace('followers', {
                              // hasFollowers: true,
                              userId: user.id,
                              isPublicView,
                              isProfileView: true,
                              request: getFollowingsRequest,
                            });
                          }}>
                          <Text
                            textAlign="center"
                            size={Fonts.size.medium}
                            type={Fonts.type.medium}
                            bold="500"
                            color={Colors.white}>
                            {following}
                          </Text>
                          <Text
                            size={12}
                            type={Fonts.type.medium}
                            bold="500"
                            color={Colors.whiteGrey}>
                            Following
                          </Text>
                        </ButtonView>
                      </View>
                    )}

                    {!isParentAthleteManagementView && (
                      <>
                        <Text
                          size={12}
                          type={Fonts.type.medium}
                          bold="500"
                          color={Colors.whiteGrey}
                          style={{
                            ...AppStyles.mBottom10,
                            textTransform: 'capitalize',
                          }}>
                          {util.getRoleNameByID(user.role_id)}
                        </Text>
                        <View
                          style={
                            isPublicView
                              ? [AppStyles.flexRow, AppStyles.alignItemsCenter]
                              : {}
                          }>
                          <View style={{...AppStyles.flexRow, width: 165}}>
                            {showButton && 
                            <ButtonView
                              onPress={buttonOnPress}
                              style={[
                                styles.editBtn,
                                isPublicView &&
                                  !_.isEmpty(secondButtonText) && {
                                    marginRight: 10,
                                  },
                              ]}>
                              <Text
                                type={Fonts.type.medium}
                                bold="500"
                                size={Fonts.size.xSmall}>
                                {buttonText}
                              </Text>
                            </ButtonView>
                            }

                            {isMember == 1 && isPublicView ? (
                              <View
                                style={[
                                  styles.editBtn,
                                  {backgroundColor: Colors.grey5},
                                ]}>
                                <Text
                                  color={Colors.grey2}
                                  type={Fonts.type.medium}
                                  bold="500"
                                  size={Fonts.size.xSmall}>
                                  {secondButtonText}
                                </Text>
                              </View>
                            ) : (
                              <>
                                {!_.isEmpty(secondButtonText) && (
                                  <ButtonView
                                    onPress={secondButtonOnPress}
                                    style={[
                                      styles.editBtn,
                                      isPublicView &&
                                        !_.isEmpty(secondButtonText) &&
                                        {},
                                    ]}>
                                    <Text
                                      type={Fonts.type.medium}
                                      bold="500"
                                      size={Fonts.size.xSmall}>
                                      {secondButtonText}
                                    </Text>
                                  </ButtonView>
                                )}
                              </>
                            )}
                          </View>
                          {isPublicView && (
                            <ButtonView
                              style={AppStyles.mLeft10}
                              onPress={() => {
                                Actions.messageView({item: user});
                              }}>
                              <Image source={Images.chatIconWhite} />
                            </ButtonView>
                          )}
                        </View>
                      </>
                    )}
                  </>
                </View>
              </View>

              {/* {isPublicView && <Text style={styles.feedText}>Feed</Text>} */}
            </ImageBackground>
          </View>
          <RBSheet
            ref={sheetRef}
            height={Platform.OS === 'ios' ? 240 : 220}
            openDuration={250}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                // alignItems: 'center',
              },
              container: styles.commentContainer,
            }}>
            <ButtonView
              onPress={() =>
                selectProfileView(user?.detail?.photo || user?.image)
              }
              style={{
                ...AppStyles.pLeft30,
                ...AppStyles.pRight30,
                ...AppStyles.paddingVerticalBase,
                ...AppStyles.flexRow,
              }}>
              <Image source={Images.eyeIcon} style={AppStyles.mRight20} />
              <Text>View Profile Photo</Text>
            </ButtonView>
            <ButtonView
              onPress={() => selectProfileView(user.detail.coverphoto)}
              style={{
                ...AppStyles.pLeft30,
                ...AppStyles.pRight30,
                ...AppStyles.paddingVerticalBase,
                ...AppStyles.flexRow,
              }}>
              <Image source={Images.eyeIcon} style={AppStyles.mRight20} />
              <Text>View Cover Photo</Text>
            </ButtonView>
            <ButtonView
              onPress={() =>
                selectProfileView(user.detail.video, user.detail.thumbnail)
              }
              style={{
                ...AppStyles.pLeft30,
                ...AppStyles.pRight30,
                ...AppStyles.paddingVerticalBase,
                ...AppStyles.flexRow,
              }}>
              <Image source={Images.eyeIcon} style={AppStyles.mRight20} />
              <Text>View Intro Video</Text>
            </ButtonView>
          </RBSheet>
        </>
      )}
    </>
  );
};

ProfileHeader.propTypes = {
  buttonText: PropTypes.string,
  buttonOnPress: PropTypes.func,
  secondButtonText: PropTypes.string,
  secondButtonOnPress: PropTypes.func,
  isPublicView: PropTypes.bool,
  isParentAthleteManagementView: PropTypes.bool,
  backButtonOnPress: PropTypes.func,
  showButton: PropTypes.bool,
};
ProfileHeader.defaultProps = {
  buttonText: strings.EDIT,
  buttonOnPress: () => {},
  secondButtonText: '',
  secondButtonOnPress: () => {},
  isPublicView: false,
  isParentAthleteManagementView: false,
  backButtonOnPress: () => {
    Actions.pop();
  },
  showButton: true,
};

export default ProfileHeader;
