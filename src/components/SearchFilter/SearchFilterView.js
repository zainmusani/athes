import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import {ButtonView, ScreenWrapper, Text, TextInput, Button} from '..';
import {appDefaultData, strings} from '../../constants';

import {AppStyles, Colors, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './SearchFilterStyles';
import {Actions} from 'react-native-router-flux';

export default function SearchFilterView(props) {
  const {
    time,
    array,
    searchList,
    setList,
    selectedIDs,
    setSelectedIDs,
    _onSubmit,
    setSearchList,
    selectedValue,
    setSelectedValue,
    setAddAnother,
    addMore,
  } = props;
  const search = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  return (
    <ScreenWrapper
      headerTitle={time ? 'Select Time' : strings.SEARCH}
      hasBack
      pageBackground={Colors.black}>
      <View style={styles.container}>
        {addMore && (
          <ButtonView
            onPress={() => {
              Actions.replace('addMoreInputs', {clearValues: true, ...props});
            }}
            style={{
              padding: 10,
              borderRadius: 7,
              backgroundColor: Colors.white,
              position: 'absolute',
              right: 10,
              top: -40,
            }}>
            <Text color={Colors.black}>Add More</Text>
          </ButtonView>
        )}
        {!time && (
          <TextInput
            placeholder="Search Here"
            placeholderTextColor={Colors.grey4}
            underlineColorAndroid="#f000"
            containerStyle={AppStyles.mBottom10}
            ref={search}
            icon={{
              url: Images.search,
              width: 18,
              height: 18,
            }}
            value={searchValue}
            onChangeText={value => {
              setSearchValue(value);
              setSearchList(
                array?.filter(obj =>
                  obj.title.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()),
                ),
              );
            }}
          />
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchList}
          renderItem={({item, index}) => {
            const isFirstItem = index === 0;
            let active = selectedIDs.includes(item.id);
            return (
              <ButtonView
                style={styles.listView}
                onPress={() => setList(item.id, item.title)}>
                <Text
                  color={Colors.white}
                  style={[
                    styles.defualtDataText,
                    isFirstItem && AppStyles.mTop20,
                  ]}>
                  {time ? util.convertTimeInto12(item.title) : item.title}
                </Text>
                {active && (
                  <Image
                    source={Images.check}
                    style={{tintColor: Colors.white}}
                  />
                )}
              </ButtonView>
            );
          }}
        />

        <Button
          onPress={() => {
            setAddAnother(false);
            _onSubmit(selectedIDs);
          }}
          icon="righArrowIcon"
          iconRight
          raised
          style={{
            ...AppStyles.mLeft30,
            ...AppStyles.mRight30,
            ...AppStyles.mBottom40,
          }}>
          {strings.DONE.toUpperCase()}
        </Button>
      </View>
    </ScreenWrapper>
  );
}
