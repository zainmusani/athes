import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {ScreenWrapper, Text} from '../../../components';
import HtmlRender from '../../../components/htmlRender';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts} from '../../../theme';
import styles from './PrivacyPolicyStyles';

const PrivacyPolicy = props => {
  const {followers, searchRef} = props;
  const {settingPages} = useSelector(state => state.setting);

  if (Object.keys(settingPages).length > 0) {
    var {
      'Privacy policy': {description},
    } = settingPages;
  }

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.PRIVACY_POLICY}>
      {Object.keys(settingPages).length > 0 && (
        <View style={styles.container}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text
              size={Fonts.size.xxLarge}
              bold="700"
              color={Colors.white}
              type={Fonts.type.bold}
              style={{...AppStyles.marginVerticalBase, ...AppStyles.mBottom20}}>
              {strings.PRIVACY_POLICY}
            </Text>
            <HtmlRender source={description} />
          </KeyboardAwareScrollView>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;
