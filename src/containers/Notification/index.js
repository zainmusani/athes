import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SectionList,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch, useSelector} from 'react-redux';
import {joinGroupByNotificationRequest} from '../../actions/Group';
import {
  emptyListNotification,
  getNotificationsList,
  notificationCountRead,
} from '../../actions/NotificationActions';
import {ScreenWrapper, Text} from '../../components';
import {NOTIFICATIONS_TYPE, strings} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

function Notification(props) {
  

  const [isLoading, setIslLoading] = useState(() => false);
  const [isRefreshing, setIsRefreshing] = useState(() => false);
  const [isMoreData, setIsMoreData] = useState(() => false);
  const [isNextPage, setIsNextPage] = useState(() => false);
  const [offset, setOffset] = useState(() => 0);
  const [isDisappear, setIsDisappear] = useState(() => false);
  const [isGroupId, setGroupId] = useState(() => '');
  const { data: loggedInUser } = useSelector(state => state.user);
  
  const notificationsList = useSelector(state => state.notification?.notificationList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyListNotification([]));
    apiCall();
    dispatch(notificationCountRead(0));
  }, []);

  const apiCall = () => {
    const params = `?offset=${0}&limit=${15}`;
    setIslLoading(true);
    dispatch(
      getNotificationsList(params, res => {
          if (!util.isArrayEmpty(res)) {
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
          }
        setIslLoading(false);
        setIsRefreshing(false);
      }),
    );
  };

  function loadMoreData() {
    if (isNextPage) {
      setIsMoreData(true);
      const params = `?offset=${offset}&limit=${15}`;
      dispatch(
        getNotificationsList(params, res => {
          if (!util.isArrayEmpty(res)) {
            setOffset(offset + 15);
            setIsMoreData(false);
            setIsNextPage(true);
          } else {
            setIsNextPage(false);
            setIsMoreData(false);
          }
        }),
      );
    }
  }

  function clickOnJoinGroup(item, isJoin) {
    setGroupId(item?.group?.id);
    const payload = {
      groupId: item?.group?.id,
      notificationId: item?.id,
      isJoin: isJoin,
    };
    dispatch(
      joinGroupByNotificationRequest(payload, res => {
        if (res) {
          setIsDisappear(item?.group?.id);
          isJoin && util.topAlert('Joined successfully');
          !isJoin && util.topAlertError('Group Invite Rejected.');
        }
        setTimeout(() => {
          setGroupId('');
        }, 500);
      }),
    );
  }

  function renderItems(item) {
    const {user, duration, post, group, title, postUri, body, isAccept} =
      item || {};

    return (
      <View style={{marginTop: 15}}>
        {/* Someone Post  */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.POST) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            activeOpacity={0.8}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{title}.</Text>
              <Text style={styles.hrsTxt}>{duration}</Text>
            </View>
            {!util.isEmptyValue(postUri) && (
              <FastImage
                style={styles.postImg}
                source={{
                  uri: postUri,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </TouchableOpacity>
        )}
        {/* Someone Following  */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.FOLLOWING) && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.itemLikeView}
            onPress={() => util.notificationsNavigation(item)}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{title}.</Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Invitation */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.INVITATION) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={[styles.itemMessageTxt]}>{body}.</Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Enroll */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.ENROLL) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <FastImage
              style={styles.img}
              source={{
                uri:
                  user?.profile_image ||
                  'https://ahauserposts.s3.amazonaws.com/crypto+hangout+.jpeg',
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />

            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{body}.</Text>

              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Team Join */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.TEAM_JOIN) && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{body}.</Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.MEETING_BOOK) && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{body}.</Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* JOIN GROUP */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.GROUP) && (
          <View style={styles.itemLikeView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <View style={{flex: 0.08}}>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: user?.profile_image,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={[styles.userName, {marginLeft: 15}]}>
                <Text style={styles.itemMessageTxt}>{body}.</Text>
                <Text style={[styles.hrsTxt]}>{duration}</Text>
              </View>
            </View>
            {util.areValuesEqual(isAccept, 0) && (
              <>
                {!util.isEmptyObject(group) && (
                  <>
                    {!util.areValuesEqual(isDisappear, group?.id) && (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => clickOnJoinGroup(item, 1)}>
                          <Image
                            style={{tintColor: Colors.green}}
                            source={Images.tickIconCircle}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => clickOnJoinGroup(item, 0)}>
                          <Image
                            style={{tintColor: Colors.green, marginLeft: 10}}
                            source={Images.crossIconBlack}></Image>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        )}
        {/* Cancelation */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.CANCELATION) && (
          <TouchableOpacity style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <View>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: user?.profile_image,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                {/* <Image
                    style={[
                      styles.img,
                      {
                        position: 'absolute',
                        right: 0,
                        left: 13,
                        top: 12,
                        borderColor: Colors.white,
                        borderWidth: 1,
                      },
                    ]}
                    source={{uri: user?.profile_image}}
                  /> */}
              </View>
            </View>
            <View style={styles.userName}>
              <Text style={styles.itemMessageTxt}>{body}.</Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* Chat */}
        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.CHAT) && (
          <TouchableOpacity style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={[styles.itemMessageTxt, {marginLeft: 15}]}>
                {title}.
              </Text>
              <Text style={[styles.hrsTxt]}>{duration}</Text>
            </View>
            <FastImage
              style={styles.postImg}
              source={{
                uri: post?.image,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
        )}
        {/* Payment  */}

        {util.areValuesEqual(item?.type, NOTIFICATIONS_TYPE.PAYMENT) && (
          <TouchableOpacity
            onPress={() => {
              util.notificationsNavigation(item);
            }}
            style={styles.itemLikeView}>
            <View style={{flex: 0.08}}>
              <FastImage
                style={styles.img}
                source={{
                  uri: user?.profile_image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.userName}>
              <Text style={[styles.itemMessageTxt]}>{body}.</Text>
              <Text style={styles.hrsTxt}>{duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderNotificationsList(){
    let data = util.manipulateDataForSectionList(notificationsList);
    return (
      <View style={styles.selectionListView}>
        <SectionList
          style={styles.selectionListStyle}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                dispatch(emptyListNotification([]));
                apiCall();
              }}
              tintColor={Colors.white}
            />
          }
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          sections={data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => renderItems(item)}
          renderSectionHeader={({section: {title}}) => {
            if (util.areValuesEqual(title, 'New')) {
              return (
                <>
                  <View style={styles.newView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </>
              );
            } else if (util.areValuesEqual(title, 'Today')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'This Week')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'This Month')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            } else if (util.areValuesEqual(title, 'Others')) {
              return (
                <View>
                  <View style={styles.earlierView} />
                  <Text type="Bold" style={styles.newTxt}>
                    {title}
                  </Text>
                </View>
              );
            }
          }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyNotificationList}>
                <Text style={{color: Colors.white}}>
                  {!isLoading && strings.NO_NOTIFICATIONS_FOUND}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={
            <View style={isMoreData && {marginVertical: 40}}>
              {isMoreData && <ActivityIndicator color={Colors.white} />}
            </View>
          }
        />
      </View>
    );
  } 

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.NOTIFICATIONS}>
      {isLoading ? (
        <View style={styles.fetchingDataLoader}>
          <ActivityIndicator color={Colors.white} />
        </View>
      ) : (
        renderNotificationsList()
      )}
    </ScreenWrapper>
  );
}

Notification.propTypes = {};
Notification.defaultProps = {};

export default Notification;
