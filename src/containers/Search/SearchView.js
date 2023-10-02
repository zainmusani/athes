import _, {isEmpty} from 'lodash';
import React from 'react';
import {
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  TextInput,
  Post,
  FollowPeopleView,
  Loader,
  SelectBox,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './SearchStyles';

const emptyScreen = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss}
      accessible={false}>
      <View style={styles.emptyScreenView}>
        <Image source={Images.searchEmptyScreenImg} />
        <Text style={styles.emptyScreenText1}>Search Now</Text>
      </View>
      {/* <Text style={styles.emptyScreenText2}>Find Your Coach </Text> */}
    </TouchableWithoutFeedback>
  );
};

const search = mProps => {
  const {
    searchFiltersOptions,
    searchFilter,
    setSearchFilter,
    searchFieldEmpty,
    setSearchFieldEmpty,
    searchData,
    refreshNow,
    setShowContent,
    keywordsList,
    setShowKeywords,
    showKeywords,
  } = mProps;

  return (
    <>
      <View style={styles.profileHeader}>
        <View style={styles.searchView}>
          {searchFilter == 'hashtag' ? (
            <Text
              color={Colors.white}
              size={Fonts.size.xLarge}
              style={{lineHeight: 26, marginRight: -3}}>
              #
            </Text>
          ) : (
            <Image source={Images.SearchIcon2} />
          )}
          <TextInput
            onFocus={() => setShowKeywords(true)}
            style={styles.search}
            placeholderTextColor={'rgba(255,255,255,.5)'}
            placeholder="Search"
            selectionColor={Colors.white}
            value={searchFieldEmpty}
            autoCapitalize="none"
            autoFocus
            onSubmitEditing={() => {
              searchData();
              Keyboard.dismiss();
              setShowKeywords(false);
            }}
            onChangeText={value => {
              setSearchFieldEmpty(value);
              if (value === '') setShowContent(false);
            }}
          />
        </View>
        {showKeywords && !!keywordsList.length && (
          <FlatList
            style={styles.keywords}
            data={keywordsList}
            renderItem={({item, index}) => {
              return (
                <ButtonView
                  key={index.toString()}
                  style={styles.listView}
                  onPress={() => {
                    setSearchFieldEmpty(item.keyword);
                    searchData(item.keyword);
                    setShowKeywords(false);
                  }}>
                  <Text color={Colors.white} style={[styles.defualtDataText]}>
                    {item.keyword}
                  </Text>
                </ButtonView>
              );
            }}
          />
        )}
      </View>
      <View
        style={{
          ...AppStyles.flexRow,
          ...AppStyles.spaceBetween,
          ...AppStyles.alignItemsCenter,
          paddingHorizontal: 20,
          width: '100%',
          position: 'absolute',
          top: -40,

          zIndex: 999,
        }}>
        <SelectBox
          array={searchFiltersOptions}
          //label="Filter By"
          placeholder="Filter By"
          value={searchFilter}
          setData={setSearchFilter}
          icon={Images.filterIcon}
          iconStyles={{tintColor: Colors.white}}
          // isRightIcon
          customTextInputStyle={{
            textTransform: 'capitalize',
            flexGrow: 1,
            paddingTop: 8,
            alignItems: 'center',
            color: Colors.white,
            ...AppStyles.pLeft30,
          }}
          onChangeText={value => {
            setSearchFilter(value);
          }}
        />
        {!_.isEmpty(searchFilter) && (
          <ButtonView
            style={{
              padding: 10,
              marginLeft: 10,

              ...AppStyles.centerInner,
            }}
            onPress={() => setSearchFilter('')}>
            <Text color={Colors.white} size={12}>
              Clear Filter
            </Text>
          </ButtonView>
        )}
      </View>
    </>
  );
};

const searchCategory = mProps => {
  const {category, categorySelected, setCategorySelected, searchRef} = mProps;
  return (
    <View style={{marginTop: 80}}>
      <FlatList
        data={category}
        horizontal
        ref={searchRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isFirstItem = index === 0;

          return (
            <View
              style={[
                {
                  backgroundColor:
                    categorySelected === item.categoryName
                      ? Colors.white
                      : Colors.grey2,
                },
                styles.categoryMainView,
                isFirstItem && {marginLeft: 10},
              ]}>
              <ButtonView
                style={
                  categorySelected === item.categoryName
                    ? styles.categoryViewSelected
                    : styles.categoryView
                }
                onPress={() => {
                  setCategorySelected(item.categoryName);
                }}>
                <Text
                  bold="500"
                  style={
                    categorySelected === item.categoryName
                      ? styles.categoryTextSelected
                      : styles.categoryText
                  }>
                  {item.categoryName}
                </Text>
              </ButtonView>
            </View>
          );
        }}
      />
    </View>
  );
};

const postView = mProps => {
  const {
    currentUser,
    postList,
    searchFieldEmpty,
    categorySelected,
    scrollToIndex,
    itemofDefaultScreenPost,
    handleActionsOfPost,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!postList.length &&
        (categorySelected === 'All' || categorySelected === 'Post') && (
          <>
            {categorySelected !== 'Post' &&
              headingAndMoreButton('Post', scrollToIndex)}

            {categorySelected === 'All' && itemofDefaultScreenPost ? (
              <View style={{alignItems: 'center'}}>
                {itemofDefaultScreenPost.map((res, idx) => {
                  return (
                    <View
                      style={{
                        width: Metrics.screenWidth,
                      }}>
                      <Post
                        key={`post-${idx}`}
                        handleActionsOfPost={handleActionsOfPost}
                        data={res}
                        isProfileView={res.user.id == currentUser.id}
                      />
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                {postList.map((res, idx) => {
                  return (
                    <View
                      style={{
                        width: Metrics.screenWidth,
                      }}>
                      <Post
                        key={`post-${idx}`}
                        handleActionsOfPost={handleActionsOfPost}
                        data={res}
                        isProfileView={res.user.id == currentUser.id}
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </>
        )}
    </>
  );
};

const peopleView = mProps => {
  const {
    followers,
    searchFieldEmpty,
    categorySelected,
    itemofDefaultScreenFollow,
    scrollToIndex,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!followers &&
        (categorySelected === 'All' || categorySelected === 'People') && (
          <>
            {categorySelected !== 'People' &&
              headingAndMoreButton('People', scrollToIndex)}
            <View
              style={{...AppStyles.mTop20, ...AppStyles.paddingHorizontalBase}}>
              {categorySelected === 'All' && itemofDefaultScreenFollow
                ? itemofDefaultScreenFollow.map((item, key) => (
                    <FollowPeopleView key={key} item={item} />
                  ))
                : followers && (
                    <>
                      {followers.map((item, key) => (
                        <FollowPeopleView key={key} item={item} />
                      ))}
                    </>
                  )}
            </View>
          </>
        )}
    </>
  );
};

const eventView = mProps => {
  const {
    searchFieldEmpty,
    categorySelected,
    events,
    scrollToIndex,
    itemofDefaultScreenEvents,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!events.length &&
        (categorySelected === 'All' || categorySelected === 'Events') && (
          <>
            {categorySelected !== 'Events' &&
              headingAndMoreButton('Events', scrollToIndex)}
            <View style={{...AppStyles.paddingHorizontalBase}}>
              {categorySelected === 'All' && !!itemofDefaultScreenEvents
                ? itemofDefaultScreenEvents.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.eventDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(item.eventDate)}, ${
                            item?.startTime
                          } - ${item.endTime}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))
                : events.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.eventDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(item.eventDate)}, ${
                            item?.startTime
                          } - ${item.endTime}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))}
            </View>
          </>
        )}
    </>
  );
};

const sessionView = mProps => {
  const {
    searchFieldEmpty,
    categorySelected,
    sessions,
    scrollToIndex,
    itemofDefaultScreenSession,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!sessions.length &&
        (categorySelected === 'All' || categorySelected === 'Sessions') && (
          <>
            {categorySelected !== 'Sessions' &&
              headingAndMoreButton('Sessions', scrollToIndex)}
            <View style={{...AppStyles.paddingHorizontalBase}}>
              {categorySelected === 'All' && !!itemofDefaultScreenSession
                ? itemofDefaultScreenSession.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.sessionDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(item.eventDate)}, ${
                            item.startTime
                          } - ${item.endTime}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))
                : sessions.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.sessionDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(item.eventDate)}, ${
                            item.startTime
                          } - ${item.endTime}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))}
            </View>
          </>
        )}
    </>
  );
};

const seasonView = mProps => {
  const {
    searchFieldEmpty,
    categorySelected,
    seasons,
    scrollToIndex,
    itemofDefaultScreenSeason,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!seasons.length &&
        (categorySelected === 'All' || categorySelected === 'Seasons') && (
          <>
            {categorySelected !== 'Seasons' &&
              headingAndMoreButton('Seasons', scrollToIndex)}
            <View style={{...AppStyles.paddingHorizontalBase}}>
              {categorySelected === 'All' && !!itemofDefaultScreenSeason
                ? itemofDefaultScreenSeason.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.seasonDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(
                            item.eventDate,
                          )}, ${util.dateFormat(item.eventDate)}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))
                : seasons.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.seasonDetail({
                          isEnrollButton: true,
                          data: item,
                        })
                      }>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 115, height: 80, borderRadius: 7}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventDate} bold="700">
                          {`${util.getDayNameFromDate(
                            item.eventDate,
                          )}, ${util.dateFormat(item.eventDate)}`}
                        </Text>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        <Text style={styles.eventAddress} bold="700">
                          {item.eventVenue}
                        </Text>
                      </View>
                    </ButtonView>
                  ))}
            </View>
          </>
        )}
    </>
  );
};

const facilityView = mProps => {
  const {
    searchFieldEmpty,
    categorySelected,
    facilitys,
    itemofDefaultScreenFacility,
    scrollToIndex,
    showContent,
  } = mProps;

  return (
    <>
      {showContent &&
        !!facilitys.length &&
        (categorySelected === 'All' || categorySelected === 'Facility') && (
          <>
            {categorySelected !== 'Facility' &&
              headingAndMoreButton('Facility', scrollToIndex)}
            <View style={{...AppStyles.paddingHorizontalBase}}>
              {categorySelected === 'All' && itemofDefaultScreenFacility
                ? itemofDefaultScreenFacility.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.facilityDetail({
                          isPublicView: true,
                          facilityId: item.id,
                        })
                      }>
                      <Image
                        style={{width: 115, height: 80, borderRadius: 7}}
                        source={{uri: item.image}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        {/* <Text style={styles.eventAddress} bold="700">
                      {item.eventAddress}
                    </Text> */}
                      </View>
                    </ButtonView>
                  ))
                : facilitys.map((item, key) => (
                    <ButtonView
                      key={key}
                      style={styles.eventMainView}
                      onPress={() =>
                        Actions.facilityDetail({
                          isPublicView: true,
                          facilityId: item.id,
                        })
                      }>
                      <Image
                        style={{width: 115, height: 80, borderRadius: 7}}
                        source={{uri: item.image}}
                      />
                      <View style={styles.eventView}>
                        <Text style={styles.eventName} bold="700">
                          {item.title}
                        </Text>
                        {/* <Text style={styles.eventAddress} bold="700">
                      {item.eventAddress}
                    </Text> */}
                      </View>
                    </ButtonView>
                  ))}
            </View>
          </>
        )}
    </>
  );
};

const headingAndMoreButton = (title, onPress) => {
  return (
    <View style={styles.headingView}>
      <Text style={styles.heading}>{title}</Text>

      <TouchableOpacity
        style={styles.moreButtonView}
        activeOpacity={0.5}
        onPress={() => {
          onPress(title);
        }}>
        <Text style={styles.heading}>More</Text>
        <Image
          source={Images.RightIcon}
          style={styles.moreButtonImage}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

const SearchView = props => {
  const {
    searchFieldEmpty,
    handleActionsOfPost,
    actionsOfPost,
    setActionsOfPost,
    loading,
    showContent,
    setShowKeywords,
    showKeywords,
  } = props;

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerbackground={Colors.graybrown}
      headerTitle="Search">
      <StatusBar backgroundColor={Colors.graybrown} barStyle="light-content" />

      {_.isEmpty(searchFieldEmpty) && (
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          activeOpacity={1}
          style={{flex: 1}}
        />
      )}

      {search(props)}

      {!showContent || (_.isEmpty(searchFieldEmpty) && emptyScreen())}

      {showContent && !_.isEmpty(searchFieldEmpty) && searchCategory(props)}

      {!loading && !_.isEmpty(searchFieldEmpty) && (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onTouchStart={() => {
            Keyboard.dismiss();
            showKeywords && setShowKeywords(false);
          }}
          onScrollBeginDrag={() => Keyboard.dismiss()}
          onScrollEndDrag={() => Keyboard.dismiss()}
          style={styles.container}>
          {Object.keys(actionsOfPost).length > 0 && (
            <View style={styles.actionPostMainView}>
              <View style={styles.actionPostView}>
                <Image
                  source={actionsOfPost.icon}
                  style={{width: 20}}
                  resizeMode="contain"
                />

                <View style={AppStyles.mLeft15}>
                  <Text style={styles.actionPostHeading}>
                    {actionsOfPost.name}
                  </Text>
                  <Text style={styles.actionPostDescription}>
                    {actionsOfPost.description}
                  </Text>
                </View>
              </View>

              <ButtonView
                style={styles.undoButtonView}
                onPress={() => setActionsOfPost({})}>
                <Text style={styles.undoButton}>Undo</Text>
              </ButtonView>
            </View>
          )}
          {postView(props)}
          {peopleView(props)}
          {eventView(props)}
          {sessionView(props)}
          {seasonView(props)}
          {facilityView(props)}
          <Loader loading={loading} />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default SearchView;
