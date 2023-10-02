import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {View, Image, FlatList, Platform} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  CommentRBSheet,
  ShareRBSheet,
  ThreeDotsRBSheet,
} from '../';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './SingalPostStyles';
import {likesReactArray} from '../../constants';
import LikeRBSheet from '../LikeRBSheet';

const SingalPostView = props => {
  const [showShareSheet, setShowShareSheet] = useState(() => false);
  const [showCommentSheet, setShowCommentSheet] = useState(() => false);
  const [showDotsSheet, setShowDotsSheet] = useState(() => false);
  const [showLikesSheet, setShowLikesSheet] = useState(() => false);

  const {
    showLike,
    setShowLike,
    likeArray,
    handleActionsOfPost,
    isProfileView,
    isPendingView,
    isDeletedView,
    handlePendingRequestButtons,
  } = props;

  const handleActionApprove = value => {
    handlePendingRequestButtons(value);
    Actions.pop();
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      rightBtnImage={Images.dots}
      rightBtnPress={() => {
        setShowDotsSheet(true);
      }}>
      <View style={styles.postImgWrap}>
        <View style={styles.post}>
          {/* <Image source={Images.post} alt="post1" style={styles.postImg} /> */}
          <View style={styles.postContent}>
            <Text
              style={styles.posterName}
              size={Fonts.size.semiMedium}
              type={Fonts.type.bold}
              bold="700"
              color={Colors.white}>
              Amanda Fisher
            </Text>
            {/* <Text color={Colors.white} size={Fonts.size.xSmall}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </Text> */}
          </View>
        </View>

        {!isDeletedView && (
          <View
            style={[
              styles.postActionsArea,
              isPendingView && AppStyles.padding0,
            ]}>
            {isPendingView && (
              <View style={styles.pendingMainView}>
                <ButtonView
                  style={styles.pendingView}
                  onPress={() => handleActionApprove('Approve')}>
                  <Image
                    source={Images.approveIcon}
                    style={{maxHeight: 25, maxWidth: 25}}
                  />
                  <Text style={styles.pendingMsg}>Approve</Text>
                </ButtonView>

                <ButtonView
                  style={styles.pendingView}
                  onPress={() => handleActionApprove('Delete')}>
                  <Image
                    source={Images.deleteIcon}
                    style={{maxHeight: 25, maxWidth: 25}}
                  />
                  <Text style={styles.pendingMsg}>Delete</Text>
                </ButtonView>
              </View>
            )}
            {!isPendingView && (
              <>
                <ButtonView
                  style={styles.actionBtn}
                  onPress={() => setShowLikesSheet(true)}
                  onLongPress={() => setShowLike(!showLike)}>
                  <Image
                    source={Images.likeHands}
                    alt="likeHand"
                    style={styles.actionImg}
                  />
                  <Text
                    style={styles.actionTxt}
                    size={Fonts.size.normal}
                    type={Fonts.type.medium}
                    bold="600">
                    510
                  </Text>
                </ButtonView>
                <ButtonView
                  style={styles.actionBtn}
                  onPress={() => setShowCommentSheet(true)}>
                  <Image
                    source={Images.comment}
                    alt="comments"
                    style={[
                      styles.actionImg,
                      {width: 27, height: 25, marginRight: -3},
                    ]}
                  />
                  <Text
                    style={styles.actionTxt}
                    size={Fonts.size.normal}
                    type={Fonts.type.medium}
                    bold="600">
                    215
                  </Text>
                </ButtonView>
                <ButtonView
                  style={styles.actionBtn}
                  onPress={() => setShowShareSheet(true)}>
                  <Image
                    source={Images.sharePost}
                    alt="share"
                    style={styles.actionImg}
                  />
                </ButtonView>
              </>
            )}
          </View>
        )}
      </View>

      {/* like Button sheet */}
      <LikeRBSheet
        showLikesSheet={showLikesSheet}
        setShowLikesSheet={setShowLikesSheet}
        showLike={showLike}
        setShowLike={setShowLike}
        isEnlargeView
      />

      {/* commet Button sheet */}
      <CommentRBSheet
        showCommentSheet={showCommentSheet}
        setShowCommentSheet={setShowCommentSheet}
      />

      {/* share sheet */}
      <ShareRBSheet
        showShareSheet={showShareSheet}
        setShowShareSheet={setShowShareSheet}
      />

      {/* three dots sheet */}
      <ThreeDotsRBSheet
        showDotsSheet={showDotsSheet}
        setShowDotsSheet={setShowDotsSheet}
        handleActionsOfPost={handleActionsOfPost}
        isProfileView={isProfileView}
        single
      />
    </ScreenWrapper>
  );
};

export default SingalPostView;
