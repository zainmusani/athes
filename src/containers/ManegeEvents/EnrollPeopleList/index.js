// @flow
import { connect, useSelector } from 'react-redux';
import React, { Component, useState } from 'react';
import { Image, View, FlatList } from 'react-native';
import styles from './styles';
import { ButtonView, ScreenWrapper, Text, TextInput } from '../../../components';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';

const EnrollPeopleList = props => {
  const { attendeesList, title, groupMember, removeGroupMember } = props;
  const [enrollPeople, setEnrollPeople] = useState(() => attendeesList);
  const [searchValue, setSearchValue] = useState('');
  const {data: loggedInUser} = useSelector(state => state.user);

  const removeFromList = id => {
    let members = _.cloneDeep(enrollPeople);
    members = members.filter(res => {
      if (res.userId !== id) {
        return res;
      }
    });
    setEnrollPeople(members);
  };

  return (
    <ScreenWrapper pageBackground={Colors.black} hasBack headerTitle={title}>
      <View style={styles.container}>
        <View style={styles.searchView}>
          <Image source={Images.searchIcon3} />

          <TextInput
            style={styles.textInput}
            placeholder="Search Here"
            placeholderTextColor="#21252580"
            value={searchValue}
            onChangeText={value => {
              setSearchValue(value);
              setEnrollPeople(
                attendeesList?.filter(obj =>
                  obj.name.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim()),
                ),
              );
            }}
          />
        </View>
        <View style={[AppStyles.mTop20, {flex: 1}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={enrollPeople}
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.invitePeopleMainView}>
                    <ButtonView
                      onPress={() => {
                        if (item.parentId == loggedInUser.id) {
                          let __item = _.cloneDeep(item);
                          __item.id = item.userId;
                          Actions.profile({
                            child_data: __item,
                            userId: item.userId,
                            isParentAthleteManagementView: true,
                          });
                        } else {
                          Actions.profile({
                            userId: item.userId,
                            requested_role: item.role_id,
                            publicView: loggedInUser.id != item.userId,
                          });
                        }
                      }}
                      style={styles.invitePeopleView}>
                      
                      <FastImage
                        style={{width: 47, height: 47, borderRadius: 47}}
                        source={{
                          uri: item.image || Images.userEmptyImage,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      <Text style={styles.invitePeopleText}>{item.name}</Text>
                    </ButtonView>
                    {groupMember && (
                      <ButtonView
                        onPress={() => {
                          removeFromList(item.userId);
                          removeGroupMember && removeGroupMember(item.userId);
                        }}
                        style={{
                          backgroundColor: Colors.white,
                          ...AppStyles.paddingHorizontalBase,
                          paddingVertical: 5,
                        }}>
                        <Text
                          size={Fonts.size.small}
                          type={Fonts.type.bold}
                          color={Colors.black}
                          bold="500">
                          {'Remove'}
                        </Text>
                      </ButtonView>
                    )}
                  </View>
                </>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(EnrollPeopleList);
