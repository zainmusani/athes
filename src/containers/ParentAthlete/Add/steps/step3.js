import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import {
  Button,
  ButtonView,
  RadioButton,
  Search,
  Text,
  TextInput,
  UploadImage,
} from '../../../../components';
import _ from 'lodash';
import util from '../../../../util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SPORTSINTRESTDATA, strings} from '../../../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import {Actions} from 'react-native-router-flux';

const step3 = props => {
  const {onShare, onFinish, imageUri} = props;

  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={styles.profileImageWrap}>
          <Image
            source={{
              uri: imageUri
                ? imageUri
                : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
            }}
            style={[
              AppStyles.marginVerticalBase,
              {width: 130, height: 130, borderRadius: 100},
            ]}
          />
          <View style={styles.profileCheck}>
            <Image
              source={Images.check}
              style={{
                tintColor: Colors.white,
                width: 22,
                height: 16,
                transform: [{rotate: '-8deg'}],
              }}
            />
          </View>
        </View>
        <Text size={Fonts.size.large} color={Colors.white} textAlign="center">
          Successfully Created Profile
        </Text>
        <Text
          size={Fonts.size.xSmall}
          color={Colors.white}
          textAlign="center"
          style={{...AppStyles.marginVerticalBase}}>
          Your Child’s profile has been created successfully please share the
          account details with him/her to login.
        </Text>
        <Button
          onPress={() => onShare()}
          icon="share"
          iconWithoutBG
          style={{
            ...AppStyles.mTop20,
            ...AppStyles.mBottom20,
            width: 150,
            alignSelf: 'center',
            alignItems: 'center',
          }}
          textStyle={{...AppStyles.mLeft20}}>
          {strings.SHARE}
        </Button>
      </View>
      <Button
        background={Colors.white}
        onPress={() => onFinish()}
        icon="righArrowIcon"
        iconRight
        raised
        style={{
          ...AppStyles.mLeft30,
          ...AppStyles.mRight30,
          ...AppStyles.mBottom45,
        }}>
        {strings.DONE.toUpperCase()}
      </Button>
    </View>
  );
};

export default step3;
