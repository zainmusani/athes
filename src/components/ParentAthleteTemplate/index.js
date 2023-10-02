// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {ButtonView, Text} from '../../components';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import FastImage from 'react-native-fast-image';

export default class ParentAthleteTemplate extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    isSeasonView: PropTypes.bool,
    isTeamView: PropTypes.bool,
  };
  static defaultProps = {
    onPress: () => {},
    isSeasonView: false,
    isTeamView: false,
  };

  render() {
    const {item, hasTimings, waletList, isSeasonView, isTeamView, onPress} =
      this.props;

    const {
      id,
      title,
      itemDate,
      startTime,
      endTime,
      users,
      paymentType,
      status,
      resourceType,
    } = item;

    return (
      <ButtonView
        style={[
          styles.parentAthleteEventContainer,
          waletList && AppStyles.paddingVerticalBase,
        ]}
        onPress={onPress}>
        <View style={{...AppStyles.flexRow}}>
          <FastImage
            style={styles.image}
            source={{
              uri:
                item.image ||
                'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View>
            {hasTimings && (
              <Text style={styles.time}>{`${startTime} - ${endTime}`}</Text>
            )}
            {resourceType && <Text style={[styles.time]}>{resourceType}</Text>}
            <Text style={isTeamView ? styles.titleTeamView : styles.title}>
              {title}
            </Text>

            {itemDate && (
              <Text
                style={
                  isSeasonView
                    ? styles.subTitleSeasonView
                    : isTeamView
                    ? styles.subTitleTeamView
                    : styles.subTitle
                }>
                {waletList ? itemDate : util.formatDate(itemDate)}
              </Text>
            )}

            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop5,
                {marginLeft: 6},
              ]}>
              {users?.map((res, idx) => {
                return (
                  <>
                    {idx <= 2 && (
                      <Image
                        source={{uri: res.userImage}}
                        style={
                          isSeasonView ? styles.imagesSeasonView : styles.images
                        }
                      />
                    )}
                  </>
                );
              })}
              {users?.length > 3 && (
                <View style={styles.viewMore}>
                  <Text size={8} color={Colors.white}>
                    {users?.length}+
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {!waletList ? (
          <Image
            source={Images.rightArrowCircleIcon}
            resizeMode={'contain'}
            style={{tintColor: Colors.black}}
          />
        ) : (
          <Text size={Fonts.size.xxSmall} style={{textTransform: 'capitalize'}}>
            {status == 'done' ? paymentType : status}
          </Text>
        )}
      </ButtonView>
    );
  }
}
