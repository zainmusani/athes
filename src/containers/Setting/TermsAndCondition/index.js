import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {ScreenWrapper, Text} from '../../../components';
import HtmlRender from '../../../components/htmlRender';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts} from '../../../theme';
import styles from './TermsAndConditionStyles';

const TermsAndCondition = props => {
  const {followers, searchRef} = props;

  const {settingPages} = useSelector(state => state.setting);

  if (Object.keys(settingPages).length > 0) {
    var {
      'Terms and conditions': {description},
    } = settingPages;
  }

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.TERMS_AND_CONDITION}>
      {Object.keys(settingPages).length > 0 && (
        <View style={styles.container}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text
              size={Fonts.size.xxLarge}
              bold="700"
              color={Colors.white}
              type={Fonts.type.bold}
              style={{...AppStyles.marginVerticalBase, ...AppStyles.mBottom20}}>
              {strings.TERMS_AND_CONDITION}
            </Text>
            <HtmlRender source={description} />
          </KeyboardAwareScrollView>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default TermsAndCondition;
