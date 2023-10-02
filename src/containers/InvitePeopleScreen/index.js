import _, {set} from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addEventRequest,
  eventInviteRequest,
  getOwnEventsRequest,
  getPublicEventsSuccess,
} from '../../actions/EventsActions';
import {
  createGroupRequest,
  getGroupByIdRequest,
  getOwnGroupsRequest,
  invitesInGroupRequest,
} from '../../actions/Group';
import {
  addSeasonRequest,
  getOwnSeasonsRequest,
  seasonInviteRequest,
} from '../../actions/SeasonsActions';
import {
  addSessionRequest,
  getOwnSessionsRequest,
  sessionInviteRequest,
} from '../../actions/SessionsActions';
import {
  createTeamEventRequest,
  inviteTeamRequest,
  teamEventInviteRequest,
  teamMembersListRequest,
} from '../../actions/TeamActions';
import {
  getFollowingsRequest,
  getInviteListRequest,
} from '../../actions/UserActions';
import {
  Button,
  ButtonView,
  InvitePeople,
  Loader,
  ModalView,
  ScreenWrapper,
  Text,
  TextInput,
} from '../../components';
import {strings, UserRoles} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';

const InvitePeopleScreen = props => {
  const {
    payload,
    isAddedSeasonForm,
    isAddedEventForm,
    isAddedTeamEventForm,
    isAddedGroupForm,
    isAddedSessionForm,
    isSkipButtonVisible,
    edit,
    sessionId,
    seasonId,
    eventId,
    teamEventId,
    groupId,
    teamId,
    creatorId,
    detailData,
  } = props;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const {publicUsers, data: loggedInUser} = useSelector(state => state.user);
  const {ownGroupsList} = useSelector(state => state.group);
  const {teamMembersList} = useSelector(state => state.team);

  const [disableBtnAfterOneCLick, setDisableBtnAfterOneCLick] = useState(
    () => false,
  );
  const [peopleList, setPeopleList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectAllSelected, setSelectAllSelected] = useState(() => false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setLoading(true);

    let followingPayload = {limit: 300, offset: 0, dummy: Math.random()};
    if (groupId) {
      followingPayload.groupId = groupId;
    }
    if (teamId) {
      followingPayload.teamId = teamId;
    }

    if (count == 1) {
      if (teamEventId) {
        let teamPayload = {
          id: creatorId,
          status: 1,
          flag: Math.random(),
        };

        if (teamEventId) {
          teamPayload.teamEventId = teamEventId;
        }

        dispatch(
          teamMembersListRequest(teamPayload, (res, err) => {
            setPeopleList(teamMembersList || []);
            setCount(2);
          }),
        );
      } else {
        dispatch(
          getInviteListRequest(followingPayload, res => {
            setPeopleList(publicUsers || []);
            // setCount(2);
            dispatch(
              getOwnGroupsRequest(
                {limit: 300, offset: 0, dummy: Math.random()},
                (res, err) => {
                  setPeopleList(publicUsers || []);
                  setGroupList(ownGroupsList || []);
                  setCount(2);
                },
              ),
            );
          }),
        );
      }
    }
    if (count == 2) {
      if (isAddedTeamEventForm || teamEventId) {
        setPeopleList(teamMembersList || []);
      } else {
        setPeopleList(publicUsers || []);
        setGroupList(ownGroupsList || []);
      }
      setLoading(false);
    }

    if (isAddedTeamEventForm || teamEventId) {
      setPeopleList(teamMembersList || []);
    } else {
      setGroupList(ownGroupsList || []);
      setPeopleList(publicUsers || []);
    }
  }, [count]);

  const handleRadioButtonToggle = index => {
    const listOfPeople = _.cloneDeep(peopleList);

    listOfPeople[index].isSelected = !listOfPeople[index].isSelected;

    setPeopleList(listOfPeople);
    let arr = selectedPeople;
    if (!arr.includes(listOfPeople[index].userId)) {
      //checking weather array contain the id
      arr.push(listOfPeople[index].userId); //adding to array because value doesnt exists
    } else {
      arr.splice(arr.indexOf(listOfPeople[index].userId), 1); //deleting
    }
    setSelectedPeople(arr);
  };

  const handleGroupRadioButtonToggle = index => {
    const listOfGroup = _.cloneDeep(groupList);

    listOfGroup[index].isSelected = !listOfGroup[index].isSelected;

    setGroupList(listOfGroup);
    let arr = selectedGroups;
    if (!arr.includes(listOfGroup[index].groupId)) {
      //checking weather array contain the id
      arr.push(listOfGroup[index].groupId); //adding to array because value doesnt exists
    } else {
      arr.splice(arr.indexOf(listOfGroup[index].groupId), 1); //deleting
    }
    setSelectedGroups(arr);
  };

  const selectAll = () => {
    setSelectAllSelected(!selectAllSelected);
    setPeopleList(list =>
      _.cloneDeep(list).map(res => {
        if (!selectAllSelected) {
          res.isSelected = true;
          setSelectedPeople(a => [...a, res.userId]);
          return res;
        }

        if (selectAllSelected) {
          res.isSelected = false;
          setSelectedPeople([]);
          return res;
        }
      }),
    );
    setGroupList(list =>
      _.cloneDeep(list).map(res => {
        if (!selectAllSelected) {
          res.isSelected = true;
          setSelectedGroups(a => [...a, res.groupId]);
          return res;
        }

        if (selectAllSelected) {
          res.isSelected = false;
          setSelectedGroups([]);
          return res;
        }
      }),
    );
  };

  let modalHeading = 'Invitation Sent Successfully';
  let modalButtonText = 'Back';

  if (isAddedSeasonForm) {
    modalHeading = 'Season Added';
    modalButtonText = 'Back To Season';
  }

  if (isAddedTeamEventForm) {
    modalHeading = 'Team Event Added';
    modalButtonText = 'Back To Event';
  }

  if (isAddedEventForm) {
    modalHeading = 'Event Added';
    modalButtonText = 'Back To Event';
  }

  if (isAddedSessionForm) {
    modalHeading = 'Session Added';
    modalButtonText = 'Back To Session';
  }

  if (isAddedGroupForm) {
    modalHeading = edit ? 'Group Updated' : 'Group Created';
    modalButtonText = 'Back To Groups ';
  }

  const handleModalButton = value => {
    if (isAddedGroupForm) {
      Actions.replace('groups', {refreshNow: new Date()});
      return true;
    }

    if (isAddedSeasonForm) {
      Actions.replace('managementTab', {refreshNow: new Date()});
      return true;
    }
    if (isAddedEventForm) {
      Actions.replace('managementTab', {refreshNow: new Date()});
      return true;
    }

    if (isAddedSessionForm) {
      Actions.replace('managementTab', {refreshNow: new Date()});
      return true;
    }
    if (isAddedTeamEventForm || teamEventId) {
      Actions.replace('teamEventDetail', {
        isCreatorView: true,
        data: detailData,
        isAddedTeamEventForm: true,
      });
      return true;
    }

    Actions.pop();
  };

  const sessionInvite = () => {
    setLoading(true);
    dispatch(
      sessionInviteRequest(
        {sessionId, invites: selectedPeople, invitesGroup: selectedGroups},
        (res, err) => {
          if (res) {
            setLoading(false);
            setTimeout(() => {
              setModalVisible(true);
            }, 800);
          }
        },
      ),
    );
  };

  const seasonInvite = () => {
    setLoading(true);
    dispatch(
      seasonInviteRequest(
        {seasonId, invites: selectedPeople, invitesGroup: selectedGroups},
        (res, err) => {
          if (res) {
            setLoading(false);
            setTimeout(() => {
              setModalVisible(true);
            }, 800);
          }
        },
      ),
    );
  };

  const eventInvite = () => {
    setLoading(true);
    dispatch(
      eventInviteRequest(
        {eventId, invites: selectedPeople, invitesGroup: selectedGroups},
        (res, err) => {
          if (res) {
            setLoading(false);
            setTimeout(() => {
              setModalVisible(true);
            }, 800);
          }
        },
      ),
    );
  };

  const teamEventInvite = () => {
    setLoading(true);
    dispatch(
      teamEventInviteRequest(
        {eventId: teamEventId, invites: selectedPeople},
        (res, err) => {
          setLoading(false);
          setTimeout(() => {
            setModalVisible(true);
          }, 800);
        },
      ),
    );
  };

  const groupInvite = () => {
    setLoading(true);
    dispatch(
      invitesInGroupRequest(
        {groupId, invites: selectedPeople, invitesGroup: selectedGroups},
        (res, err) => {
          if (res) {
            setLoading(false);
            setTimeout(() => {
              setModalVisible(true);
            }, 800);
          }
        },
      ),
    );
  };

  const teamInvite = () => {
    setLoading(true);
    dispatch(
      inviteTeamRequest(
        {teamId, invites: selectedPeople, invitesGroup: selectedGroups},
        (res, err) => {
          if (res) {
            setLoading(false);
            Actions.pop();
          }
        },
      ),
    );
  };

  const submit = () => {
    setDisableBtnAfterOneCLick(true);

    if (isAddedTeamEventForm && selectedPeople.length == 0) {
      setTimeout(() => {
        setModalVisible(true);
      }, 800);
      return true;
    }

    if (sessionId) return sessionInvite();
    if (eventId) return eventInvite();
    if (seasonId) return seasonInvite();
    if (groupId) return groupInvite();
    if (teamId) return teamInvite();
    if (teamEventId) return teamEventInvite();

    payload.invites = selectedPeople;
    payload.invitesGroup = selectedGroups;

    if (isAddedEventForm) {
      dispatch(
        addEventRequest(payload, res => {
          if (res) {
            dispatch(
              getOwnEventsRequest({limit: 300, offset: 0}, res => {
                setModalVisible(true);
              }),
            );
          }
        }),
      );
    }
    if (isAddedSessionForm) {
      dispatch(
        addSessionRequest(payload, res => {
          if (res) {
            dispatch(
              getOwnSessionsRequest({limit: 300, offset: 0}, res => {
                setModalVisible(true);
              }),
            );
          }
        }),
      );
    }
    if (isAddedSeasonForm) {
      dispatch(
        addSeasonRequest(payload, res => {
          if (res) {
            dispatch(
              getOwnSeasonsRequest({limit: 300, offset: 0}, res => {
                setModalVisible(true);
              }),
            );
          }
        }),
      );
    }
    if (isAddedGroupForm) {
      dispatch(
        createGroupRequest(payload, (res, err) => {
          if (res) setModalVisible(true);
        }),
      );
    }
    return true;
  };

  const renderPeopleList = useMemo(
    () => (
      <>
        {peopleList?.length > 0 ? (
          <>
            <View style={styles.totalPeopleView}>
              <Text style={styles.peopleText}>People</Text>

              <ButtonView
                style={styles.selectAllView}
                onPress={() => selectAll()}>
                <Text style={styles.selectAllText}>Select All</Text>

                <View style={styles.radioBoxView}>
                  {selectAllSelected && <View style={styles.radioBox}></View>}
                </View>
              </ButtonView>
            </View>
            <View
              style={[
                AppStyles.mTop20,
                {flex: isAddedGroupForm || groupList.length == 0 ? 1 : 0.7},
              ]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={peopleList}
                renderItem={({item, index}) => {
                  if (item.member && !teamEventId) return true;
                  if (item.invited) return true;
                  return (
                    <ButtonView
                      style={styles.invitePeopleMainView}
                      onPress={() => handleRadioButtonToggle(index)}>
                      <View style={styles.invitePeopleView}>
                        <Image
                          source={{uri: item.image}}
                          style={{borderRadius: 50, width: 40, height: 40}}
                        />
                        <Text style={styles.invitePeopleText}>{item.name}</Text>
                      </View>

                      <View style={styles.radioBoxView}>
                        {item.isSelected === true && (
                          <View style={styles.radioBox}></View>
                        )}
                      </View>
                    </ButtonView>
                  );
                }}
              />
            </View>

            {!isAddedGroupForm && groupList?.length > 0 && (
              <View style={[AppStyles.mTop20, {flex: 0.3}]}>
                <Text
                  size={18}
                  bold="600"
                  style={[styles.peopleText, {...AppStyles.mBottom10}]}>
                  Groups
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={groupList}
                  renderItem={({item, index}) => {
                    if (!item.privacy) return null;
                    return (
                      <ButtonView
                        style={styles.invitePeopleMainView}
                        onPress={() => handleGroupRadioButtonToggle(index)}>
                        <View style={styles.invitePeopleView}>
                          <FastImage
                            style={{
                              borderRadius: 50,
                              width: 40,
                              height: 40,
                            }}
                            source={{
                              uri: item.image,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                          <Text style={styles.invitePeopleText}>
                            {item.title}
                          </Text>
                        </View>

                        <View style={styles.radioBoxView}>
                          {item.isSelected === true && (
                            <View style={styles.radioBox}></View>
                          )}
                        </View>
                      </ButtonView>
                    );
                  }}
                />
              </View>
            )}
            <Button
              background={Colors.white}
              onPress={submit}
              icon="righArrowIcon"
              iconRight
              disabled={selectedPeople.length == 0 || disableBtnAfterOneCLick}
              raised
              style={[
                AppStyles.mLeft30,
                AppStyles.mRight30,
                AppStyles.mBottom15,
                AppStyles.mTop15,
              ]}>
              {`DONE`}
            </Button>
          </>
        ) : (
          <View
            style={[styles.container, {...AppStyles.centerInner, flex: 0.8}]}>
            <Text color={Colors.white} textAlign="center">
              No user found.
            </Text>
          </View>
        )}
      </>
    ),

    [peopleList],
  );

  const renderPopupModal = useMemo(
    () => (
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={handleModalButton}
        image={Images.modalIcon}
        heading={modalHeading}
        description={''}
        buttonText={modalButtonText}
      />
    ),
    [isModalVisible],
  );

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack={!isSkipButtonVisible}
      headerTitle={strings.INVITE}>
      {!loading && (
        <View style={styles.container}>
          <View style={styles.searchView}>
            <Image source={Images.searchIcon3} />

            <TextInput
              style={styles.textInput}
              placeholder="Search Here"
              placeholderTextColor="#21252580"
              value={searchValue}
              autoFocus
              onChangeText={value => {
                setSearchValue(value);
                setPeopleList(
                  teamEventId
                    ? teamMembersList?.filter(obj =>
                        obj.name
                          .toLocaleLowerCase()
                          .includes(value.toLocaleLowerCase().trim()),
                      )
                    : publicUsers?.filter(obj =>
                        obj.name
                          .toLocaleLowerCase()
                          .includes(value.toLocaleLowerCase().trim()),
                      ),
                );
              }}
              selectionColor={Colors.black}
            />
          </View>
          {renderPeopleList}
        </View>
      )}

      {isSkipButtonVisible && (
        <ButtonView
          disabled={disableBtnAfterOneCLick}
          style={styles.skipButton}
          onPress={() => submit()}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </ButtonView>
      )}

      {renderPopupModal}

      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default InvitePeopleScreen;
