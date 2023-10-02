// @flow
import {connect} from 'react-redux';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, View, StyleSheet, Platform, Animated} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../theme';
import {Text, Button, ButtonView, ScreenWrapper} from '../../components';
import {strings} from '../../constants';
import _ from 'lodash';

const getStartBtn = StyleSheet.flatten([
  AppStyles.mBottom15,
  styles.getStartBtn,
  Platform.OS === 'ios' && {
    shadowColor: 'rgba(134, 109, 201, 0.26)',
  },
  Platform.OS === 'android' && {
    shadowColor: 'rgba(134, 109, 201, 1.26)',
  },
]);

const signInBtn = StyleSheet.flatten([
  AppStyles.mBottom30,
  styles.signInBtn,
  Platform.OS === 'ios' && {
    shadowColor: 'rgba(78, 79, 114, 0.18)',
  },
  Platform.OS === 'android' && {
    shadowColor: 'rgba(78, 79, 114, 1.18)',
  },
]);

const GetStarted = props => {
  const [loading, setLoading] = useState(false);
  const [animateTranslate, setAnimateTranslate] = useState(
    new Animated.Value(-70),
  );
  const [animateOpacity, setAnimateOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!_.isNil(props.accessToken)) {
      if (!_.isNull(props.role) && !_.isUndefined(props.role)) {
        Actions.reset('athes_tab');
      } else {
        if (props.parentId) {
          Actions.reset('athes_tab');
        } else {
          Actions.reset('choicerole');
        }
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Animated.timing(animateTranslate, {
        toValue: 0,
        duration: 1000,
      }).start(() => {
        animateTranslate.setValue(0);
        //If you remove above line then it will stop the animateTranslate at toValue point
      });

      Animated.timing(animateOpacity, {
        toValue: 1,
        duration: 2000,
      }).start(() => {
        animateOpacity.setValue(1);
        //If you remove above line then it will stop the animateTranslate at toValue point
      });
    }, 800);
  }, []);

  const transformStyle = {
    transform: [
      {
        translateY: animateTranslate,
      },
    ],
    opacity: animateOpacity,
  };
  if (_.isNil(props.accessToken)) {
    return (
      <ScreenWrapper pageBackground={Colors.black} hideNav>
        <View style={styles.container}>
          <View style={styles.topView}>
            <Image
              source={Images.logo}
              style={
                ([AppStyles.logoImage, AppStyles.mBottom50, AppStyles.mTop40],
                {width: 325, height: 50})
              }
            />
            <Animated.Text
              color={Colors.black1}
              style={[AppStyles.mTop10, transformStyle]}>
              Where athletes come to Connect
            </Animated.Text>
          </View>
          <View style={styles.bottomView}>
            <Button
              hasLinear
              color={Colors.white}
              raised
              style={getStartBtn}
              onPress={() => {
                Actions.reset('login');
              }}>
              {strings.GET_STARTED}
            </Button>
            <Button
              raised
              style={signInBtn}
              onPress={() => {
                Actions.reset('login');
              }}>
              {strings.SIGNIN}
            </Button>
            <View
              style={{
                ...AppStyles.mBottom10,
                ...AppStyles.centerInner,
                ...AppStyles.flexRow,
              }}>
              <Text size={Fonts.size.small} color={Colors.white}>
                New around here?{' '}
              </Text>
              <ButtonView
                style={{...AppStyles.padding10, ...AppStyles.pLeft0}}
                onPress={() => {
                  Actions.reset('signup');
                }}>
                <Text
                  size={Fonts.size.small}
                  color={Colors.white}
                  type={Fonts.type.bold}
                  bold="700">
                  {strings.SIGNUP}
                </Text>
              </ButtonView>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    );
  } else {
    return <View></View>;
  }
};

const mapStateToProps = ({user}) => ({
  accessToken: user.data.access_token,
  role: user.data.role,
  parentId: user.data.parentId,
});

const actions = {};

export default connect(mapStateToProps, actions)(GetStarted);
