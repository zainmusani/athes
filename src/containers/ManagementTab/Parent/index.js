import React, {useState, useEffect} from 'react';
import {View, Image, BackHandler, FlatList, RefreshControl} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  Button,
  ButtonView,
  ScreenWrapper,
  Loader,
  ModalView,
  CheckBox,
} from '../../../components';
import {SAGA_ALERT_TIMEOUT, strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../theme';
import styles from '../styles';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  deleteChildRequest,
  getChildRequest,
  parentVerificationStatusRequest,
} from '../../../actions/ParentActions';
import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WebView} from 'react-native-webview';
import {privoRequest} from '../../../actions/GeneralActions';
import util from '../../../util';
import {getSettingPagesRequest} from '../../../actions/settingActions';

const Parent = props => {
  const {athleteAdded, refreshNow} = props;
  const [loader, setLoader] = useState(true);
  const athletes = useSelector(state => state.parent.childs);
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [checked, setChecked] = useState(() => false);

  const [childId, setChildId] = useState();
  const [showWebView, setShowWebView] = useState(false);
  const {name, email, id} = useSelector(state => state.user.data);
  let [firstName, lastName] = name?.split(' ');
  firstName =
    !_.isEmpty(firstName) && !_.isUndefined(firstName) ? firstName : '';
  lastName = !_.isEmpty(lastName) && !_.isUndefined(lastName) ? lastName : '';
  const {isVerifiedParent} = useSelector(state => state.parent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(parentVerificationStatusRequest({}, res => {}));
  }, []);

  useEffect(() => {
    getChildList();
  }, [athleteAdded, refreshNow]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showWebView]);

  const backAction = () => {
    if (showWebView) {
      setShowWebView(false);
      Actions.refresh({hideTabBar: !showWebView});
      return true;
    } else {
      Actions.pop();
      return true;
    }
  };

  const getChildList = () => {
    dispatch(
      getChildRequest({dev: Math.random()}, res => {
        setLoader(false);
      }),
    );
  };

  const deleteChildConfirmHandler = () => {
    setLoader(true);
    dispatch(
      deleteChildRequest(childId.toString(), res => {
        setModalVisible(false);
        setLoader(false);
      }),
    );
  };

  const add_athelete = () => {
    if (isVerifiedParent) {
      Actions.parent_athlete_add();
    } else {
      setShowWebView(true);
      Actions.refresh({hideTabBar: !showWebView});
    }
  };

  const onNavigationStateChange = webViewState => {
    if (webViewState?.url?.includes('verified=false')) {
      setShowWebView(false);
      Actions.refresh({hideTabBar: !showWebView});

      setTimeout(() => {
        util.topAlert('Verfication not completed.', 'error');
      }, SAGA_ALERT_TIMEOUT);
    } else if (webViewState?.url?.includes('verified=true')) {
      const id = webViewState?.url
        ?.split('&')
        .filter(str => str.includes('privoId='))[0];

      const payload = {
        privoId: id.includes('null') ? null : id.slice(id.indexOf('=') + 1, -1),
      };

      dispatch(privoRequest(payload));
      setShowWebView(false);
      Actions.refresh({hideTabBar: !showWebView});
      Actions.push('parent_athlete_add');
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      headerTitle={strings.ADD_CHILD_PROFILE}>
      {showWebView && (
        <View
          style={{
            position: 'absolute',
            zIndex: 999999,
            top: -50,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <ButtonView
            onPress={() => {
              setShowWebView(false);
              Actions.refresh({hideTabBar: !showWebView});
            }}
            style={{
              position: 'absolute',
              top: 10,
              paddingVertical: 20,
              paddingHorizontal: 10,
              zIndex: 99999,
            }}>
            <Image
              source={Images.back_btn}
              size={{width: 10, height: 16}}
              style={{tintColor: Colors.blue}}
            />
          </ButtonView>
          <WebView
            scalesPageToFit={true}
            mixedContentMode="compatibility"
            source={{
              uri: `https://athes.io/age-verification.php?firstName=${firstName}&lastName=${lastName}&email=${email}&partnerDefinedUniqueID=${id}`,
            }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </View>
      )}
      <View style={[styles.container, {zIndex: 1}]}>
        {!loader && (
          <>
            {athletes.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  ...AppStyles.centerInner,
                  ...AppStyles.pTop30,
                }}>
                <Text
                  color={Colors.white}
                  textAlign="center"
                  size={Fonts.size.large}
                  type={Fonts.type.bold}
                  bold="700"
                  style={{...AppStyles.mTop40, ...AppStyles.mBottom20}}>
                  {strings.ADD_ATHLETE}
                </Text>
                <Text
                  color={Colors.white}
                  style={AppStyles.mBottom20}
                  textAlign="justify">
                  To add a child athlete to your account we ask that you provide
                  the following: Child’s full name, date of birth, sports
                  interests and an optional profile photo. Your child will be
                  able to make their profile public, join groups and follow
                  other users. Your child will also be able to add a cover photo
                  and an intro video after the registration process is complete.
                  We will also send your child news and product promotions.
                </Text>
                <Text
                  color={Colors.white}
                  style={AppStyles.mBottom20}
                  textAlign="justify">
                  In order to add a child to your account, we first need to
                  verify that you are an adult. Please click the "Add Athlete"
                  button below to initiate the identity verification process.
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
                  secondLinkText={`Privacy Policy`}
                  secondLink={() => {
                    dispatch(getSettingPagesRequest());
                    Actions.privacy_policy();
                  }}
                  customStyle={{marginBottom: 20}}
                />

                <Button
                  background={Colors.white}
                  onPress={add_athelete}
                  disabled={!checked}
                  icon="righArrowIcon"
                  iconRight
                  raised
                  style={{
                    ...AppStyles.mLeft30,
                    ...AppStyles.mRight30,
                    ...AppStyles.mBottom20,
                  }}>
                  {strings.ADD_ATHLETE.toUpperCase()}
                </Button>
              </View>
            ) : (
              <>
                <View
                  style={{
                    flex: 1,
                    ...AppStyles.pTop20,
                  }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    // onRefresh={() => {
                    //   setLoader(true);
                    //   getChildList();
                    // }}
                    // refreshing={loader}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                          setLoader(true);
                          getChildList();
                        }}
                        tintColor={Colors.black}
                        // colors={[Colors.white, Colors.white]}
                      />
                    }
                    data={athletes}
                    keyExtractor={item => item.id}
                    renderItem={({item, idx}) => (
                      <View style={styles.attList}>
                        <ButtonView
                          onPress={() =>
                            Actions.profile({
                              isParentAthleteManagementView: true,
                              child_data: item,
                              userId: item.id,
                            })
                          }
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={{uri: item.image}}
                            alt="Athelete Image"
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              ...AppStyles.mRight10,
                            }}
                          />
                          <Text>{item.username || item.name}</Text>
                        </ButtonView>
                        <View
                          style={{
                            ...AppStyles.flexRow,
                            ...AppStyles.centerInner,
                          }}>
                          <ButtonView
                            onPress={() =>
                              Actions.profile({
                                isParentAthleteManagementView: true,
                                child_data: item,
                                userId: item.id,
                              })
                            }>
                            <Image source={Images.editIconBlack} alt="Edit" />
                          </ButtonView>
                          <ButtonView
                            style={{...AppStyles.mLeft10}}
                            onPress={() => {
                              setChildId(item.id);
                              setModalVisible(true);
                            }}>
                            <Image source={Images.deleteDark} alt="delete" />
                          </ButtonView>
                        </View>
                      </View>
                    )}
                  />
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                  <Button
                    background={Colors.white}
                    onPress={add_athelete}
                    icon="righArrowIcon"
                    iconRight
                    raised
                    style={{
                      ...AppStyles.mLeft30,
                      ...AppStyles.mRight30,
                      marginBottom: 20,
                    }}>
                    {strings.ADD.toUpperCase()}
                  </Button>
                </View>
              </>
            )}
          </>
        )}
      </View>
      <Loader loading={loader} />
      <ModalView
        deleteConfirmHandler={deleteChildConfirmHandler}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        image={Images.deleteIcon}
        isConfirmModal={true}
        heading={'Delete Child'}
        description={'Are you sure you want to delete this child ?'}
        buttonText={'Confirm'}
      />
    </ScreenWrapper>
  );
};

export default Parent;
