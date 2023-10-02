import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  teamMembersListRequest,
  updateTeamMemberStatusRequest,
} from '../../../actions/TeamActions';
import {
  Button,
  ButtonView,
  Loader,
  ScreenWrapper,
  Text,
  TextInput,
  TopTabbar,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from '../styles';

const TeamTabsArray = [
  {
    id: 1,
    status: 'Team Members',
  },
  {
    id: 0,
    status: 'Pending',
  },
  {
    id: 2,
    status: 'Rejected',
  },
];

const Team = props => {
  const [tabs, setTabs] = useState(0);
  const [description, setDescription] = useState(() => '');
  const shareSheetRef = useRef(null);
  const [pendingView, setPendingView] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [teamMemberDetail, setTeamMemberDetail] = useState({});
  const [loading, setLoading] = useState(() => false);

  const {id, image: teamProfileImage} = useSelector(state => state.user.data);
  const {teamMembersList} = useSelector(state => state.team);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getTeamMembersList();
  }, [tabs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTeamMembersList = () => {
    dispatch(
      teamMembersListRequest(
        {id, status: tabs, flag: Math.random()},
        (res, err) => {
          setLoading(false);
        },
      ),
    );
  };

  const selectTeamMember = item => {
    tabs === 1 ? setPendingView(false) : setPendingView(true);
    setTeamMemberDetail(item);
    shareSheetRef.current?.open();
  };

  const approveButtonHandler = () => {
    dispatch(
      updateTeamMemberStatusRequest(
        {id: teamMemberDetail?.memberId, status: 1},
        (res, err) => {
          setTabs(1);
          setActionsOfPost({
            name: 'Athlete Approved',
            description: 'Athlete approved for Team',
          });
          getTeamMembersList();
        },
      ),
    );

    shareSheetRef.current?.close();
  };

  const rejectMemberHandler = () => {
    dispatch(
      updateTeamMemberStatusRequest(
        {id: teamMemberDetail?.memberId, status: 2},
        (res, err) => {
          setTabs(2);
          setActionsOfPost({
            name: 'Athlete Rejected',
            description: 'Athlete Reject From Team',
          });
          getTeamMembersList();
        },
      ),
    );

    shareSheetRef.current?.close();
  };

  const goToProfile = item => {
    if (item.parentId == id) {
      let __item = _.cloneDeep(item);
      // __item.id = item.userId;
      Actions.replace('profile', {
        child_data: __item,
        userId: item.id,
        isParentAthleteManagementView: true,
      });
    } else {
      Actions.replace('profile', {
        userId: item.id,
        requested_role: item.role_id,
        publicView: id != item.id,
      });
    }
  };

  const renderTeamMembers = useMemo(
    () => (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={teamMembersList}
        // style={{backgroundColor: 'yellow'}}
        // onRefresh={() => {
        //   setLoading(true);
        //   getTeamMembersList();
        // }}
        // // refreshing={loading}
        renderItem={({item, index}) => {
          return (
            <View style={styles.invitePeopleMainView}>
              <ButtonView
                style={styles.invitePeopleView}
                onPress={() => goToProfile(item)}>
                <Image
                  source={{uri: item.image || Images.userEmptyImage}}
                  style={{height: 34, width: 34, borderRadius: 34}}
                />
                <Text style={styles.invitePeopleText}>{item.name}</Text>
              </ButtonView>
              <ButtonView
                onPress={() => selectTeamMember(item)}
                style={{width: 34, height: 34, ...AppStyles.centerInner}}>
                <Image
                  source={tabs === 1 ? Images.deleteDark : tabs === 0 ? Images.approveIcon : Images.editIconBlack}
                  style={[
                    tabs === 1
                      ? {tintColor: '#FFF', width: 12, height: 16}
                      : {width: 24, height: 24},
                  ]}
                />
              </ButtonView>
              {/* <View style={styles.radioBoxView}>
            </View> */}
            </View>
          );
        }}
      />
    ),
    [teamMembersList],
  );

  return (
    <ScreenWrapper
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      pageBackground={Colors.black}
      headerTitle={strings.MANAGE_TEAMS}
      rightBtnText={`Invite`}
      rightBtnPress={() => Actions.invitePeopleScreen({teamId: id})}>
      <Image
        style={{height: 215, width: '100%'}}
        source={{uri: teamProfileImage || Images.userEmptyImage}}
      />

      {Object.keys(actionsOfPost).length > 0 && (
        <View style={styles.actionPostMainView}>
          <View style={styles.actionPostView}>
            <View>
              <Text style={styles.actionPostHeading}>{actionsOfPost.name}</Text>
              <Text style={styles.actionPostDescription}>
                {actionsOfPost.description}
              </Text>
            </View>
          </View>

          {/* <ButtonView
            style={styles.undoButtonView}
            onPress={() => setActionsOfPost({})}>
            <Text style={styles.undoButton}>Undo</Text>
          </ButtonView> */}
        </View>
      )}

      <View style={styles.container}>
        <TopTabbar array={TeamTabsArray} tabs={tabs} setTabs={setTabs} />

        <Text
          size={Fonts.size.medium}
          type={Fonts.type.medium}
          bold="500"
          color={Colors.white}
          style={[AppStyles.mBottom10, AppStyles.mTop20]}>
          {tabs === 0 && `Pending Athletes`}
          {tabs === 1 && `Athletes`}
          {tabs === 2 && `Rejected Athletes`}
        </Text>

        {!loading && renderTeamMembers}
      </View>

      <RBSheet
        ref={shareSheetRef}
        height={
          Platform.OS === 'ios'
            ? tabs === 1
              ? 360
              : 420
            : tabs === 1
            ? 340
            : 400
        }
        openDuration={250}
        closeOnPressMask={true}
        onClose={() => {}}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          container: styles.commentContainer,
        }}>
        <View style={styles.atheleteDetailArea}>
          <Text
            size={Fonts.size.normal}
            type={Fonts.type.medium}
            bold="700"
            color={Colors.black2}>
            Athlete Details
          </Text>
          {tabs != 2 && (
            <ButtonView style={{}} onPress={rejectMemberHandler}>
              <Image
                source={Images.deleteDark}
                style={{tinycolor: Colors.white, width: 12, height: 16}}
              />
            </ButtonView>
          )}
        </View>
        <View style={styles.postHeader}>
          <View style={{flex: 1}}>
            <ButtonView
              style={[styles.headerLeft]}
              onPress={() => {
                shareSheetRef.current?.close();
                // Actions.replace('profile',{publicView: true})
              }}>
              <Image
                source={{uri: teamMemberDetail?.image || Images.userEmptyImage}}
                alt="jonhs"
                style={styles.profileImage}
              />
              <View style={styles.postIntro}>
                <Text
                  style={styles.posterName}
                  size={Fonts.size.semiMedium}
                  type={Fonts.type.bold}
                  bold="700"
                  color={Colors.black1}>
                  {teamMemberDetail?.name}
                </Text>
                <Text
                  style={styles.postTime}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.grey3}>
                  Athlete
                </Text>
              </View>
            </ButtonView>
          </View>
          {/* <TextInput
            placeholder={teamMemberDetail?.description}
            placeholderTextColor={Colors.grey3}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Description"
            lableColor={Colors.grey4}
            multiline
            editable={false}
            caretHidden={true}
            numberOfLines={3}
            maxLength={90}
            containerStyle={{...AppStyles.mTop25, ...AppStyles.mBottom10}}
            value={description}
          /> */}
          {pendingView && (
            <Button
              hasLinear
              onPress={approveButtonHandler}
              icon="righArrowIcon"
              iconRight
              color="#FFF"
              raised
              style={{
                ...AppStyles.mLeft30,
                ...AppStyles.mRight30,
                ...AppStyles.mBottom20,
                ...AppStyles.mTop20,
              }}>
              {'Approve'.toUpperCase()}
            </Button>
          )}
        </View>
      </RBSheet>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default Team;
