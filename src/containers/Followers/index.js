import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StatusBar,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {getWallPostsListRequest} from '../../actions/PostActions';
import {
  followingRequest,
  followingSuccess,
  getPublicUsersSuccess,
} from '../../actions/UserActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Loader,
  Post,
  TextInput,
  Button,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const Followers = props => {
  const {request, isProfileView, hasFollowers, userId, usersData} = props;
  const dispatch = useDispatch();
  const {publicUsers, data: loggedInUser} = useSelector(state => state.user);

  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState(() => []);

  useEffect(() => {
    if (!usersData) {
      if (!searchValue) {
        setLoading(true);
      }
      let payload = {
        limit: 300,
        offset: 0,
        dummy: Math.random(),
        userId,
      };
      dispatch(
        request(payload, res => {
          setLoading(false);
        }),
      );
    } else {
      let newUsers = _.cloneDeep(usersData);
      newUsers = newUsers.filter(res => (res.follow = 1));
      setUsers(newUsers);
    }
  }, []);

  useEffect(() => {
    if (!usersData) {
      setUsers(publicUsers);
    }
  }, [publicUsers]);

  const [loading, setLoading] = useState(false);

  const searchRef = useRef();

  const followRequest = data => {
    let item = _.clone(data);
    item.follow = item.follow == 1 ? 0 : 1;

    let payload = {
      following_id: item.userId || item.id,
      ...item,
    };
    dispatch(
      followingRequest(payload, res => {
        if (usersData) {
          let newUsers = users.filter(res => item.id != res.id);
          setUsers(newUsers);
          dispatch(
            getWallPostsListRequest(
              {
                limit: 10,
                offset: 0,
                keyword: '',
                filter: '',
              },
              res => {},
            ),
          );
        }
      }),
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      leftBtnPress={() => {
        dispatch(getPublicUsersSuccess([]));
        isProfileView ? Actions.pop() : Actions.reset('athes_tab');
      }}
      headerTitle={hasFollowers ? strings.FOLLOWERS : strings.FOLLOWING}>
      {!loading && (
        <View style={styles.container}>
          <TextInput
            placeholder="Search Here"
            placeholderTextColor="#9C9C9C"
            autoCapitalize="none"
            containerStyle={{
              backgroundColor: Colors.gray10,
              borderRadius: 12,
              ...AppStyles.pLeft20,
              ...AppStyles.marginVerticalBase,
            }}
            icon={{
              url: Images.search,
              width: 18,
              height: 18,
              style: {
                transform: [{rotate: '270deg'}],
                tintColor: Colors.graybrown,
              },
            }}
            ref={searchRef}
            customStyle={{
              flexGrow: 1,
              ...AppStyles.paddingHorizontalBase,
              ...AppStyles.pLeft30,
              height: 40,
              color: Colors.black1,
              fontWeight: '500',
            }}
            onSubmitEditing={() => {
              searchRef.current.blur();
            }}
            selectionColor={Colors.black}
            onChangeText={value => {
              setSearchValue(value);
              setUsers(
                publicUsers?.filter(obj =>
                  obj.name
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase().trim()),
                ),
              );
            }}
          />
          <View style={{flex: 1}}>
            {users && (
              <KeyboardAwareFlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={item => {
                  item?.userId || item?.id;
                }}
                data={users}
                renderItem={({item, index}) => {
                  return (
                    <>
                      {item?.name
                        .toLocaleLowerCase()
                        .includes(searchValue.toLocaleLowerCase().trim()) && (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            ...AppStyles.mBottom20,
                            alignItems: 'center',
                          }}>
                          <ButtonView
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              Actions.replace('profile', {
                                userId: item?.userId || item?.id,
                                requested_role: item.role_id,
                                publicView:
                                  loggedInUser?.id !=
                                  (item?.userId || item?.id),
                              });
                            }}>
                            <FastImage
                              style={{width: 47, height: 47, borderRadius: 47}}
                              source={{
                                uri: item.image,
                                priority: FastImage.priority.normal,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                              style={{
                                flexGrow: 1,
                                ...AppStyles.pLeft10,
                                ...AppStyles.pRight10,
                              }}>
                              <Text
                                size={Fonts.size.semiMedium}
                                color={Colors.white}
                                bold="700"
                                type={Fonts.type.bold}>
                                {item?.name}
                              </Text>
                              <Text
                                size={Fonts.size.xxxxSmall}
                                color={Colors.grey4}>
                                {util.getRoleNameByID(item?.role_id)}
                              </Text>
                            </View>
                          </ButtonView>

                          <ButtonView
                            onPress={() => followRequest(item)}
                            style={{
                              backgroundColor: Colors.white,
                              ...AppStyles.paddingHorizontalBase,
                              paddingVertical: 7,
                              width: 110,
                            }}>
                            <Text
                              size={Fonts.size.xSmall}
                              type={Fonts.type.bold}
                              color={Colors.black}
                              bold="500"
                              style={{
                                textAlign: 'center',
                              }}>
                              {item.follow == 1 ? 'Following' : 'Follow'}
                            </Text>
                          </ButtonView>
                        </View>
                      )}
                    </>
                  );
                }}
              />
            )}
          </View>
        </View>
      )}
      {loading && (
        <View style={styles.fetchingDataLoader}>
          <ActivityIndicator color={Colors.white} />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Followers;
