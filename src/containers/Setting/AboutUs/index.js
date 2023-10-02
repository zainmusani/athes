import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {ScreenWrapper, Text} from '../../../components';
import HtmlRender from '../../../components/htmlRender';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts} from '../../../theme';
import styles from './AboutUsStyles';

const AboutUs = props => {
  const {followers, searchRef} = props;
  const {
    'About Us': {description},
  } = useSelector(state => state.setting.settingPages);

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.ABOUT_US}>
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text
            size={Fonts.size.xxLarge}
            bold="700"
            color={Colors.white}
            type={Fonts.type.bold}
            style={{...AppStyles.marginVerticalBase, ...AppStyles.mBottom20}}>
            {strings.ABOUT_US}
          </Text>
          <HtmlRender source={description} />
        </KeyboardAwareScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default AboutUs;
