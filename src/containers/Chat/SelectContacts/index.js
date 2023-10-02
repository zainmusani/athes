import React, {useEffect, useMemo, useReducer} from 'react';
import {ActivityIndicator, FlatList, Image, Keyboard, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getChatContactsList,
  getSearchChatContactsListRequest,
} from '../../../actions/ChatActions';
import {ButtonView, ScreenWrapper, Text, TextInput} from '../../../components';
import {strings} from '../../../constants';
import {Colors, Images} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const limit = 10;
const SelectContacts = props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      contactList: [],
      offset: 0,
      hasNextPage: false,
      hasMoreData: false,
      searchText: '',
      searchContactList: [],
      searchOffset: 0,
      hasSearchNextPage: false,
      searchHasMoreData: false,
      isFetchingData: false,
      isSearching: false,
    },
  );
  const {
    contactList,
    offset,
    hasNextPage,
    hasMoreData,
    searchText,
    searchContactList,
    searchOffset,
    hasSearchNextPage,
    searchHasMoreData,
    isFetchingData,
    isSearching,
  } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    setState({isFetchingData: true});
    const params = `?offset=${offset}&limit=${limit}&flag=${Math.random()}`;
    dispatch(
      getChatContactsList(params, (res, data) => {
        if (res && !util.isArrayEmpty(data)) {
          setState({contactList: data, hasNextPage: true});
        } else {
          setState({hasNextPage: false});
        }
        setState({isFetchingData: false});
      }),
    );
  }, []);

  function loadMoreData() {
    if (hasNextPage) {
      setState({
        hasMoreData: true,
      });
      const params = `?offset=${offset}&limit=${limit}&flag=${Math.random()}`;
      dispatch(
        getChatContactsList(params, (res, data) => {
          if (res && !util.isArrayEmpty(data)) {
            const mClonedArr = util.cloneDeepArray(contactList);
            const mMergedArr = util.unionById(mClonedArr, data);

            setState({
              offset: offset + limit,
              hasMoreData: false,
              contactList: mMergedArr,
            });
          } else {
            setState({
              hasNextPage: false,
              hasMoreData: false,
            });
          }
        }),
      );
    }
  }

  function onSearchText(text) {
    if (util.isEmptyValue(text)) {
      setState({searchOffset: 0, searchText: ''});
      return;
    }
    setState({searchOffset: 0, searchText: text, isSearching: true});

    const params = `?keyword=${text}&offset=${0}&limit=${limit}&flag=${Math.random()}`;
    dispatch(
      getSearchChatContactsListRequest(params, (res, data) => {
        if (res) {
          setState({
            searchContactList: data,
            hasSearchNextPage: true,
            isSearching: false,
            searchOffset: limit,
          });
        } else {
          setState({
            hasSearchNextPage: false,
            isSearching: false,
            searchHasMoreData: false,
          });
        }
      }),
    );
  }

  function loadMoreSearchData() {
    if (searchOffset == 0) return;
    if (hasSearchNextPage) {
      setState({
        searchHasMoreData: true,
      });
      const params = `?keyword=${searchText}&offset=${searchOffset}&limit=${limit}&flag=${Math.random()}`;
      dispatch(
        getSearchChatContactsListRequest(params, (res, data) => {
          if (res && !util.isArrayEmpty(data)) {
            const mClonedArr = util.cloneDeepArray(searchContactList);
            const mMergedArr = util.unionById(mClonedArr, data);
            setState({
              searchOffset: searchOffset + limit,
              searchHasMoreData: false,
              searchContactList: mMergedArr,
            });
          } else {
            setState({
              hasSearchNextPage: false,
              searchHasMoreData: false,
            });
          }
        }),
      );
    }
  }

  const handleSelectPeople = item => {
    Actions.messageView({item});
  };

  const renderSearchHereSec = () => (
    <View style={styles.searchView}>
      <Image source={Images.searchIcon3} />
      <TextInput
        onChangeText={onSearchText}
        style={styles.textInput}
        placeholder="Search Here"
        placeholderTextColor="#21252580"
        selectionColor={Colors.grey2}
      />
    </View>
  );

  const renderLoader = isLoading =>
    isLoading && (
      <View style={styles.fetchingDataLoader}>
        <ActivityIndicator color={Colors.white} />
      </View>
    );

  const renderNewGroupButton = () => (
    <ButtonView style={styles.newGroupBtn} onPress={() => Actions.newGroup()}>
      <View style={styles.newGroupBtnSec}>
        <Image source={Images.profileIcon} style={styles.newGroupProfileIcon} />
      </View>
      <Text style={styles.invitePeopleText}>{strings.NEW_GROUP}</Text>
    </ButtonView>
  );

  const renderBottomLoaderView = () => (
    <View style={{marginVertical: 40}}>
      <ActivityIndicator color={Colors.white} />
    </View>
  );

  const renderContactList = useMemo(() => {
    return (
      <FlatList
        data={contactList}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => renderContactListItem(item, index)}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={hasMoreData && renderBottomLoaderView()}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    );
  }, [contactList, hasMoreData]);

  const renderSearchContactList = useMemo(() => {
    return (
      <FlatList
        data={searchContactList}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => renderContactListItem(item, index)}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreSearchData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={searchHasMoreData && renderBottomLoaderView()}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    );
  }, [searchContactList, searchHasMoreData]);

  const renderContactListItem = ({item}) => {
    const {name, image} = item;
    return (
      <ButtonView
        style={styles.invitePeopleMainView}
        onPress={() => handleSelectPeople(item)}>
        <View style={styles.invitePeopleView}>
          <Image source={{uri: image}} style={styles.profilePic} />
          <Text style={styles.invitePeopleText}>{name}</Text>
        </View>
      </ButtonView>
    );
  };

  const renderListing = () => {
    if (util.isEmptyValue(searchText)) {
      return renderContactList;
    } else {
      if (isSearching) {
        return renderLoader(isSearching);
      } else {
        return renderSearchContactList;
      }
    }
  };

  return (
    <ScreenWrapper
      hasBack
      pageBackground={Colors.black}
      leftBtnPress={() => Actions.pop()}
      headerTitle={strings.SELECT_CONTACT}>
      <View style={styles.container}>
        {isFetchingData ? (
          renderLoader(true)
        ) : (
          <>
            {renderSearchHereSec()}
            {renderNewGroupButton()}
            {renderListing()}
          </>
        )}
      </View>
      {!util.isPlatformAndroid() && <KeyboardSpacer />}
    </ScreenWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, null)(SelectContacts);
