import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {_} from 'lodash';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {ButtonView, SearchBar, Text} from '..';
import ScreenWrapperView from './ScreenWrapperView';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './ScreenWrapperStyles';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {DrawerMenu, strings} from '../../constants';

const ScreenWrapperController = props => {
  const {user} = props;
  const [currentTab, setCurrentTab] = useState('Home');
  // To get the current Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Initially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const minimizeScreen = () => {
    Actions.refresh({hideTabBar: !showMenu});

    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: showMenu ? 0 : 240,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !showMenu ? 0 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  const renderHeaderLeft = (
    leftBtnImage,
    leftBtnPress,
    leftBtnText,
    hasBack,
    sideMenu,
  ) => {
    const renderBack = hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);
    if (sideMenu) {
      return (
        <ButtonView style={styles.btnWrapper} onPress={minimizeScreen}>
          <Image
            source={Images.hamburger}
            style={{
              width: 24,
              height: 19,
              tintColor: Colors.white,
            }}
          />
        </ButtonView>
      );
    }
    return (
      <ButtonView
        onPress={hasBack ? () => Actions.pop() : leftBtnPress}
        style={styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image
            source={leftBtnImage}
            size={styles.btnImage}
            style={{tintColor: Colors.white}}
          />
        )}
        {renderBack && (
          <Image
            source={Images.back_btn}
            size={styles.btnImage}
            style={{tintColor: Colors.white}}
          />
        )}
      </ButtonView>
    );
  };

  const renderHeaderRight = (
    rightBtnImage,
    rightBtnPress,
    rightBtnText,
    rightBtnSecondImg,
    notificationCount,
    rightBtnSecondPress,
  ) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ButtonView onPress={rightBtnSecondPress}>
          {!_.isUndefined(rightBtnSecondImg) && (
            <Image
              source={rightBtnSecondImg}
              style={{tintColor: Colors.white, marginRight: 10}}
              size={styles.btnImage}
              resizeMode="contain"
            />
          )}
          {!util.areValuesEqual(notificationCount, 0) && (
            <View style={styles.notificationsCount}>
              <Text style={styles.countTxt} size={Fonts.size.xxxxxSmall}>
                {notificationCount < 100 ? notificationCount : `99+`}
              </Text>
            </View>
          )}
        </ButtonView>
        <ButtonView
          onPress={rightBtnPress}
          style={[styles.btnWrapper, rightBtnText ? styles.rightBtn : {}]}>
          {!_.isEmpty(rightBtnText) && (
            <Text
              type="bold"
              bold="700"
              numberOfLines={1}
              ellipsizeMode="tail"
              size="xSmall">
              {rightBtnText}
            </Text>
          )}

          {!_.isUndefined(rightBtnImage) && (
            <Image
              source={rightBtnImage}
              size={styles.btnImage}
              resizeMode="contain"
            />
          )}
        </ButtonView>
      </View>
    );
  };

  const renderHeaderTitle = (
    headerTitle,
    headerTitleColor,
    headerTitleStyle,
  ) => {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        {!headerTitle ? (
          <Image source={Images.logo} style={{width: 95, height: 15}} />
        ) : (
          <Text
            color={headerTitleColor || Colors.white}
            type="bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="medium"
            style={[headerTitleStyle, {fontWeight: '700'}]}>
            {headerTitle || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderHeaderSearch = (onSearchText, isSearching) => {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  };

  const menuItem = (currentTab, setCurrentTab, title) => {
    const menuStyle = StyleSheet.flatten([styles.menuItem]);
    let link = title;
    if (title === DrawerMenu.home) {
      link = 'athes_tab';
    }
    if (title === DrawerMenu.manage_tab) {
      link = 'managementTab';
    }
    return (
      <ButtonView
        onPress={() => {
          setCurrentTab(title);
          Actions.push(link);
        }}
        style={menuStyle}>
        <Text
          size={Fonts.size.xSmall}
          type={currentTab == title ? Fonts.type.bold : Fonts.type.medium}
          bold={currentTab == title ? '700' : '500'}
          color={title == DrawerMenu.logout ? Colors.white : Colors.grey2}>
          {util.capitalizeFirstLetter(title)}
        </Text>
      </ButtonView>
    );
  };

  return (
    <ScreenWrapperView
      renderHeaderLeft={renderHeaderLeft}
      renderHeaderRight={renderHeaderRight}
      renderHeaderTitle={renderHeaderTitle}
      renderHeaderSearch={renderHeaderSearch}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      minimizeScreen={minimizeScreen}
      menuItem={menuItem}
      scaleValue={scaleValue}
      offsetValue={offsetValue}
      closeButtonOffset={closeButtonOffset}
      user={user}
      {...props}
    />
  );
};

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(ScreenWrapperController);
