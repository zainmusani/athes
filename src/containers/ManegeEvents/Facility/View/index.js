import _ from 'lodash';
import React, {useRef, useState, useEffect} from 'react';
import {View, Image, ImageBackground, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  deleteFacilityByIdRequest,
  getFacilityByIdRequest,
  getOwnFacilitiesRequest,
  getOwnFacilityByIdRequest,
} from '../../../../actions/Facility';
import {
  addPostRequest,
  getWallPostsListRequest,
} from '../../../../actions/PostActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Button,
  PaymentSheet,
  ShareRBSheet,
  Loader,
  PostAction,
} from '../../../../components';
import {strings} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import styles from './styles';
import PropTypes from 'prop-types';

const FacilityView = props => {
  const {isPublicView, facilityId, isComingFromDeepLinkUrl, deepLinkData} =
    props;
  const [loading, setLoading] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(() => false);
  const [hasDeepLink, setHasDeepLink] = useState(true);
  const [actionsOfPost, setActionsOfPost] = useState({});
  const {ownFacility} = useSelector(state => state.facility);
  const {role, id} = useSelector(state => state.user.data);

  const cancelationRBSheetRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasDeepLink) {
      setLoading(true);
      dispatch(
        getFacilityByIdRequest(facilityId?.toString(), (res, err) => {
          setTimeout(() => {
            if (isComingFromDeepLinkUrl) setShowPaymentSheet(true);
            setLoading(false);
          }, 300);
        }),
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteFacility = () => {
    setLoading(true);
    dispatch(
      deleteFacilityByIdRequest(facilityId?.toString(), (res, err) => {
        if (res) {
          // cancelationRBSheetRef.current.close();
          dispatch(
            getOwnFacilitiesRequest({limit: 300, offset: 0}, (res, err) => {}),
          );
          setLoading(false);
          Actions.replace('managementTab');
        }
      }),
    );
  };

  const handleEnrollButtonPress = value => {
    Actions.pop();
  };

  const shareAsPost = () => {
    setLoading(true);
    const payload = {
      post_text: `Facility Name: ${ownFacility?.title} \nCharges: $${ownFacility?.charges} \nAbout Facility: ${ownFacility.description}`,
      media_urls: [
        !_.isEmpty(ownFacility?.image)
          ? ownFacility?.image
          : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      ],
    };
    dispatch(
      addPostRequest(payload, res => {
        setLoading(false);
        if (res) {
          setActionsOfPost({
            icon: Images.bellActive,
            name: 'Facility Shared Successfully.',
            description: 'Facility has been shared in your wall.',
          });
          dispatch(getWallPostsListRequest({limit: 10, offset: 0}, res => {}));
        }
      }),
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() =>
        isComingFromDeepLinkUrl ? Actions.reset('athes_tab') : Actions.pop()
      }
      headerTitle={'Facility Detail'}
      rightBtnImage={!isPublicView && Images.editIconBlack}
      rightBtnPress={() =>
        !isPublicView && Actions.addFacility({edit: true, facilityId})
      }
      secondRightBtnImage={!isPublicView && Images.deleteIconCircle}
      secondRightBtnPress={() => cancelationRBSheetRef.current.open()}
      secondRightBtnVisible={!isPublicView && true}>
      {!loading && (
        <>
          <FastImage
            source={{
              uri: ownFacility?.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: '100%', height: 211, zIndex: 1}}></FastImage>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={[styles.container]}>
            <View style={{paddingHorizontal: 20}}>
              {Object.keys(actionsOfPost).length > 0 && (
                <View style={{marginTop: -10}}>
                  <PostAction actionsOfPost={actionsOfPost} />
                </View>
              )}

              <View
                style={{
                  ...AppStyles.flexRow,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.heading}>{ownFacility?.title}</Text>
                {ownFacility?.userId === id && (
                  <ButtonView style={styles.inviteView} onPress={shareAsPost}>
                    <Text style={styles.invitetext}>{`Invite`}</Text>
                  </ButtonView>
                )}
              </View>

              <View style={AppStyles.mTop20}>
                <View style={[AppStyles.mTop10, AppStyles.mBottom10]}>
                  <View style={styles.eventDetailView}>
                    <Image source={Images.eventDetailImg2} />

                    <View style={styles.DetailView}>
                      <Text style={styles.DetailText1}>
                        {ownFacility?.service}
                      </Text>
                      <Text style={styles.DetailText2}>
                        {ownFacility?.serviceDescription}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[AppStyles.mTop10, AppStyles.mBottom10]}>
                  <View style={styles.eventDetailView}>
                    <Image source={Images.eventDetailImg4} />

                    <View style={styles.DetailView}>
                      <Text style={styles.DetailText1}>Charges</Text>
                      <Text style={styles.DetailText2}>
                        ${ownFacility?.charges}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[AppStyles.mTop20, AppStyles.mBottom30]}>
                <Text style={styles.aboutText}>Facility Detail</Text>
                <Text style={styles.aboutDescription}>
                  {ownFacility?.description}
                </Text>
              </View>
            </View>

            {isPublicView && role !== 6 && role && (
              <>
                <View style={styles.linearGradientView}>
                  <Button
                    background={Colors.white}
                    icon="righArrowIcon"
                    iconRight
                    onPress={() => setShowPaymentSheet(true)}
                    raised
                    style={{
                      ...AppStyles.mLeft30,
                      ...AppStyles.mRight30,
                      ...AppStyles.mBottom20,
                    }}>
                    {'Book Now'.toUpperCase()}
                  </Button>
                </View>
              </>
            )}
          </ScrollView>

          <PaymentSheet
            showBookingCalendar
            handleEnrollButtonPress={handleEnrollButtonPress}
            showPaymentSheet={showPaymentSheet}
            setShowPaymentSheet={setShowPaymentSheet}
            isFacilityView={true}
            facilityId={facilityId}
            data={ownFacility}
            amount={ownFacility.charges || deepLinkData?.amount}
            ModalHeading="Facility Booked"
            ModalDescription=""
            hasDeepLink={hasDeepLink}
            setHasDeepLink={setHasDeepLink}
            {...props}
          />

          <ShareRBSheet
            showShareSheet={showShareSheet}
            setShowShareSheet={setShowShareSheet}
          />

          <RBSheet
            ref={cancelationRBSheetRef}
            height={Platform.OS === 'ios' ? 240 : 220}
            width={'100%'}
            openDuration={250}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0,0,0,0.4)',
                // alignItems: 'center',
              },
              container: styles.RBSheetMainContainer,
            }}>
            <View style={styles.RBSheetContainer}>
              <Text style={styles.deleteEventHeading}>Delete Facility</Text>

              <Text style={styles.RBSheetHeading}>{ownFacility?.title}</Text>
              {/* <Text style={styles.RBSheetDate}>
            Session Date: {session?.startDate}
          </Text> */}

              <Button
                hasLinear
                color="#FFF"
                icon="righArrowIcon"
                iconRight
                onPress={deleteFacility}
                raised
                style={{
                  ...AppStyles.mLeft20,
                  ...AppStyles.mRight20,
                  ...AppStyles.mTop20,
                }}>
                {strings.CONFIRM_DELETE.toUpperCase()}
              </Button>
            </View>
          </RBSheet>
        </>
      )}
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(FacilityView);
