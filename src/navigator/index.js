// @flow
import React from 'react';
import {Actions, Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Colors} from '../theme';
import styles from './styles';
import {
  RecordVideo,
  AboutUs,
  AddCalendar,
  AddEvent,
  AddTeamEvent,
  AddFacility,
  AddSeason,
  AddSession,
  AthleteCancel,
  AthleteEnroll,
  AthleteStep,
  Calendar,
  Chat,
  ChoiceRole,
  CoachInvite,
  CoachSearch,
  CoachStep,
  CreateChatGroup,
  CreateGroup,
  Dashboard,
  Earnings,
  EnrollPeopleList,
  FacilityDetail,
  FacilityStep,
  Followers,
  ForgotPassword,
  GetStarted,
  GroupDetail,
  Groups,
  introVideo,
  Investments,
  InvitePeopleScreen,
  Login,
  ManagementTab,
  MessageView,
  NewGroup,
  Notification,
  OrganizationStep,
  Otp,
  EventDetail,
  TeamEventDetail,
  SeasonDetail,
  SessionDetail,
  ParentStep,
  ParntAthleteAdd,
  PaymentWebView,
  PrivacyPolicy,
  Profile,
  Report,
  ResetPassword,
  Search,
  SelectContacts,
  Setting,
  SignUp,
  SinglePostView,
  Store,
  Stripe,
  StripeCardList,
  Support,
  TeamStep,
  TermsAndCondition,
  Welcome,
  WritePost,
  DeepLinkScreen,
} from '../containers';

import {
  AddMoreInputs,
  InLargeView,
  SearchFilter,
  SingalPost,
  Tabbar,
  VideoComponent,
} from '../components';
import {BASE_URL} from '../config/WebService';
import util from '../util';
import PaymenetWebView from '../containers/PaymenetWebView';

function onBackPress() {
  // if (Actions.state.index === 0) {
  //   return false;
  // }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Scene
      key="welcome"
      component={Welcome}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('welcome');
      }}
    />
    <Scene
      key="introvideo"
      component={introVideo}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('introvideo');
      }}
    />
    <Scene
      key="getstarted"
      component={GetStarted}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('getstarted');
      }}
    />
    <Scene
      key="login"
      component={Login}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('login');
      }}
    />
    <Scene
      key="forgotpassword"
      component={ForgotPassword}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('forgotpassword');
      }}
    />
    <Scene
      key="signup"
      component={SignUp}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('signup');
      }}
    />
    <Scene
      key="otp"
      component={Otp}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('otp');
      }}
    />
    <Scene
      key="choicerole"
      component={ChoiceRole}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('choicerole');
      }}
    />

    <Scene
      key="parentStep"
      component={ParentStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('parentStep');
      }}
    />
    <Scene
      key="athleteStep"
      component={AthleteStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('athleteStep');
      }}
    />
    <Scene
      key="coachStep"
      component={CoachStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('coachStep');
      }}
    />
    <Scene
      key="facilityStep"
      component={FacilityStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('facilityStep');
      }}
    />
    <Scene
      key="organizationStep"
      component={OrganizationStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('organizationStep');
      }}
    />
    <Scene
      key="teamStep"
      component={TeamStep}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('teamStep');
      }}
    />

    <Scene
      key="parent_athlete_add"
      component={ParntAthleteAdd}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('parent_athlete_add');
      }}
    />

    <Scene
      key="write_post"
      component={WritePost}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('write_post');
      }}
    />
    <Scene
      key="record_video"
      panHandlers={null}
      component={RecordVideo}
      hideNavBar
      hideTabBar
    />
    <Scene
      key="profile"
      component={Profile}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('profile');
      }}
    />

    <Scene
      key="profileImageView"
      component={InLargeView}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('profileImageView');
      }}
    />

    <Scene
      key="addMoreInputs"
      component={AddMoreInputs}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('addMoreInputs');
      }}
    />
    <Scene
      key="searchfilter"
      component={SearchFilter}
      hideNavBar
      hideTabBar
      onEnter={() => {
        util.setSelectedActionName('searchfilter');
      }}
    />
    <Scene
      key="followers"
      component={Followers}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('followers');
      }}
    />
    <Scene
      key="settings"
      component={Setting}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('settings');
      }}
    />
    <Scene
      key="about_us"
      component={AboutUs}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('about_us');
      }}
    />
    <Scene
      key="privacy_policy"
      component={PrivacyPolicy}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('privacy_policy');
      }}
    />
    <Scene
      key="terms_and_condition"
      component={TermsAndCondition}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('terms_and_condition');
      }}
    />
    <Scene
      key="investments"
      component={Investments}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('investments');
      }}
    />
    <Scene
      key="earnings"
      component={Earnings}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('earnings');
      }}
    />
    <Scene
      key="calendar"
      component={Calendar}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('calendar');
      }}
    />

    <Scene
      key="singal_post"
      component={SingalPost}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('singal_post');
      }}
    />

    <Scene
      key="support"
      component={Support}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('support');
      }}
    />

    <Scene
      key="eventDetail"
      component={EventDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('eventDetail');
      }}
    />
    <Scene
      key="teamEventDetail"
      component={TeamEventDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('teamEventDetail');
      }}
    />

    <Scene
      key="seasonDetail"
      component={SeasonDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('seasonDetail');
      }}
    />

    <Scene
      key="sessionDetail"
      component={SessionDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('sessionDetail');
      }}
    />

    <Scene
      key="athleteEnroll"
      component={AthleteEnroll}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('athleteEnroll');
      }}
    />

    <Scene
      key="invitePeopleScreen"
      component={InvitePeopleScreen}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('invitePeopleScreen');
      }}
    />
    <Scene
      key="athleteCancel"
      component={AthleteCancel}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('athleteCancel');
      }}
    />

    <Scene
      key="video_component"
      component={VideoComponent}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('video_component');
      }}
    />
    <Scene
      key="coachInvite"
      component={CoachInvite}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('coachInvite');
      }}
    />
    <Scene
      key="addSeason"
      component={AddSeason}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addSeason');
      }}
    />
    <Scene
      key="addEvent"
      component={AddEvent}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addEvent');
      }}
    />
    <Scene
      key="addTeamEvent"
      component={AddTeamEvent}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addTeamEvent');
      }}
    />
    <Scene
      key="addSession"
      component={AddSession}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addSession');
      }}
    />
    <Scene
      key="enrollPeopleList"
      component={EnrollPeopleList}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('enrollPeopleList');
      }}
    />
    <Scene
      key="addCalendar"
      component={AddCalendar}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addCalendar');
      }}
    />
    <Scene
      key="facilityDetail"
      component={FacilityDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('facilityDetail');
      }}
    />
    <Scene
      key="addFacility"
      component={AddFacility}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('addFacility');
      }}
    />

    <Scene
      key="groups"
      component={Groups}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('groups');
      }}
    />
    <Scene
      key="createGroup"
      component={CreateGroup}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('createGroup');
      }}
    />
    <Scene
      key="groupDetail"
      component={GroupDetail}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('groupDetail');
      }}
    />

    <Scene
      key="chat"
      component={Chat}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('chat');
      }}
    />
    <Scene
      key="messageView"
      component={MessageView}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('messageView');
      }}
    />
    <Scene
      key="selectContacts"
      component={SelectContacts}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('selectContacts');
      }}
    />
    <Scene
      key="newGroup"
      component={NewGroup}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('newGroup');
      }}
    />
    <Scene
      key="createChatGroup"
      component={CreateChatGroup}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('createChatGroup');
      }}
    />
    <Scene
      key="resetPassword"
      component={ResetPassword}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('resetPassword');
      }}
    />
    <Scene
      key="report"
      component={Report}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('report');
      }}
    />
    <Scene
      key="stripeCardList"
      component={StripeCardList}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('stripeCardList');
      }}
    />
    <Scene
      key="stripe"
      component={Stripe}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('stripe');
      }}
    />
    <Scene
      key="paymentWebView"
      component={PaymentWebView}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('paymentWebView');
      }}
    />

    <Scene
      key="managementTab"
      component={ManagementTab}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('managementTab');
      }}
    />

    <Scene
      key="notification"
      component={Notification}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('notification');
      }}
    />
    <Scene
      key="singlePostView"
      component={SinglePostView}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('singlePostView');
      }}
    />
    <Scene
      key="deepLinkScreen"
      component={DeepLinkScreen}
      hideNavBar
      onEnter={() => {
        util.setSelectedActionName('deepLinkScreen');
      }}
    />

    <Tabs
      key="athes_tab"
      swipeEnabled={true}
      tabBarComponent={() => <Tabbar />}
      tabBarPosition="bottom"
      showLabel={false}
      tabBarStyle={styles.tabBar}
      hideNavBar>
      <Stack key="dashboard_tab" title="Dashboard" initial>
        <Scene
          key="dashboard"
          component={Dashboard}
          hideNavBar
          initial
          onEnter={() => {
            util.setSelectedActionName('dashboard');
          }}
        />
      </Stack>

      <Stack key="search_tab" title="Search">
        <Scene
          key="search"
          component={Search}
          hideNavBar
          onEnter={() => {
            util.setSelectedActionName('search');
          }}
        />
      </Stack>

      {/* Parent Athlete and Athlete Tab */}
      <Stack key="athlete_tab" title="athlete_tab">
        <Scene
          key="coachsearch"
          component={CoachSearch}
          hideNavBar
          onEnter={() => {
            util.setSelectedActionName('coachsearch');
          }}
        />
      </Stack>

      <Stack key="store_tab" title="Store">
        <Scene
          key="store"
          component={Store}
          hideNavBar
          onEnter={() => {
            util.setSelectedActionName('store');
          }}
        />
      </Stack>
    </Tabs>
  </Stack>,
);

export default () => {
  const linking = {
    prefixes: [BASE_URL, 'athesApp://'],
  };
  return (
    <AppNavigator
      linking={linking}
      fallback={() => <Text>Loading...</Text>}
      uriPrefix={'athesApp'}
      navigator={navigator}
      backAndroidHandler={onBackPress}
    />
  );
};

const AppNavigator = connect()(Router);