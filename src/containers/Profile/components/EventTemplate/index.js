// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image, View, Keyboard, FlatList } from 'react-native';
import styles from './styles';
import { Text, ScreenWrapper, ButtonView } from '../../../../components';
import { AppStyles, Images } from '../../../../theme';

const EventTemplate = props => {
  const { array } = props;

  return (
    <FlatList
      data={array}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[AppStyles.pLeft20]}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        return (
          <View style={styles.eventDetailMainView1}>
            <View>
              <View style={styles.eventDetailView1}>
                <View style={styles.imageBg}>
                  <Image source={Images.backBtnBlack} style={styles.eventImg} />
                </View>
                <Text style={styles.eventDate}>{item?.date}</Text>
              </View>

              <Text style={styles.eventName}>{item?.title}</Text>
            </View>

            <Image style={styles.bgImage} source={{uri: item?.image}} />
          </View>
        );
      }}
    />
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(EventTemplate);
