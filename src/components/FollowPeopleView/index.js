import React from 'react';
import {Image, View} from 'react-native';
import {ButtonView, Text} from '..';
import {AppStyles, Colors, Fonts} from '../../theme';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {followingRequest} from '../../actions/UserActions';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import FastImage from 'react-native-fast-image';
import styles from '../Button/styles';

const FollowPeopleView = props => {
  const {item, onlyUsers} = props;
  const {name, role, distance} = item;

  const {data: loggedInUser} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const followRequest = data => {
    let item = _.cloneDeep(data);
    item.follow = item.follow == 1 ? 0 : 1;

    let payload = {
      following_id: item.userId,
      ...item,
    };
    dispatch(
      followingRequest(payload, res => {
        // setLoading(false);
      }),
    );
  };

  return (
    <View
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
        }}>
        <FastImage
          style={{width: 47, height: 47, borderRadius: 47}}
          source={{
            uri: item.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            flexGrow: 1,
            ...AppStyles.pLeft10,
            ...AppStyles.pRight10,
            flex: 1,
          }}>
          <Text
            size={Fonts.size.semiMedium}
            color={Colors.white}
            bold="700"
            type={Fonts.type.bold}>
            {name}
          </Text>
          <Text
            size={Fonts.size.xxxxSmall}
            color={Colors.grey2}
            style={{marginTop: 2, textTransform: 'capitalize'}}>
            {util.getRoleNameByID(item?.role_id)}
          </Text>
          {distance > 0 && (
            <Text
              size={Fonts.size.xxSmall}
              color={Colors.grey2}
              style={{marginTop: 2, textTransform: 'capitalize'}}>
              {`Distance: ${distance.toString()} ${
                distance > 1 ? 'Miles' : 'Mile'
              }`}
            </Text>
          )}
        </View>
      </ButtonView>
      {!onlyUsers && (
        <ButtonView
          onPress={() => followRequest(item)}
          style={{
            ...AppStyles.paddingHorizontalBase,
            backgroundColor: Colors.white,
            paddingVertical: 7,
            flex: 0.34,
          }}>
          <Text style={styles.followFollowingText}>
            {item.follow == 0 ? 'Follow' : 'Following'}
          </Text>
        </ButtonView>
      )}
    </View>
  );
};

FollowPeopleView.propTypes = {
  profilePic: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  onlyUsers: PropTypes.bool,
};

FollowPeopleView.defaultProps = {
  profilePic: '',
  name: '',
  role: '',
  onlyUsers: false,
};

export default FollowPeopleView;
