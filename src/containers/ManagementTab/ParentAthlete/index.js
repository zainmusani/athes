import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, RefreshControl} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {enrolledEventsRequest} from '../../../actions/EventsActions';
import {enrolledSeasonRequest} from '../../../actions/SeasonsActions';
import {enrolledSessionRequest} from '../../../actions/SessionsActions';
import {userTeamsListRequest} from '../../../actions/TeamActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  ParentAthleteTemplate,
  TopTabbar,
} from '../../../components';
import {strings, ParticipationsTabsArray} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from '../styles';

const ParentAthlete = props => {
  const {refreshNow, tab} = props;
  const [tabs, setTabs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListViewVisible, setIsListViewVisible] = useState(false);
  const user = useSelector(state => state.user.data);
  const {enrolledEvents} = useSelector(state => state.events);
  const {enrolledSessions} = useSelector(state => state.sessions);
  const {enrolledSeasons} = useSelector(state => state.seasons);
  const {userTeamsList} = useSelector(state => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    switch (tabs) {
      case 1:
        getEnrolledSessions();
        break;
      case 2:
        getEnrolledEvents();
        break;
      case 3:
        getEnrolledSeasons();
        break;
      case 4:
        getEnrolledTeams();
        break;
      default:
        setLoading(false);
        break;
    }
  }, [tabs, refreshNow]);

  useEffect(() => {
    if (enrolledSessions.length == 0 && tabs == 1) {
      setIsListViewVisible(false);
    }
    if (enrolledEvents.length == 0 && tabs == 2) {
      setIsListViewVisible(false);
    }
    if (enrolledSeasons.length == 0 && tabs == 3) {
      setIsListViewVisible(false);
    }
    if (userTeamsList.length == 0 && tabs == 4) {
      setIsListViewVisible(false);
    }
  }, [enrolledEvents, enrolledSessions, enrolledSeasons, userTeamsList]);

  const getEnrolledSessions = () => {
    dispatch(
      enrolledSessionRequest({limit: 300, offset: 0, userId: user.id}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const getEnrolledEvents = () => {
    dispatch(
      enrolledEventsRequest({limit: 300, offset: 0, userId: user.id}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const getEnrolledSeasons = () => {
    dispatch(
      enrolledSeasonRequest({limit: 300, offset: 0, userId: user.id}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const getEnrolledTeams = () => {
    dispatch(
      userTeamsListRequest({limit: 300, offset: 0, userId: user.id}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      headerTitle={strings.PARTICIPANTS}>
      <View style={styles.container}>
        <TopTabbar
          array={ParticipationsTabsArray}
          tabs={tabs}
          setTabs={setTabs}
        />
        {!loading && (
          <>
            {!isListViewVisible ? (
              <View style={{flex: 1, ...AppStyles.centerInner}}>
                <Text
                  size={22}
                  color={Colors.white}
                  textAlign="center"
                  style={AppStyles.mBottom10}>
                  Data Not Found
                </Text>
                <Text color={Colors.grey2} size={10}>
                  Data Not Found.
                </Text>
              </View>
            ) : (
              <>
                {tabs === 1 && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={enrolledSessions}
                    // onRefresh={() => {
                    //   setLoading(true);
                    //   getEnrolledSeasons();
                    // }}
                    // refreshing={loading}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                          setLoading(true);
                          getEnrolledSessions();
                        }}
                        tintColor={Colors.black}
                        // colors={[Colors.white, Colors.white]}
                      />
                    }
                    renderItem={({item}) => {
                      return (
                        <ParentAthleteTemplate
                          item={item}
                          hasTimings
                          onPress={() =>
                            Actions.sessionDetail({
                              data: item,
                              isUserEnroll: true,
                            })
                          }
                        />
                      );
                    }}
                  />
                )}

                {
                  tabs === 2 && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={enrolledEvents}
                      // onRefresh={() => {
                      //   setLoading(true);
                      //   getEnrolledEvents();
                      // }}
                      // refreshing={loading}
                      refreshControl={
                        <RefreshControl
                          refreshing={false}
                          onRefresh={() => {
                            setLoading(true);
                            getEnrolledEvents();
                          }}
                          tintColor={Colors.black}
                          // colors={[Colors.white, Colors.white]}
                        />
                      }
                      renderItem={({item}) => {
                        return (
                          <ParentAthleteTemplate
                            item={item}
                            hasTimings
                            onPress={() =>
                              Actions.eventDetail({
                                data: item,
                                isUserEnroll: true,
                              })
                            }
                          />
                        );
                      }}
                    />
                  )}

                {
                  tabs === 3 && (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={enrolledSeasons}
                      // onRefresh={() => {
                      //   setLoading(true);
                      //   getEnrolledSeasons();
                      // }}
                      // refreshing={loading}
                      refreshControl={
                        <RefreshControl
                          refreshing={false}
                          onRefresh={() => {
                            setLoading(true);
                            getEnrolledSeasons();
                          }}
                          tintColor={Colors.black}
                          // colors={[Colors.white, Colors.white]}
                        />
                      }
                      renderItem={({item}) => {
                        return (
                          <ParentAthleteTemplate
                            item={item}
                            isSeasonView={true}
                            onPress={() =>
                              Actions.seasonDetail({
                                data: item,
                                isUserEnroll: true,
                              })
                            }
                          />
                        );
                      }}
                    />
                  )}

                {tabs === 4 && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={userTeamsList}
                    // onRefresh={() => {
                    //   setLoading(true);
                    //   getEnrolledTeams();
                    // }}
                    // refreshing={loading}
                    refreshControl={
                      <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                          setLoading(true);
                          getEnrolledTeams();
                        }}
                        tintColor={Colors.black}
                        // colors={[Colors.white, Colors.white]}
                      />
                    }
                    renderItem={({item}) => {
                      return (
                        <ParentAthleteTemplate
                          item={item}
                          isTeamView={true}
                          onPress={() =>
                            Actions.profile({
                              userId: item.id,
                              requested_role: 4,
                              publicView: true,
                            })
                          }
                        />
                      );
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};
export default ParentAthlete;
