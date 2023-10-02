import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Image,
  SectionList,
  StatusBar,
  View,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {ButtonView, Loader, Text, TextInput} from '../../../components';
import {AppStyles, Colors, Images} from '../../../theme';
import util from '../../../util';
import {
  createNewChatGroupRequest,
  getRoomChatRequest,
  saveLastFetchedUnixTimeOfEachRoom,
  setCurrentActiveRoomID,
} from '../../../actions/ChatActions';
import {connectSocket, emitToServer} from '../../../helpers/chatHelper';
import {EMIT_TO_SERVER_TYPES, strings} from '../../../constants';
import styles from './styles';

const limit = 10;
const MessageView = props => {
  const {
    item,
    _allChatMessages,
    _loggedInUserID,
    _unixTimesOfEachRoomObj,
    disableChatForThisRoom,
  } = props;
  const {
    id,
    image,
    name,
    roomID: mRoomID,
    groupAuthorId,
    isPrivateMember = false,
    userID,
  } = item || {};
  const {isGroup = false} = _allChatMessages?.[mRoomID] || {};
  const typeMsg = useRef(null);
  const chatListRef = useRef(null);
  const [messageValue, setMessageValue] = useState('');
  const [roomID, setRoomID] = useState(() => mRoomID);
  const [isLoading, setIsLoading] = useState(() => true);
  const [shouldScroll, setShouldScroll] = useState(() => true);
  const [isFetchingMoreData, setIsFetchingMoreData] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => true);
  const [disableChat, setDisabelChat] = useState(() => disableChatForThisRoom);

  const dispatch = useDispatch();

  useEffect(() => {
    if (util.isFieldNil(disableChatForThisRoom)) {
      const {disableChat = false} = _allChatMessages?.[mRoomID] || {};
      if (disableChat || isPrivateMember) {
        if (!util.areValuesEqual(groupAuthorId, _loggedInUserID)) {
          setDisabelChat(true);
          return;
        }
      }
      setDisabelChat(false);
    }
    connectSocket();
  }, []);

  useEffect(() => {
    if (util.isFieldNil(roomID)) {
      const payload = {
        user_id: _loggedInUserID,
        user_ids: [id],
        title: name,
        disable_chat_for_all_members: false,
        is_group: false,
      };
      dispatch(
        createNewChatGroupRequest(payload, (status, res) => {
          if (status) {
            const {roomID} = res;
            setRoomID(roomID);
            dispatch(setCurrentActiveRoomID(roomID));
            const data = {
              room_id: roomID,
            };
            emitToServer(EMIT_TO_SERVER_TYPES.ROOM_CREATED, data);
          }
        }),
      );
    } else {
      let chatsArr = {};
      if (util.hasObjectWithKey(_allChatMessages, roomID)) {
        chatsArr = _allChatMessages[roomID]?.chats ?? {};
      }
      if (util.isEmptyObject(chatsArr)) {
        const params = `?room_id=${roomID}&limit=${limit}&date=${new Date()}`;
        getChatListApiCall(params, () => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
      dispatch(setCurrentActiveRoomID(roomID));
    }
  }, [roomID]);

  const getChatListApiCall = (params, callBack) => {
    dispatch(
      getRoomChatRequest(params, (res, data) => {
        if (util.isArrayEmpty(data)) {
          setHasMoreData(false);
        }
        callBack();
      }),
    );
  };

  const loadMoreData = event => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const mChatsArrLength =
      _allChatMessages[roomID]?.chats?.length ?? undefined;

    let index =
      _allChatMessages[roomID]?.chats[mChatsArrLength - 1]?.data.length - 1;

    const mLastMsgUnixTime =
      _allChatMessages[roomID]?.chats[mChatsArrLength - 1]?.data[index]
        ?.createdDateUnix;

    if (
      scrollOffset === 0 &&
      mLastMsgUnixTime != _unixTimesOfEachRoomObj?.[roomID]
    ) {
      const data = {
        roomID: roomID,
        unixTime: mLastMsgUnixTime,
      };
      dispatch(saveLastFetchedUnixTimeOfEachRoom(data));
      if (!util.isFieldNil(mChatsArrLength)) {
        setIsFetchingMoreData(true);
        const params = `?room_id=${roomID}&limit=${limit}&last_time=${mLastMsgUnixTime}`;
        getChatListApiCall(params, () => {
          setIsFetchingMoreData(false);
        });
      }
    }
  };

  const handleSendButtonOnPress = () => {
    if (!_.isEmpty(messageValue)) {
      const {firestoreRoomId = -1} = _allChatMessages?.[roomID] || -1;
      if (firestoreRoomId === -1) {
        util.topAlertError('Unable to create Chat Room.');
        return;
      }

      setMessageValue('');
      const payload = {
        room_id: roomID,
        message: messageValue,
        recipient: userID,
        firestoreRoomId,
      };
      emitToServer(EMIT_TO_SERVER_TYPES.SEND_MESSAGE, payload);
    }
  };

  const renderHeaderSection = () => {
    return (
      <View style={styles.headerSection}>
        <ButtonView style={styles.backButtonView} onPress={() => Actions.pop()}>
          <Image source={Images.chatBackButton} />
        </ButtonView>
        <Image source={{uri: image}} style={styles.profilePic} />
        <ButtonView
          onPress={() => {
            const roleID = _allChatMessages?.[mRoomID]?.roleID;
            isGroup
              ? () => {}
              : Actions.push('profile', {
                  userId: _allChatMessages?.[mRoomID]?.userID,
                  requested_role: roleID,
                  publicView: true,
                });
          }}>
          <Text style={styles.profileName}>{name}</Text>
        </ButtonView>
      </View>
    );
  };

  const renderSingleMsg = ({item}) => {
    const {isMyMsg, createdDate, message, msgAuthorDetails} = item || {};
    const {name} = msgAuthorDetails || {};
    return (
      <View style={[styles.msgViewSec, !isMyMsg && styles.othersMsgViewSec]}>
        <Text style={isMyMsg ? styles.myMsgText : styles.othersMsgText}>
          {isGroup && !isMyMsg && `${name}:  `}
          {`${message}`}
        </Text>
        <Text style={[styles.timeText, !isMyMsg && styles.othersMsgTimeText]}>
          {util.formatTime(createdDate)}
        </Text>
      </View>
    );
  };

  const renderChatList = () => (
    <SectionList
      inverted
      sections={_allChatMessages[roomID]?.chats ?? []}
      ref={chatListRef}
      stickySectionHeadersEnabled={false}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderSingleMsg}
      onContentSizeChange={() => {
        if (shouldScroll) {
          setShouldScroll(false);
        }
      }}
      onScroll={event => loadMoreData(event)}
      // renderSectionFooter={({section: {title}}) => (
      //   <Text style={styles.header}>{title}</Text>
      // )}
    />
  );

  const renderTypeAndSendMessageSec = () => (
    <View style={styles.sendTextView}>
      {disableChat ? (
        <></>
      ) : (
        <>
          <View style={AppStyles.flex}>
            <TextInput
              style={styles.sendText}
              placeholder="Type Message"
              placeholderTextColor="#B5B5B5"
              ref={typeMsg}
              value={messageValue}
              selectionColor={Colors.black1}
              onChangeText={value => {
                setMessageValue(value);
              }}
              onSubmitEditing={() => {
                // typeMsg.current.blur();
                handleSendButtonOnPress();
              }}
            />
          </View>

          <ButtonView
            style={styles.sendButtonView}
            onPress={() => {
              // typeMsg.current.blur();
              handleSendButtonOnPress();
            }}>
            <Image source={Images.chatSendIcon} />
          </ButtonView>
        </>
      )}
    </View>
  );

  const renderLoader = style => (
    <View style={style}>
      <ActivityIndicator color={Colors.white} />
    </View>
  );

  const renderPrivateGroupText = () => {
    return (
      <View style={styles.onlyGroupAdminCanSendMsgSec}>
        <Text style={styles.onlyGroupAdminCanSendMsgText}>
          {strings.ONLY_ADMIN_CAN_SEND_MESSAGES}
        </Text>
      </View>
    );
  };

  const renderKeyboardSpacerOnIOS = () =>
    util.isPlatformAndroid() ? <></> : <KeyboardSpacer />;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {renderHeaderSection()}
        {isLoading ? (
          renderLoader(styles.fetchingChatLoader)
        ) : (
          <>
            {isFetchingMoreData &&
              renderLoader(styles.fetchingMoreDataLoaderStyle)}
            {renderChatList()}
            {disableChat && renderPrivateGroupText()}
            {renderTypeAndSendMessageSec()}
            {renderKeyboardSpacerOnIOS()}
          </>
        )}
      </View>
    </>
  );
};

MessageView.propTypes = {
  _allChatMessages: PropTypes.object.isRequired,
  disableChatForThisRoom: PropTypes.bool,
};
MessageView.defaultProps = {
  disableChatForThisRoom: undefined,
};

const mapStateToProps = ({chat, user}) => ({
  _allChatMessages: chat.chatMessages,
  _unixTimesOfEachRoomObj: chat.unixTimeOfEachRoom,
  _loggedInUserID: user.data.id,
});
export default connect(mapStateToProps, null)(MessageView);
