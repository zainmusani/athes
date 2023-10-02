import React, {useState} from 'react';
import {View, FlatList, Image, RefreshControl} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ButtonView,
  ScreenWrapper,
  EventTemplate,
  TopTabbar,
  Loader,
  Text,
} from '../../../components';
import {strings, CreatorTabsArray} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from './styles';
import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOwnEventsRequest} from '../../../actions/EventsActions.js';
import {getOwnSessionsRequest} from '../../../actions/SessionsActions';
import {getOwnSeasonsRequest} from '../../../actions/SeasonsActions';

const Organization = props => {
  const {refreshNow} = props;
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [isListViewVisible, setIsListViewVisible] = useState(false);
  const dispatch = useDispatch(1);
  const {seasonList} = useSelector(state => state.seasons);
  const {sessionList} = useSelector(state => state.sessions);
  const {eventList} = useSelector(state => state.events);

  useEffect(() => {
    if (!loading) setLoading(true);
    switch (tabs) {
      case 1:
        getOwnSessions();
        break;
      case 2:
        getOwnSeasons();
        break;
      case 3:
        getOwnEvents();
        break;
      default:
        setLoading(false);
        break;
    }
  }, [tabs, refreshNow]);

  useEffect(() => {
    if (sessionList.length == 0 && tabs == 1) {
      setIsListViewVisible(false);
    }
    if (seasonList.length == 0 && tabs == 2) {
      setIsListViewVisible(false);
    }
    if (eventList.length == 0 && tabs == 3) {
      setIsListViewVisible(false);
    }
  }, [eventList, sessionList, seasonList, refreshNow]);

  const getOwnSessions = () => {
    dispatch(
      getOwnSessionsRequest({limit: 300, offset: 0}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const getOwnSeasons = () => {
    dispatch(
      getOwnSeasonsRequest({limit: 300, offset: 0}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const getOwnEvents = () => {
    dispatch(
      getOwnEventsRequest({limit: 300, offset: 0}, res => {
        setIsListViewVisible(true);
        setLoading(false);
      }),
    );
  };

  const addButton = () => {
    if (tabs === 1) {
      Actions.addSession();
    }
    if (tabs === 2) {
      Actions.addSeason();
    }
    if (tabs === 3) {
      Actions.addEvent();
    }
  };

  const onPressHandler = item => {
    if (tabs === 1) {
      Actions.sessionDetail({
        isCreatorView: true,
        data: item,
      });
    }
    if (tabs === 2) {
      Actions.seasonDetail({
        isCreatorView: true,
        data: item,
      });
    }
    if (tabs === 3) {
      Actions.eventDetail({
        isCreatorView: true,
        data: item,
      });
    }
  };

  const tabHandler = id => {
    if (!loading) setLoading(true);
    setTabs(id);
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      headerTitle={strings.PARTICIPANTS}>
      <View style={styles.container}>
        <TopTabbar array={CreatorTabsArray} tabs={tabs} setTabs={tabHandler} />

        {!loading && !isListViewVisible ? (
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
                data={sessionList}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      setLoading(true);
                      getOwnSessions();
                    }}
                    tintColor={Colors.black}
                    // colors={[Colors.white, Colors.white]}
                  />
                }
                // onRefresh={() => {
                //   setLoading(true);
                //   getOwnSessions();
                // }}
                // refreshing={loading}
                renderItem={({item}) => {
                  return (
                    <EventTemplate
                      item={item}
                      onPress={() => onPressHandler(item)}
                    />
                  );
                }}
              />
            )}

            {tabs === 2 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={seasonList}
                // onRefresh={() => {
                //   setLoading(true);
                //   getOwnSeasons();
                // }}
                // refreshing={loading}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      setLoading(true);
                      getOwnSeasons();
                    }}
                    tintColor={Colors.black}
                    // colors={[Colors.white, Colors.white]}
                  />
                }
                renderItem={({item}) => {
                  return (
                    <EventTemplate
                      item={item}
                      onPress={() => onPressHandler(item)}
                    />
                  );
                }}
              />
            )}

            {tabs === 3 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventList}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                      setLoading(true);
                      getOwnEvents();
                    }}
                    tintColor={Colors.black}
                    // colors={[Colors.white, Colors.white]}
                  />
                }
                // onRefresh={() => {
                //   setLoading(true);
                //   getOwnEvents();
                // }}
                // refreshing={loading}
                renderItem={({item}) => {
                  return (
                    <EventTemplate
                      item={item}
                      onPress={() => onPressHandler(item)}
                    />
                  );
                }}
              />
            )}
          </>
        )}
      </View>

      <ButtonView style={styles.addIconButton} onPress={() => addButton()}>
        <Image source={Images.addIconBlack} />
      </ButtonView>

      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default Organization;
