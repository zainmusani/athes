import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {ButtonView, Text} from '..';
import {userSignOutRequest} from '../../actions/UserActions';
import {DrawerMenu, strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import styles from './ScreenWrapperStyles';

const ScreenWrapperView = props => {
  const {
    renderHeaderLeft,
    renderHeaderTitle,
    renderHeaderRight,
    renderHeaderSearch,
    hasBack,
    headerTitle,
    headerTitleStyle,
    leftBtnImage,
    leftBtnPress,
    leftBtnText,
    rightBtnImage,
    rightBtnPress,
    rightBtnText,
    headerTitleColor,
    hasBorder,
    style,
    hasSearch,
    onSearchText,
    isSearching,
    headerbackground,
    headerGradientBG,
    pageBackground,
    currentTab,
    setCurrentTab,
    showMenu,
    setShowMenu,
    minimizeScreen,
    scaleValue,
    offsetValue,
    closeButtonOffset,
    sideMenu,
    menuItem,
    hideNav,
    hideStatusBar,
    secondRightBtnVisible,
    secondRightBtnImage,
    secondRightBtnPress,
    user,
    rightBtnSecondImg,
    notificationCount,
    rightBtnSecondPress,
  } = props;

  const dispatch = useDispatch(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileName = user.name;

  return (
    <View style={[styles.page, style]}>
      {headerGradientBG ? (
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
      ) : (
        <StatusBar
          backgroundColor={
            headerbackground !== 'transparent'
              ? headerbackground
              : showMenu
              ? Colors.graybrown
              : pageBackground
          }
          barStyle={'light-content'}
          hidden={hideStatusBar}
          translucent={hideStatusBar}
        />
      )}
      <View style={styles.DrawerTitle}>
        <Image source={Images.logo} style={{width: 95, height: 15}} />
      </View>

      <View
        style={{
          flex: 1,
          ...AppStyles.paddingHorizontalBase,
          width: Metrics.screenWidth / 1.6,
        }}>
        <ButtonView
          style={{flexDirection: 'row'}}
          onPress={() => {
            Actions.profile();
            minimizeScreen();
          }}>
          <FastImage
            style={styles.userImage}
            source={{
              uri: user.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{justifyContent: 'center', ...AppStyles.pLeft10}}>
            <Text
              size={Fonts.size.normal}
              type={Fonts.type.bold}
              bold="700"
              color={Colors.white}>
              {profileName}
            </Text>
            <View>
              <Text
                size={Fonts.size.xxxxSmall}
                type={Fonts.type.medium}
                color={Colors.grey3}
                bold="500">
                View Profile
              </Text>
            </View>
          </View>
        </ButtonView>
        <View style={styles.sideMenu}>
          {menuItem(currentTab, setCurrentTab, DrawerMenu.home)}

          {menuItem(currentTab, setCurrentTab, DrawerMenu.calendar)}

          {menuItem(currentTab, setCurrentTab, DrawerMenu.manage_tab)}

          {menuItem(currentTab, setCurrentTab, DrawerMenu.groups)}

          {menuItem(currentTab, setCurrentTab, DrawerMenu.settings)}
        </View>
      </View>
      {/* App Version Number */}

      {/* <Text
        size={Fonts.size.xxSmall}
        type={Fonts.type.medium}
        bold="500"
        color={Colors.grey2}
        style={{...AppStyles.mLeft30, ...AppStyles.mBottom20}}>
        Version No: {Platform.OS == 'ios' ? '1.5.9' : '3.2.0'}
      </Text> */}

      <ButtonView
        onPress={() => {
          setIsLoggingOut(true);
          dispatch(
            userSignOutRequest(res => {
              setIsLoggingOut(false);
              if (res) Actions.reset('login');
            }),
          );
        }}
        style={styles.logoutBtnWrap}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0.25}}
          colors={[Colors.white, Colors.white]}
          style={styles.logoutBtn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.logout} style={{tintColor: Colors.black}} />
            {isLoggingOut ? (
              <ActivityIndicator size={'small'} style={{marginLeft: 20}} />
            ) : (
              <Text color={Colors.black} style={{...AppStyles.mLeft10}}>
                {strings.LOGOUT}
              </Text>
            )}
          </View>
          <Image source={Images.back_btn} style={styles.backBtn} />
        </LinearGradient>
      </ButtonView>

      <Animated.View
        style={{
          backgroundColor: pageBackground,
          borderRadius: showMenu ? 35 : 0,
          ...styles.frontPageStyles,
          // Transforming View...
          transform: [{scale: scaleValue}, {translateX: offsetValue}],
        }}>
        {
          // Menu Button...
        }

        <Animated.View
          style={{
            flexGrow: 1,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}>
          {showMenu && (
            <ButtonView
              onPress={minimizeScreen}
              style={styles.minimize}></ButtonView>
          )}
          {!hideNav && (
            <View>
              {headerbackground && (
                <View
                  style={[
                    {backgroundColor: headerbackground},
                    styles.gradientStyles,
                  ]}></View>
              )}
              {headerGradientBG && (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0.5, y: 0.1}}
                  colors={[Colors.graybrown, Colors.black]}
                  style={styles.gradientStyles}></LinearGradient>
              )}
              <View
                style={[
                  styles.headerContainer,
                  hasBorder ? styles.borderBottom : {},
                  hasSearch ? styles.searchHeader : {},
                  {
                    backgroundColor: headerGradientBG,
                    marginTop:
                      Platform.OS == 'android' && headerGradientBG ? 30 : 0,
                  },
                ]}>
                <View
                  style={[
                    AppStyles.flexRow,
                    {justifyContent: 'space-between'},
                  ]}>
                  {renderHeaderLeft(
                    leftBtnImage,
                    leftBtnPress,
                    leftBtnText,
                    hasBack,
                    sideMenu,
                  )}

                  {renderHeaderTitle(
                    headerTitle,
                    headerTitleColor,
                    headerTitleStyle,
                  )}

                  {renderHeaderRight(
                    rightBtnImage,
                    rightBtnPress,
                    rightBtnText,
                    rightBtnSecondImg,
                    notificationCount,
                    rightBtnSecondPress,
                  )}

                  {secondRightBtnVisible && (
                    <ButtonView
                      style={styles.chatIconView}
                      onPress={secondRightBtnPress}>
                      <Image
                        source={secondRightBtnImage}
                        style={{tintColor: Colors.white}}
                      />
                    </ButtonView>
                  )}
                </View>

                {hasSearch && (
                  <View style={AppStyles.centerInner}>
                    {renderHeaderSearch(onSearchText, isSearching)}
                  </View>
                )}
              </View>
            </View>
          )}
          <View style={{flexGrow: 1}}>{props.children}</View>
        </Animated.View>
      </Animated.View>

      {/* SideMenu End */}
    </View>
  );
};

ScreenWrapperView.propTypes = {
  hasBack: PropTypes.bool,
  headerTitle: PropTypes.string,
  headerTitleStyle: PropTypes.object,
  leftBtnImage: PropTypes.number,
  leftBtnPress: PropTypes.func,
  leftBtnText: PropTypes.string,
  rightBtnImage: PropTypes.number,
  rightBtnPress: PropTypes.func,
  rightBtnText: PropTypes.string,
  headerTitleColor: PropTypes.string,
  hasBorder: PropTypes.bool,
  style: PropTypes.object,
  hasSearch: PropTypes.bool,
  hideNav: PropTypes.bool,
  sideMenu: PropTypes.bool,
  onSearchText: PropTypes.func,
  isSearching: PropTypes.bool,
  headerbackground: PropTypes.string,
  headerGradientBG: PropTypes.bool,
  pageBackground: PropTypes.string,
  hideStatusBar: PropTypes.bool,
  notificationCount: PropTypes.number,
  rightBtnSecondImg: PropTypes.number,
  rightBtnSecondPress: PropTypes.func,
};

ScreenWrapperView.defaultProps = {
  hasBack: false,
  headerTitleColor: '',
  headerTitleStyle: {},
  leftBtnImage: undefined,
  leftBtnPress: () => {},
  leftBtnText: '',
  rightBtnImage: undefined,
  rightBtnPress: () => {},
  rightBtnText: '',
  hasBorder: false,
  hideNav: false,
  style: {},
  hasSearch: false,
  sideMenu: false,
  onSearchText: () => {},
  isSearching: false,
  headerbackground: 'transparent',
  headerGradientBG: false,
  pageBackground: Colors.white,
  hideStatusBar: false,
  notificationCount: 0,
  rightBtnSecondImg: undefined,
  rightBtnSecondPress: () => {},
};

export default ScreenWrapperView;
