import React, {useEffect, useRef, useState} from 'react';
import {Image, Platform, View, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import {ButtonView, Text} from '..';
import {AppStyles, Fonts, Images, Metrics} from '../../theme';
import styles from './styles';
import PropTypes from 'prop-types';
import {likeArray} from '../../constants';
import FastImage from 'react-native-fast-image';

const LikeRBSheet = props => {
  const {showLikesSheet, setShowLikesSheet, postReactions} = props;
  const [likesCategorySelected, setLikesCategorySelected] = useState('all');

  const likeSheetRef = useRef();
  useEffect(() => {
    if (showLikesSheet) {
      likeSheetRef.current.open();
    }
  });

  return (
    <>
      <RBSheet
        ref={likeSheetRef}
        height={Metrics.screenHeight / 2.5}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            // alignItems: 'center',
          },
          container: styles.likesRBSheetContainer,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            ...AppStyles.pTop20,
          }}>
          <Text size={Fonts.size.medium} type={Fonts.type.medium} bold="600">
            Let's Go's
          </Text>
          <ButtonView
            style={styles.closeButton}
            onPress={() => {
              setShowLikesSheet(false);
              likeSheetRef.current?.close();
            }}>
            <Image source={Images.close} />
          </ButtonView>
        </View>

        <View style={styles.likeTypeMainView}>
          <FlatList
            data={postReactions.likesReactArray}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <ButtonView
                  style={
                    likesCategorySelected === item.type
                      ? styles.likeTypeViewSelected
                      : styles.likeTypeView
                  }
                  onPress={() => setLikesCategorySelected(item.type)}>
                  {item.icon !== '' && (
                    <Image source={item.icon} style={styles.likeTypeImg} />
                  )}
                  <Text
                    style={
                      likesCategorySelected === item.type
                        ? styles.likeTypeTextSelected
                        : styles.likeTypeText
                    }>
                    {item.likes}
                  </Text>
                </ButtonView>
              );
            }}
          />
        </View>

        <View
          style={[
            AppStyles.paddingHorizontalBase,
            AppStyles.mTop25,
            AppStyles.mBottom50,
          ]}>
          <FlatList
            data={postReactions.users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <>
                  {(likesCategorySelected == item.type ||
                    likesCategorySelected == 'all') && (
                    <View style={styles.likeMainView}>
                      <View style={styles.likeView}>
                        <FastImage
                          style={styles.likeProfilePic}
                          source={{
                            uri:
                              item.user.image ||
                              'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <View>
                          <View style={styles.nameView}>
                            <Text style={styles.nameStyle}>
                              {item.user.name}
                            </Text>
                            <Image
                              source={item.type_image}
                              style={{width: 10, height: 10, marginLeft: 5}}
                              resizeMode="contain"
                            />
                          </View>
                          <Text style={styles.athleteStyle}>
                            {item.user.Athlete}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.timeStyle}>{'45m'}</Text>
                      </View>
                    </View>
                  )}
                </>
              );
            }}
          />
        </View>
      </RBSheet>
    </>
  );
};

LikeRBSheet.propTypes = {
  showLikesSheet: PropTypes.bool,
  setShowLikesSheet: PropTypes.func,
  showLike: PropTypes.bool,
  setShowLike: PropTypes.func,
  isEnlargeView: PropTypes.bool,
};

LikeRBSheet.defaultProps = {
  showLikesSheet: false,
  setShowLikesSheet: () => {},
  showLike: false,
  setShowLike: () => {},
  isEnlargeView: false,
};

const mapStateToProps = ({post}) => ({
  postReactions: post.postReactions,
});

const actions = {};

export default connect(mapStateToProps, actions)(LikeRBSheet);
