import React, {useMemo} from 'react';
import {View, Image, FlatList} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {useSelector} from 'react-redux';
import {Text, ButtonView} from '../../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../theme';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const TopUsers = props => {
  const {topUsers, addingPost} = useSelector(state => state.post);
  const user = useSelector(state => state.user.data);

  const renderTopUsers = useMemo(
    () => (
      <FlatList
        data={topUsers}
        style={[AppStyles.pBottom10, AppStyles.pLeft20]}
        contentContainerStyle={AppStyles.pRight20}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <ButtonView
              onPress={() => {
                if (item?.isAdmin == 1 || item?.isFeedsAdmin) {
                  return true;
                }
                
                if (item.parentId == user.id) {
                  let __item = _.cloneDeep(item);
                  __item.id = item.id;
                  Actions.push('profile', {
                    tab: user.id == item.parentId ? 'Approval' : 'Posts',
                    child_data: __item,
                    userId: item.id,
                    isParentAthleteManagementView: user.id == item.parentId,
                  });
                } else {
                  Actions.push('profile', {
                    tab: 'Posts',
                    userId: item.id,
                    requested_role: item.role_id,
                    publicView: user.id != item.id,
                  });
                }
        
    
              }}
              key={index}
              style={styles.slide}>
              <FastImage
                source={{
                  uri: item?.image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                alt={item?.name}
                style={styles.slideImage}
              />
              <Text
                type={Fonts.type.base}
                size={Fonts.size.xxxSmall}
                color={Colors.white}
                textAlign="center"
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.name}
              </Text>
            </ButtonView>
          );
        }}
      />
    ),
    [topUsers],
  );

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text
            type={Fonts.type.medium}
            size={Fonts.size.medium}
            bold="500"
            color={Colors.black}>
            {/* Coaches */}
          </Text>
          <ButtonView
            onPress={() =>
              Actions.push('followers', {
                hasFollowers: false,
                userId: user.id,
                usersData: topUsers,
              })
            }>
            <Text
              type={Fonts.type.base}
              size={Fonts.size.xSmall}
              color={Colors.white}>
              View All
            </Text>
          </ButtonView>
        </View>
        {renderTopUsers}
      </View>
      <View style={styles.container}>
        {Object.keys(addingPost).length == 0 && (
          <ButtonView
            style={styles.writeArea}
            onPress={() => {
              Actions.write_post({fromDashboad: true});
            }}>
            <FastImage
              source={{
                uri: user?.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.writeLeftImage}
            />
            <Text
              color={Colors.grey2}
              size={Fonts.size.normal}
              style={styles.writeField}>
              POST
            </Text>
            <Image
              source={Images.camera}
              alt="Camera"
              style={styles.writeRightImage}
            />
          </ButtonView>
        )}
      </View>
    </View>
  );
};

export default TopUsers;
