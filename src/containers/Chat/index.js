import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {getRecentChatListRequest} from '../../actions/ChatActions';
import {ButtonView, Loader, ScreenWrapper, Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import ChatListItemView from './ChatListItemView';
import styles from './styles';

const limit = 10;
const Chat = props => {
  const {_recentChatList} = props || [];
  const [isLoading, setIsLoading] = useState(() => false);
  const [isEmptyInbox, setEmptyInbox] = useState(() => false);

  const [hasNextPage, setHasNextPage] = useState(() => false);
  const [hasMoreData, setHasMoreData] = useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (util.isArrayEmpty(_recentChatList)) {
      setIsLoading(true);

      const params = `?limit=${limit}`;
      dispatch(
        getRecentChatListRequest(params, (res, data) => {
          if (res && !util.isArrayEmpty(data)) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setIsLoading(false);
        }),
      );
    }
  }, []);

  useEffect(() => {
    util.isArrayEmpty(_recentChatList)
      ? setEmptyInbox(true)
      : setEmptyInbox(false);
  }, [_recentChatList]);

  function loadMoreData() {
    if (util.isArrayEmpty(_recentChatList)) return;

    if (hasNextPage) {
      setHasMoreData(true);
      const lastIndexItem = _recentChatList[_recentChatList.length - 1];
      const lastFetchedRoomID = lastIndexItem.roomID;
      const params = `?limit=${limit}&lastRoom=${lastFetchedRoomID}`;
      dispatch(
        getRecentChatListRequest(params, (res, data) => {
          if (res && !util.isArrayEmpty(data)) {
            setHasMoreData(false);
          } else {
            setHasMoreData(false);
            setHasNextPage(false);
          }
        }),
      );
    }
  }

  const renderEmptyInboxView = () => (
    <View style={styles.emptyView}>
      <Text style={styles.emptyHeading}>{strings.EMPTY_INBOX}</Text>
      <Text style={styles.emptyDescription}>
        {strings.NO_MSGS_LEFT_TO_READ}
      </Text>
      <ButtonView
        style={styles.addBg}
        onPress={() => {
          Actions.selectContacts();
        }}>
        <Image source={Images.add} alt="add" style={styles.addImg} />
      </ButtonView>
    </View>
  );

  const renderBottomLoaderView = () => (
    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 40}}>
      <ActivityIndicator color={Colors.white} />
    </View>
  );

  const renderChatList = () => {
    return (
      <FlatList
        data={_recentChatList}
        style={AppStyles.mTop10}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ChatListItemView item={item} />}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        ListFooterComponent={hasMoreData && renderBottomLoaderView()}
      />
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.CHAT}
      rightBtnImage={isEmptyInbox ? undefined : Images.profileIcon}
      rightBtnPress={() => {
        isEmptyInbox ? undefined : Actions.selectContacts();
      }}>
      {isLoading ? (
        renderBottomLoaderView()
      ) : (
        <View style={styles.container}>
          {isEmptyInbox ? renderEmptyInboxView() : renderChatList()}
        </View>
      )}
    </ScreenWrapper>
  );
};

const mapStateToProps = ({chat}) => ({
  _recentChatList: chat.recentChatListing,
});
export default connect(mapStateToProps, null)(Chat);
