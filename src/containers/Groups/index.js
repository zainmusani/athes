import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {getOwnGroupsRequest} from '../../actions/Group';
import {
  ButtonView,
  Loader,
  ScreenWrapper,
  Text,
  TopTabbar,
} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';

const Groups = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(() => 1);
  const [myGroups, setMyGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const {ownGroupsList} = useSelector(state => state.group);
  const {refreshNow} = props;

  useEffect(() => {
    setLoading(true);
    getGroupsList();
  }, [refreshNow]);

  useEffect(() => {
    let myGroups = [];
    let joinGroups = [];
    if (ownGroupsList) {
      ownGroupsList.forEach(item => {
        if (!item.member) {
          myGroups.push(item);
        }
        if (item.member) {
          joinGroups.push(item);
        }
      });
      setMyGroups(myGroups);
      setJoinedGroups(joinGroups);
    }
  }, [ownGroupsList]);

  const getGroupsList = () => {
    dispatch(
      getOwnGroupsRequest({limit: 300, offset: 0}, (res, err) => {
        setLoading(false);
      }),
    );
  };

  const renderEmptyView = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          color={Colors.white}
          style={{...AppStyles.mBottom10}}
          textAlign="center"
          size={Fonts.size.xLarge}
          type={Fonts.type.medium}
          bold="600">
          GROUP NOT FOUND
        </Text>
        {tabs == 1 && (
          <>
            <Text
              style={{...AppStyles.mBottom10}}
              textAlign="center"
              size={Fonts.size.xSmall}
              color={`#656F77`}>
              Add Group Now
            </Text>
            <ButtonView
              style={styles.addbg}
              onPress={() => {
                Actions.createGroup();
              }}>
              <Image source={Images.add} alt="add" style={styles.addImg} />
            </ButtonView>
          </>
        )}
      </View>
    );
  };

  const renderGroupList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ownGroupsList}
        style={{flex: 1}}
        onRefresh={() => {
          setLoading(true);
          getGroupsList();
        }}
        refreshing={false}
        renderItem={({item}) => {
          if (tabs === 1 && item.member) return null;
          if (tabs === 2 && !item.member) return null;
          return (
            <ButtonView
              style={styles.container}
              onPress={() =>
                Actions.replace('groupDetail', {groupId: item.groupId})
              }>
              <ImageBackground
                source={{uri: item.image}}
                style={styles.bgImage}
                resizeMode={'cover'}>
                <View style={styles.textView}>
                  <View style={AppStyles.flex}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <Text style={styles.date}>{item?.memberCount} members</Text>
                </View>
                <Image
                  source={Images.imageShadow}
                  resizeMode={'cover'}
                  style={styles.shadow}
                />
              </ImageBackground>
            </ButtonView>
          );
        }}
      />
    );
  };

  return (
    <>
      <ScreenWrapper
        pageBackground={Colors.black}
        leftBtnImage={Images.back_btn}
        leftBtnPress={() => Actions.reset('athes_tab')}
        headerTitle={`Groups`}
        rightBtnImage={Images.addIconBlack}
        rightBtnPress={() => Actions.createGroup()}>
        <TopTabbar
          array={[
            {id: 1, status: 'My Groups'},
            {id: 2, status: 'Joined Groups'},
          ]}
          tabs={tabs}
          setTabs={setTabs}
        />
        {!loading && (
          <>
            {tabs == 1 && myGroups.length == 0 && renderEmptyView()}
            {tabs == 2 && joinedGroups.length == 0 && renderEmptyView()}
            {renderGroupList()}
          </>
        )}
        {loading && (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <ActivityIndicator
              color={Colors.grey2}
              animating
              size="small"
              style={{marginBottom: 30}}
            />
          </View>
        )}
      </ScreenWrapper>
    </>
  );
};

export default Groups;
