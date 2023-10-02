import _, {isEmpty} from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Image,
  Keyboard,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {coachingSearchRequest} from '../../actions/GeneralActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  TextInput,
  SelectBox,
  MultiSelectBox,
  Button,
  Loader,
  FollowPeopleView,
} from '../../components';
import {ageGroup, distance} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';

const category = [
  {
    id: 1,
    categoryName: 'People',
  },
  {
    id: 2,
    categoryName: 'Events',
  },
  {
    id: 3,
    categoryName: 'Sessions',
  },
  {
    id: 4,
    categoryName: 'Seasons',
  },
];

const CoachSearch = props => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
  const [searchFieldEmpty, setSearchFieldEmpty] = useState('');
  const [categorySelected, setCategorySelected] = useState('People');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [errors, setErrors] = useState({});
  const [zipValue, setZipValue] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const [advSearchHeight, setAdvSearchHeight] = useState(
    Metrics.screenHeight - Metrics.navBarHeight * 2,
  );
  // Data States

  const [followers, setFollowers] = useState([]);
  const [events, setEvents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const dispatch = useDispatch(null);
  const {coaching} = useSelector(state => state.general);

  useEffect(() => {
    if (coaching) {
      setFollowers(_.cloneDeep(coaching?.coaches));
      setEvents(_.cloneDeep(coaching?.event));
      setSeasons(_.cloneDeep(coaching?.season));
      setSessions(_.cloneDeep(coaching?.session));
    }
  }, [coaching]);

  const searchRef = useRef(null);
  const zip = useRef(null);
  const distanceRef = useRef(null);

  useEffect(() => {
    _validateForm();
  }, [selectedInterests, selectedAgeGroup, zipValue, distanceValue]);

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

  const peopleView = useMemo(() => {
    return (
      <View
        style={{
          ...AppStyles.paddingHorizontalBase,
        }}>
        <>
          {followers &&
            followers.map((item, key) => (
              <FollowPeopleView key={key} item={item} onlyUsers />
            ))}
        </>
      </View>
    );
  }, [followers]);

  const eventView = useMemo(() => {
    return (
      <View style={{...AppStyles.paddingHorizontalBase}}>
        {events.map((item, key) => (
          <ButtonView
            key={key}
            style={styles.eventMainView}
            onPress={() =>
              Actions.eventDetail({
                isEnrollButton: true,
                data: item,
              })
            }>
            <FastImage
              source={{uri: item.image, priority: FastImage.priority.normal}}
              style={{width: 115, height: 80, borderRadius: 7}}
              resizeMode={FastImage.resizeMode.cover}
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
              {item?.distance > 0 && (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.grey2}
                  style={{marginTop: 2, textTransform: 'capitalize'}}>
                  {`Distance: ${item?.distance} ${
                    item?.distance > 1 ? 'Miles' : 'Mile'
                  }`}
                </Text>
              )}
            </View>
          </ButtonView>
        ))}
      </View>
    );
  }, [events]);

  const sessionView = useMemo(() => {
    return (
      <View style={{...AppStyles.paddingHorizontalBase}}>
        {sessions.map((item, key) => (
          <ButtonView
            key={key}
            style={styles.eventMainView}
            onPress={() =>
              Actions.sessionDetail({
                isEnrollButton: true,
                data: item,
              })
            }>
            <FastImage
              source={{uri: item.image, priority: FastImage.priority.normal}}
              style={{width: 115, height: 80, borderRadius: 7}}
              resizeMode={FastImage.resizeMode.cover}
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
              {item?.distance > 0 && (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.grey2}
                  style={{marginTop: 2, textTransform: 'capitalize'}}>
                  {`Distance: ${item?.distance} ${
                    item?.distance > 1 ? 'Miles' : 'Mile'
                  }`}
                </Text>
              )}
            </View>
          </ButtonView>
        ))}
      </View>
    );
  }, [sessions]);

  const seasonView = useMemo(() => {
    return (
      <View style={{...AppStyles.paddingHorizontalBase}}>
        {seasons.map((item, key) => (
          <ButtonView
            key={key}
            style={styles.eventMainView}
            onPress={() =>
              Actions.seasonDetail({
                isEnrollButton: true,
                data: item,
              })
            }>
            <FastImage
              source={{uri: item.image, priority: FastImage.priority.normal}}
              style={{width: 115, height: 80, borderRadius: 7}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.eventView}>
              <Text style={styles.eventDate} bold="700">
                {`${util.getDayNameFromDate(item.eventDate)}, ${util.dateFormat(
                  item.eventDate,
                )}`}
              </Text>
              <Text style={styles.eventName} bold="700">
                {item.title}
              </Text>
              <Text style={styles.eventAddress} bold="700">
                {item.eventVenue}
              </Text>
              {item?.distance > 0 && (
                <Text
                  size={Fonts.size.xxSmall}
                  color={Colors.grey2}
                  style={{marginTop: 2, textTransform: 'capitalize'}}>
                  {`Distance: ${item?.distance} ${
                    item?.distance > 1 ? 'Miles' : 'Mile'
                  }`}
                </Text>
              )}
            </View>
          </ButtonView>
        ))}
      </View>
    );
  }, [seasons]);

  const reset = () => {
    setErrors({});
    setFollowers([]);
    setEvents([]);
    setSessions([]);
    setSeasons([]);
    setSelectedInterests([]);
    setSelectedAgeGroup([]);
    setZipValue('');
    setDistanceValue('');
  };

  const search = () => {
    return (
      <>
        <View style={[styles.profileHeader, {height: advSearchHeight}]}>
          <View style={styles.searchView}>{advanceSearch()}</View>
        </View>
      </>
    );
  };

  const advanceSearch = () => {
    return (
      <>
        {showAdvanceSearch && (
          <>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={AppStyles.paddingHorizontalBase}>
              <MultiSelectBox
                // sportInterests
                label={`Sport`}
                error={errors?.sportInterest}
                selectedValue={selectedInterests}
                setSelectedValue={setSelectedInterests}
              />

              <MultiSelectBox
                data={ageGroup}
                label={`Age Groups`}
                error={errors?.ageGroup}
                selectedValue={selectedAgeGroup}
                selectedValue={selectedAgeGroup}
                setSelectedValue={setSelectedAgeGroup}
              />

              <Text
                color={Colors.white}
                size={20}
                style={{
                  textTransform: 'capitalize',
                  ...AppStyles.mBottom10,
                  ...AppStyles.mTop20,
                }}>
                geographic area
              </Text>

              <TextInput
                placeholder="Zipcode"
                placeholderTextColor={Colors.grey4}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                label="Zipcode (required)"
                ref={zip}
                containerStyle={AppStyles.mBottom10}
                onSubmitEditing={() => {
                  zip.current.blur();
                }}
                keyboardType="numeric"
                value={zipValue}
                maxLength={7}
                error={errors?.zip}
                onChangeText={value => {
                  setZipValue(value);
                }}
              />

              <SelectBox
                array={distance}
                label="Distance (Within)"
                value={distanceValue}
                setData={setDistanceValue}
                ref={distanceRef}
                error={errors?.distance}
                icon={Images.downIconBlack}
                isRightIcon
                onChangeText={value => {
                  setDistanceValue(value);
                }}
              />

              <View style={{alignSelf: 'center', ...AppStyles.mTop30}}>
                <Button
                  background={Colors.black}
                  icon="righArrowIcon"
                  onlyIcon
                  disabled={disabled}
                  onPress={() => _onSubmit()}
                />
              </View>
            </KeyboardAwareScrollView>
          </>
        )}
      </>
    );
  };

  const searchCategory = () => {
    return (
      <View style={{marginTop: 30}}>
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

  const _validateForm = () => {
    let disable = true;

    if (!_.isEmpty(selectedInterests)) {
      disable = false;
    }

    if (!_.isEmpty(selectedAgeGroup)) {
      disable = false;
    }

    if (!_.isEmpty(distanceValue)) {
      disable = false;
      if (_.isEmpty(zipValue)) {
        disable = true;
        errors.zip = 'Zipcode is required for distance';
      }
    }

    if (!_.isEmpty(zipValue)) {
      disable = false;
      if (!util.isNumber(zipValue)) {
        errors.zip = 'Please enter a valid zipcode';
        disable = true;
      }
    }

    setDisabled(disable);

    return !disable;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setErrors({});
      setLoading(true);

      let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);
      let selectedAges = util.getTitlesFromSelectArray(selectedAgeGroup);

      const payload = {
        sports: selectedInterest,
        ageGroup: selectedAges,
        zip: zipValue,
        distance: distanceValue,
      };

      dispatch(
        coachingSearchRequest(payload, res => {
          setLoading(false);
          if (res) {
            setShowAdvanceSearch(false);
            setAdvSearchHeight(20);
          }
        }),
      );
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerbackground={Colors.graybrown}
      headerTitle="Coaching"
      rightBtnImage={!showAdvanceSearch && Images.filterIcon}
      rightBtnText={showAdvanceSearch && `Clear`}
      rightBtnPress={() => {
        if (!showAdvanceSearch) {
          setShowAdvanceSearch(!showAdvanceSearch);
          setAdvSearchHeight(Metrics.screenHeight - Metrics.navBarHeight * 2);
        } else {
          reset();
        }
      }}>
      <StatusBar backgroundColor={Colors.graybrown} barStyle="light-content" />

      {search()}
      {searchCategory()}
      <View style={{...AppStyles.mTop20}}></View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onTouchStart={() => {
          Keyboard.dismiss();
        }}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        onScrollEndDrag={() => Keyboard.dismiss()}
        style={styles.container}>
        {categorySelected === 'People' && peopleView}
        {categorySelected === 'Events' && eventView}
        {categorySelected === 'Sessions' && sessionView}
        {categorySelected === 'Seasons' && seasonView}
      </ScrollView>

      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default CoachSearch;
