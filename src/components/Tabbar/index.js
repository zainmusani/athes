// @flow
import React, {useEffect, useState} from 'react';
import {View, Image, BackHandler} from 'react-native';
import _ from 'lodash';
import {Text, ButtonView} from '../../components';
import styles from './styles';
import {strings} from '../../constants';
import {Images, AppStyles, Colors} from '../../theme';
import {setSelectedTab} from '../../actions/GeneralActions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

const tabsData = [
  {
    id: 0,
    name: 'Home',
    icon: Images.home,
    selectedIcon: Images.homeActive,
    onPress: () => {
      Actions.jump('dashboard', {refreshNow: new Date()});
    },
  },
  {
    id: 1,
    name: 'Search',
    icon: Images.search,
    selectedIcon: Images.searchActive,
    onPress: () => {
      Actions.jump('search', {refreshNow: new Date()});
    },
  },
  {
    id: 2,
    name: '',
    icon: Images.addIconBlack,
    selectedIcon: Images.addIconBlack,
    onPress: () => {
      Actions.write_post({fromDashboad: true});
    },
  },
  // Managment Tab
  {
    id: 3,
    name: 'Coaching',
    icon: Images.third,
    selectedIcon: Images.thirdActive,
    onPress: () => {
      Actions.jump('coachsearch', {refreshNow: new Date()});
    },
  },
  {
    id: 4,
    name: 'Store',
    icon: Images.cart,
    selectedIcon: Images.cart,
    onPress: () => {
      Actions.jump('store', {refreshNow: new Date()});
    },
  },
];

const Tabbar = props => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    return true;
  };

  const handlePressTabs = (tabIndex, onPress) => {
    if (tabIndex == 2) {
      props.setSelectedTab(0);
    } else {
      props.setSelectedTab(tabIndex);
    }

    onPress();
  };

  const {selectedIndex, unReadNotiCount, user_role} = props;

  if (loader) return true;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {tabsData.map((item, index) => {
          let isActive = index === selectedIndex;
          return (
            <ButtonView
              style={[
                AppStyles.centerInner,
                styles.tab,
                index == 2 && {
                  marginTop: -20,
                },
              ]}
              key={item.id}
              onPress={() => {
                handlePressTabs(index, item.onPress);
              }}>
              {isActive && index !== 2 && (
                <View style={styles.activeTop}></View>
              )}
              <View style={styles.tabTextWrap}>
                <Text
                  style={{...AppStyles.pBottom5}}
                  color={isActive ? '#FFF' : '#7F7E7F'}
                  size={12}>
                  {item.name}
                </Text>
              </View>

              <Image
                style={
                  index == 2
                    ? {
                        zIndex: 9,
                        maxWidth: 48,
                        maxHeight: 48,
                        width: 48,
                        height: 48,
                        // tintColor: Colors.grey2,
                      }
                    : [
                        styles.iconImage,
                        isActive ? styles.iconActive : {},
                        index == 4 && {tintColor: '#7F7E7F'},
                      ]
                }
                source={isActive ? item.selectedIcon : item.icon}
                resizeMode="contain"
              />
              {index == 2 && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderColor: Colors.white,
                    borderWidth: 5,
                    borderRadius: 50,
                    position: 'absolute',
                    top: Platform.OS == 'ios' ? 15 : 10,
                  }}></View>
              )}
            </ButtonView>
          );
        })}
      </View>
    </View>
  );
};

const mapStateToProps = ({user, general, notification}) => ({
  selectedIndex: general.selectedIndex,
  user_role: user.data.role,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Tabbar);
