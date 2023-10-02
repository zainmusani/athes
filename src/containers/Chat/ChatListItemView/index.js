// @flow
import React from 'react';
import {Image, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {ButtonView} from '../../../components';
import {Images} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const ChatListItemView = props => {
  const {item, _loggedInUserID} = props;
  const {image, name, message, createdDate, isPrivateMember, disableChat} =
    item || {};
  const {msgAuthorDetails} = item || {};
  const {id: groupAuthorId} = msgAuthorDetails || {};

  const shouldDisableChat = () => {
    if (disableChat || isPrivateMember) {
      if (!util.areValuesEqual(groupAuthorId, _loggedInUserID)) {
        return true;
      }
    }
    return false;
  };

  return (
    <ButtonView
      style={styles.chatMainView}
      onPress={() =>
        Actions.messageView({
          item: item,
          disableChatForThisRoom: shouldDisableChat(),
        })
      }>
      <View style={styles.chatView}>
        <Image source={{uri: image}} style={styles.profilePicStyle} />
        <View style={styles.profileNameView}>
          <View style={styles.profileNameAndLastMessageCont}>
            <Text style={styles.profileName}>{name}</Text>
            {!util.isEmptyValue(message) && (
              <Text
                style={styles.subtitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {message}
              </Text>
            )}
          </View>
          <Text style={styles.date}>{util.formatDate(createdDate)}</Text>
        </View>
      </View>
      <Image source={Images.rightIconGray} style={styles.rightArrowIcon} />
    </ButtonView>
  );
};

const mapStateToProps = ({user}) => ({
  _loggedInUserID: user.data.id,
});
export default connect(mapStateToProps, null)(ChatListItemView);
