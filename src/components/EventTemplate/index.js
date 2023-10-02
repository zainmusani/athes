// @flow
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, ImageBackground, View } from 'react-native';
import { ButtonView, Text } from '..';
import styles from './styles';
import { AppStyles, Images } from '../../theme';
import util from '../../util';

const EventTemplate = props => {
  const { item, onPress } = props;
  const { title, image, eventDate, subTitle } = item;

  return (
    <View>
      <ButtonView style={styles.container} onPress={onPress}>
        <ImageBackground
          source={{uri: image}}
          style={styles.bgImage}
          resizeMode="cover">
          <View style={styles.textView}>
            <View style={AppStyles.flex}>
              <Text style={styles.title}>{title}</Text>
              {!!subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
            </View>
            <Text style={styles.date}>{util.formatDate(eventDate)}</Text>
          </View>
          <Image
            source={Images.imageShadow}
            resizeMode={'cover'}
            style={styles.shadow}
          />
        </ImageBackground>
      </ButtonView>
    </View>
  );
};

export default EventTemplate;
