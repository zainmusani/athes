import React, {useEffect, useMemo, useReducer} from 'react';
import {ActivityIndicator, FlatList, Image, Keyboard, View} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  getChatContactsList,
  getSearchChatContactsListRequest,
} from '../../../actions/ChatActions';
import {
  Button,
  ButtonView,
  ScreenWrapper,
  Text,
  TextInput,
} from '../../../components';
import {strings} from '../../../constants';
import {Colors, Images} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const limit = 10;
const NewGroup = props => {
  const {} = props;

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
      selectedPeople: [],
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
    selectedPeople,
  } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    setState({isFetchingData: true});
    const params = `?offset=${offset}&limit=${limit}`;
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
      const params = `?offset=${offset}&limit=${limit}`;
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

    const params = `?keyword=${text}&offset=${0}&limit=${limit}`;
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
      const params = `?keyword=${searchText}&offset=${searchOffset}&limit=${limit}`;
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
    const {id} = item;
    let mSelectedPeopleList = util.cloneDeepArray(selectedPeople);

    const mIndex = util.findIndexById(mSelectedPeopleList, id);
    if (mIndex != -1) {
      mSelectedPeopleList = util.filterArray(
        mSelectedPeopleList,
        item => item.id != id,
      );
    } else {
      mSelectedPeopleList.push(item);
    }
    setState({
      selectedPeople: mSelectedPeopleList,
    });
  };

  const handleRemovePeople = idToRemove => {
    let mSelectedPeopleList = util.cloneDeepArray(selectedPeople);

    mSelectedPeopleList = util.filterArray(
      mSelectedPeopleList,
      item => item.id != idToRemove,
    );

    setState({
      selectedPeople: mSelectedPeopleList,
    });
  };

  const renderLoader = isLoading =>
    isLoading && (
      <View style={styles.fetchingDataLoader}>
        <ActivityIndicator color={Colors.white} />
      </View>
    );

  const renderSearchSection = () => (
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

  const renderSelectedPeopleSec = () => (
    <FlatList
      horizontal
      data={selectedPeople}
      renderItem={renderSelectedPeopleSingleItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index}
    />
  );

  const renderSelectedPeopleSingleItem = ({item}) => {
    const {id, name, image} = item || {};
    return (
      <View style={styles.selectedPeopleMainSec}>
        <View style={styles.selectedPeopleProfilePicSec}>
          <ButtonView
            onPress={() => handleRemovePeople(id)}
            style={styles.removeSelectedPeopleBtnSec}>
            <Image
              source={Images.crossIconBlack}
              style={styles.removeSelectedPeopleCrossIcon}
            />
          </ButtonView>
          <Image
            source={{uri: image}}
            style={styles.selectedPeopleProfilePic}
          />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
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

  const renderBottomLoaderView = () => (
    <View style={{marginVertical: 40}}>
      <ActivityIndicator color={Colors.white} />
    </View>
  );

  const renderCreateButton = () => (
    <Button
      background={Colors.white}
      onPress={() => {
        Actions.createChatGroup({selectedPeopleIds: selectedPeople});
      }}
      icon="righArrowIcon"
      iconRight
      disabled={selectedPeople.length < 2}
      raised
      style={styles.createBtn}>
      {strings.CREATE.toUpperCase()}
    </Button>
  );

  const renderContactList = useMemo(() => {
    return (
      <FlatList
        data={contactList}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderContactListItem(item)}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={hasMoreData && renderBottomLoaderView()}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    );
  }, [contactList, hasMoreData, selectedPeople]);

  const renderSearchContactList = useMemo(() => {
    return (
      <FlatList
        data={searchContactList}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderContactListItem(item)}
        keyExtractor={(_, index) => index}
        onEndReached={loadMoreSearchData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={searchHasMoreData && renderBottomLoaderView()}
        onScrollEndDrag={() => Keyboard.dismiss()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    );
  }, [searchContactList, searchHasMoreData, selectedPeople]);

  const renderContactListItem = ({item}) => {
    const {id, name, image} = item;
    const mIndex = util.findIndexById(selectedPeople, id);
    const isSelected = mIndex != -1 ? true : false;

    return (
      <ButtonView
        style={styles.invitePeopleMainView}
        onPress={() => handleSelectPeople(item)}>
        <View style={styles.invitePeopleView}>
          <Image source={{uri: image}} style={styles.profilePicStyle} />
          <Text style={styles.invitePeopleText}>{name}</Text>
        </View>

        <View style={styles.radioBoxView}>
          {isSelected && <View style={styles.radioBox} />}
        </View>
      </ButtonView>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnPress={() => Actions.pop()}
      hasBack
      headerTitle={strings.NEW_GROUP}>
      <View style={styles.container}>
        {isFetchingData ? (
          renderLoader(true)
        ) : (
          <>
            {renderSearchSection()}
            {!util.isArrayEmpty(selectedPeople) && (
              <View>{renderSelectedPeopleSec()}</View>
            )}
            {<View style={styles.listingSec}>{renderListing()}</View>}
            {renderCreateButton()}
            {!util.isPlatformAndroid() && <KeyboardSpacer />}
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, null)(NewGroup);
