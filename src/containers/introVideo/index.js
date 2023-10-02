import React, { useEffect, useMemo, useState } from 'react';
import { View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import {
  ScreenWrapper,
  Text,
  Button,
  ButtonView,
  CheckBox,
} from '../../components';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getSettingPagesRequest} from '../../actions/settingActions';
import HtmlRender from '../../components/htmlRender';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {agreeTermsRequest} from '../../actions/UserActions';

const slides = [
  {
    key: 'tour-1',
    title: 'Welcome to Athes! \nWe are glad you are thinking about joining us.',
    text: 'Athes is a social media community where young athletes can connect with each other, their coaches, and teams in safe way. If you join Athes, you will be able to create your own account with your information, interests, and pictures. You could also share information with others who have an Athes account.',
    image: Images.introImage1,
  },
  {
    key: 'tour-2',
    title: 'To join Athes, \nYou must complete a few steps. \nThese steps are:',
    text: '·Get permission from a parent or guardian. They must review Athes and agree to your use of it. \n·With your parent or guardian, read and agree to the Terms of Use and the Privacy Policy – these are important documents that talk about the rules of using Athes. You will see them on the next screen.',
    image: Images.introImage2,
  },
  {
    key: 'tour-3',
    title: 'Share your moments with your friends',
    text: 'Share you trip initiary with others. Let’s make the travel fun & enoyable',
    image: Images.introImage3,
  },
];

const IntroVideo = () => {
  const [nextButtonText, setNextButtonText] = useState('Let’s Go');

  const dispatch = useDispatch();
  const {'Terms and conditions': terms_and_condition} = useSelector(
    state => state.setting.settingPages,
  );

  const {'Privacy policy': privacy_policy} = useSelector(
    state => state.setting.settingPages,
  );
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(getSettingPagesRequest());
  }, []);

  const renderTermsAndCondition = useMemo(
    () => (
      <HtmlRender
        color={Colors.white}
        source={terms_and_condition?.description}
      />
    ),
    [terms_and_condition],
  );

  const renderPrivacyPolicy = useMemo(
    () => (
      <HtmlRender color={Colors.white} source={privacy_policy?.description} />
    ),
    [privacy_policy],
  );

  const stepOne = () => {
    return (
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 60}}
        showsVerticalScrollIndicator={false}>
        <Text
          size={22}
          color={Colors.white}
          type={Fonts.type.medium}
          bold="600"
          style={{...AppStyles.mBottom5}}>
          {`Welcome to Athes!`}
        </Text>
        <Text
          size={18}
          color={Colors.white}
          type={Fonts.type.medium}
          style={{...AppStyles.mBottom20}}>
          {`We are glad you are thinking about joining us.`}
        </Text>
        <Text color={Colors.white} style={{...AppStyles.mBottom20}}>
          {`Athes is a social media community where young athletes can connect with each other, their coaches, and teams in safe way. If you join Athes, you will be able to create your own account with your information, interests, and pictures. You could also share information with others who have an Athes account.`}
        </Text>
        <Text color={Colors.white} style={{...AppStyles.mBottom20}}>
          {`To join Athes, you must complete a few steps. \nThese steps are:`}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            ...AppStyles.mBottom10,
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: Colors.white,
              borderRadius: 5,
              ...AppStyles.mTop5,
              ...AppStyles.mLeft10,
            }}></View>
          <Text
            size={15}
            color={Colors.white}
            style={{width: '90%', ...AppStyles.mLeft10}}>
            {`Get permission from a parent or guardian. They must review Athes and agree to your use of it.`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            ...AppStyles.mBottom20,
          }}>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: Colors.white,
              borderRadius: 5,
              ...AppStyles.mTop5,
              ...AppStyles.mLeft10,
            }}></View>
          <Text
            size={15}
            color={Colors.white}
            style={{width: '90%', ...AppStyles.mLeft10}}>
            {`With your parent or guardian, read and agree to the Terms of Use and the Privacy Policy – these are important documents that talk about the rules of using Athes. You will see them on the next screen.`}
          </Text>
        </View>
        <Text
          color={Colors.white}
          style={{
            ...AppStyles.mBottom20,
          }}>{`If you’d like to join our community, \n\nClick the “Let’s Go!” button below.`}</Text>
      </KeyboardAwareScrollView>
    );
  };

  const stepTwo = () => {
    return (
      <View style={{flex: 0.9}}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text
            size={22}
            color={Colors.white}
            type={Fonts.type.medium}
            bold="500"
            style={{...AppStyles.mBottom5}}>
            {`Terms of Use`}
          </Text>
          <View style={{height: 215, overflow: 'hidden'}}>
            {renderTermsAndCondition}
          </View>
          <ButtonView
            onPress={() => Actions.terms_and_condition()}
            style={{...AppStyles.mBottom25}}>
            <Text
              color={Colors.white}
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.white,
                width: 78,
              }}>
              View More
            </Text>
          </ButtonView>
          <Text
            size={22}
            color={Colors.white}
            type={Fonts.type.medium}
            bold="500"
            style={{...AppStyles.mBottom5}}>
            {`Privacy Policy`}
          </Text>
          <View style={{height: 215, overflow: 'hidden'}}>
            {renderPrivacyPolicy}
          </View>
          <ButtonView
            onPress={() => Actions.terms_and_condition()}
            style={{...AppStyles.mBottom25}}>
            <Text
              color={Colors.white}
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.white,
                width: 78,
              }}>
              View More
            </Text>
          </ButtonView>
        </KeyboardAwareScrollView>
      </View>
    );
  };

  const stepThree = () => {
    return (
      <View style={{flex: 1, ...AppStyles.pTop30}}>
        <Text color={Colors.white}>
          the third page would be a statement that the child has consulted with
          their parent or guardian about the app and its terms/privacy policy
          and the parent has consented to the child registering for it.
        </Text>
        <CheckBox
          checked={checked}
          setChecked={setChecked}
          text={`I agree to the`}
          firstLinkText={`Terms & Conditions`}
          firstLink={() => {
            dispatch(getSettingPagesRequest());
            Actions.terms_and_condition();
          }}
          secondLinkText={`Privacy Policy.`}
          secondLink={() => {
            dispatch(getSettingPagesRequest());
            Actions.privacy_policy();
          }}
          customStyle={{marginBottom: 20}}
        />
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,

          paddingHorizontal: 25,
        }}>
        {index == 0 && stepOne()}
        {index == 1 && stepTwo()}
        {index == 2 && stepThree()}
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.nextBtn}>
        <Text>{nextButtonText}</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View
        style={[
          styles.nextBtn,
          {backgroundColor: !checked ? Colors.gray12 : Colors.white},
        ]}>
        <Text>{`Done`}</Text>
      </View>
    );
  };

  const _onSlideChange = index => {
    index == 0 && setNextButtonText('Let’s Go');
    index == 1 && setNextButtonText('Next');
  };

  const on_Done_all_slides = () => {
    
    if (checked) {
      dispatch(
        agreeTermsRequest(res => {
          if (res) {
            Actions.reset('athes_tab', {refreshNow: new Date()});
          }
        }),
      );
    }
  };
  return (
    <ScreenWrapper pageBackground={Colors.black}>
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        onDone={on_Done_all_slides}
        showSkipButton={false}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        onSlideChange={_onSlideChange}
        dotStyle={styles.dots}
        activeDotStyle={[styles.dots, styles.activeDots]}
      />
    </ScreenWrapper>
  );
};

export default IntroVideo;
