// @flow
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image, View, FlatList} from 'react-native';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';
import {ButtonView, ScreenWrapper, Text} from '../../components';
import {strings, coachProfile} from '../../constants';

const CoachInvite = () => {
  const [isCoachInvite, setCoachInvite] = useState('');
  const [isInvitedPopupVisible, setInvitedPopupVisible] = useState(false);

  return (
    <ScreenWrapper pageBackground={Colors.black} hasBack>
      {isInvitedPopupVisible && (
        <View style={styles.invitedMainView}>
          <View>
            <Text style={styles.coachInviteText1}>Invite Sent To Coach</Text>
            <Text style={styles.coachInviteText2}>
              Notification Sent to Coach To Join
            </Text>
          </View>

          <ButtonView style={styles.sendButtonView}>
            <Text style={styles.sendButton}>Sent</Text>
          </ButtonView>
        </View>
      )}
      <View style={[AppStyles.flex, AppStyles.mTop5]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={coachProfile}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <View style={styles.mainView}>
                  <View style={AppStyles.flex}>
                    <Text style={styles.achievementText}>achievement</Text>
                    <Text style={styles.eventName}>{item.achievements}</Text>
                  </View>

                  <View style={[AppStyles.flex, AppStyles.alignItemsFlexEnd]}>
                    <View style={styles.matchPointsMainView}>
                      <Text style={styles.matchText}>Match</Text>

                      <View style={styles.matchPointsView}>
                        <Image source={Images.orangeDiamondIcon} />
                        <Text style={styles.pointsText}>
                          {item.matchPoints}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.coachProfileMainView}>
                  <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                    <Image
                      source={item.coachProfilePic}
                      style={{borderRadius: 50, width: 32, height: 32}}
                    />

                    <View style={AppStyles.mLeft10}>
                      <Text style={styles.coachName}>{item.name}</Text>
                      <Text style={styles.coachText}>Coach</Text>
                    </View>
                  </View>

                  <ButtonView
                    style={{
                      padding: 10,
                      paddingRight: 0,
                    }}
                    onPress={() => {
                      setCoachInvite(item.name);
                      setInvitedPopupVisible(true);
                      setTimeout(() => {
                        setInvitedPopupVisible(false);
                      }, 4000);
                    }}>
                    <Text style={styles.inviteText}>
                      {isCoachInvite === item.name ? 'View Profile' : 'Invite'}
                    </Text>
                  </ButtonView>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CoachInvite);
