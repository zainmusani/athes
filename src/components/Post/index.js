import InViewPort from '@coffeebeanslabs/react-native-inviewport';
import _ from 'lodash';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonView,
  CommentRBSheet,
  LikeRBSheet,
  ShareRBSheet,
  Text,
  ThreeDotsRBSheet,
} from '..';
import {getCommentRequest} from '../../actions/commentAction';
import {
  addReactionRequest,
  editPostRequest,
  getPostReactionsRequest,
} from '../../actions/PostActions';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import likeRBSheetStyles from '../LikeRBSheet/styles';
import Loader from '../Loader';
import ImageCarousel from './ImageCarousel';
import styles from './styles';

const Post = (props, ref) => {
  const {
    handleActionsOfPost,
    isPendingView,
    isDeletedView,
    isAccepted,
    handlePendingRequestButtons,
    isProfileView,
    data,
    isComment,
    isReact,
  } = props;

  const {media, id, post_text, user, react, parent_id, parent, postTags} = data;
  const dispatch = useDispatch();

  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  const [showDotsSheet, setShowDotsSheet] = useState(false);
  const [showLikesSheet, setShowLikesSheet] = useState(false);
  // const [showShareSheet2, setShowShareSheet2] = useState(false);
  // const [showCommentSheet2, setShowCommentSheet2] = useState(false);
  // const [showDotsSheet2, setShowDotsSheet2] = useState(false);
  // const [showLikesSheet2, setShowLikesSheet2] = useState(false);

  // const [visible, setIsVisible] = useState(false);

  const [showLike, setShowLike] = useState(false);

  const [postViewIndex, setPostViewIndex] = useState(0);

  // const checkVisible = useRef(false);
  const [checkVisible, setCheckVisible] = useState(true);

  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    hide: () => {
      setShowLike(false);
    },
  }));

  useEffect(() => {
    setShowCommentSheet(!_.isUndefined(isComment) ? true : false);
    setShowLikesSheet(!_.isUndefined(isReact) ? true : false);
  }, [isComment, isReact]);

  const approveRejectAction = actionName => {
    let urls = [];
    let tags = [];
    if (media.length > 0) {
      media.forEach(res => {
        urls.push(res.media_url);
      });
    }
    if (postTags.length > 0) {
      postTags.forEach(res => {
        tags.push(res.id);
      });
    }

    let payload = {
      post_text: post_text,
      media_urls: urls,
      status: actionName == 'Approve' ? 1 : 2,
      post_id: id,
      tags: tags,
      child: user,
    };
    dispatch(editPostRequest(payload, res => {}));
    handlePendingRequestButtons(actionName);
  };

  const addReaction = (isClap, isCare, isLiked) => {
    dispatch(
      addReactionRequest(
        {
          postId: id,
          isLiked,
          isCare,
          isClap,
        },
        (res, err) => res && {},
      ),
    );
  };

  const LikePostView = () => (
    <View style={[likeRBSheetStyles.innerActionWrap]}>
      <View
        style={[
          likeRBSheetStyles.postActionsArea,
          likeRBSheetStyles.thumbsActions,
        ]}>
        <ButtonView
          style={[
            likeRBSheetStyles.actionBtn,
            likeRBSheetStyles.innerActionBtn,
          ]}
          onPress={() => {
            addReaction(1, 0, 0);
            setShowLike(!showLike);
          }}>
          <Image
            source={Images.likeHands}
            alt="likeHand"
            style={[
              likeRBSheetStyles.actionImg,
              {marginRight: 8, width: 16, height: 17},
            ]}
          />
          {/* <Text
            style={likeRBSheetStyles.actionTxt}
            size={Fonts.size.xSmall}
            type={Fonts.type.base}
            bold="500">
            High Five
          </Text> */}
        </ButtonView>
        <ButtonView
          style={[
            likeRBSheetStyles.actionBtn,
            likeRBSheetStyles.innerActionBtn,
          ]}
          onPress={() => {
            addReaction(0, 1, 0);
            setShowLike(!showLike);
          }}>
          <Image
            source={Images.letsGo}
            alt="comments"
            style={[
              likeRBSheetStyles.actionImg,
              {marginRight: 8, width: 20, height: 20},
            ]}
          />
        </ButtonView>
        <ButtonView
          style={[
            likeRBSheetStyles.actionBtn,
            likeRBSheetStyles.innerActionBtn,
          ]}
          onPress={() => {
            addReaction(0, 0, 1);
            setShowLike(!showLike);
          }}>
          <Image
            source={Images.thumbsUp}
            alt="share"
            style={[
              likeRBSheetStyles.actionImg,
              {marginRight: 8, width: 18, height: 18},
            ]}
          />
        </ButtonView>
      </View>
    </View>
  );

  return (
    <>
      {/* {visible && checkVisible && renderInLargeView} */}
      {data && (
        <>
          <Loader loading={loading} />

          <View style={styles.post}>
            <PostHeader
              data={data}
              user={user}
              parent={parent}
              post_text={post_text}
              media={media}
              isDeletedView={isDeletedView}
              isAccepted={isAccepted}
              setShowDotsSheet={setShowDotsSheet}
              postTags={postTags}
            />

            {!!parent?.length && (
              <PostHeader
                data={parent[0]}
                childPost
                isDeletedView
                user={parent[0].user}
                parent={[]}
                post_text={parent[0].post_text}
                media={parent[0].media}
                setShowDotsSheet={setShowDotsSheet}
                postTags={postTags}
              />
            )}

            <View style={[styles.postImgWrap]}>
              <>
                {!!media?.length && (
                  <InViewPort
                    style={styles.postImg}
                    delay={1000}
                    onChange={isVisible => {
                      setCheckVisible(isVisible);
                    }}>
                    <ImageCarousel
                      media={media}
                      postViewIndex={postViewIndex}
                      setPostViewIndex={setPostViewIndex}
                      checkVisible={checkVisible}
                    />
                  </InViewPort>
                )}

                {!!parent.length && (
                  <InViewPort
                    style={styles.postImg}
                    delay={1000}
                    onChange={isVisible => {
                      setCheckVisible(isVisible);
                    }}>
                    <ImageCarousel
                      media={parent[0].media}
                      postViewIndex={postViewIndex}
                      setPostViewIndex={setPostViewIndex}
                      checkVisible={checkVisible}
                    />
                  </InViewPort>
                )}

                {/* {!!media?.length && (
                  <View style={styles.postImg}>
                    <ImageCarousel
                      media={media}
                      postViewIndex={postViewIndex}
                      setPostViewIndex={setPostViewIndex}
                      checkVisible={checkVisible}
                    />
                  </View>
                )}
                {!!parent.length && (
                  <View style={styles.postImg}>
                    <ImageCarousel
                      media={parent[0].media}
                      postViewIndex={postViewIndex}
                      setPostViewIndex={setPostViewIndex}
                      checkVisible={checkVisible}
                    />
                  </View>
                )} */}
              </>

              <View>
                {!isDeletedView && (
                  <SocialButtons
                    post_id={id}
                    data={data}
                    react={react}
                    isPendingView={isPendingView}
                    approveRejectAction={approveRejectAction}
                    setShowLikesSheet={setShowLikesSheet}
                    setShowLike={setShowLike}
                    showLike={showLike}
                    setShowCommentSheet={setShowCommentSheet}
                    setShowShareSheet={setShowShareSheet}
                  />
                )}
              </View>
            </View>
          </View>
        </>
      )}
      <>
        <CommentRBSheet
          showCommentSheet={showCommentSheet}
          setShowCommentSheet={setShowCommentSheet}
          post_id={id}
          user_id={user.id}
        />

        <LikeRBSheet
          post_id={id}
          showLikesSheet={showLikesSheet}
          setShowLikesSheet={setShowLikesSheet}
        />

        <ThreeDotsRBSheet
          post_user={user}
          post_id={id}
          showDotsSheet={showDotsSheet}
          setShowDotsSheet={setShowDotsSheet}
          handleActionsOfPost={handleActionsOfPost}
          isProfileView={isProfileView}
          // setIsVisible={setIsVisible}
        />

        <ShareRBSheet
          post={data}
          showShareSheet={showShareSheet}
          setShowShareSheet={setShowShareSheet}
        />
      </>

      {showLike && <LikePostView />}
    </>
  );
};

export default React.memo(forwardRef(Post), (prevProps, nextProps) => {
  return prevProps.data === nextProps.data; // Don't re-render!
});

const PostText = React.memo(props => {
  const MIN_NUMBER_OF_LINES = 6;
  const MAX_NUMBER_OF_LINES = null;
  const {style, color, text} = props;
  const [shouldShowLess, setShouldShowLess] = useState(() => true);
  const [numOfLines, setNumOfLines] = useState(0);

  const onTextLayout = useCallback(e => {
    if (numOfLines == 0) setNumOfLines(e.nativeEvent.lines.length);
  });

  return (
    <View style={style}>
      <Text
        color={color}
        size={Fonts.size.xSmall}
        onTextLayout={onTextLayout}
        numberOfLines={
          numOfLines == 0
            ? MAX_NUMBER_OF_LINES
            : shouldShowLess
            ? MIN_NUMBER_OF_LINES
            : MAX_NUMBER_OF_LINES
        }>
        {text}
      </Text>

      {numOfLines > MIN_NUMBER_OF_LINES && (
        <Text
          color={color}
          size={Fonts.size.xSmall}
          type={Fonts.type.medium}
          bold="600"
          onPress={() => {
            setShouldShowLess(!shouldShowLess);
          }}>
          {shouldShowLess ? `Show more` : `Show less`}
        </Text>
      )}
    </View>
  );
});

const PostHeader = React.memo(props => {
  const {
    childPost,
    data,
    user,
    isDeletedView,
    isAccepted,
    post_text,
    parent,
    media,
    setShowDotsSheet,
    postTags,
  } = props;
  const loggedInUser = useSelector(state => state.user.data);
  return (
    <View
      key={data.createdAt}
      style={
        childPost
          ? styles.childPostText
          : {...AppStyles.paddingHorizontalBase, width: '100%'}
      }>
      <View style={styles.postHeader}>
        <ButtonView
          style={styles.headerLeft}
          onPress={() => {
            if (user?.isAdmin == 1 || user?.isFeedsAdmin) {
              return true;
            }
            Actions.profile({
              userId: user.id,
              requested_role: user.role_id,
              publicView: loggedInUser.id != user.id,
            });
          }}>
          <FastImage
            style={styles.profileImage}
            source={{
              uri: user.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.postIntro}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.postTimeText}>
              {data.createdAt ? util.timeAgo(data.createdAt) : 'Just Now.'}
            </Text>
          </View>
        </ButtonView>
        {user?.isAdmin == 1 || user?.isFeedsAdmin ? (
          <Text
            size={Fonts.size.xxxSmall}
            color={Colors.white}
            style={{alignSelf: 'center'}}>
            {user?.isFeedsAdmin == 1 ? `@${data.third_party}` : `@Sponsored`}
          </Text>
        ) : (
          <>
            {!isDeletedView && (
              <>
                {!isAccepted && (
                  <ButtonView
                    style={styles.postOptions}
                    onPress={() => setShowDotsSheet(true)}>
                    <Image
                      source={Images.dots}
                      alt="Post Options"
                      style={styles.dotsImg}
                    />
                  </ButtonView>
                )}
              </>
            )}
          </>
        )}
      </View>

      {postTags && postTags.length > 0 && (
        <View
          style={{
            ...AppStyles.flexRow,
            ...AppStyles.mBottom10,
          }}>
          {postTags.map((res, index) => (
            <Text color={Colors.white} size={12} key={index}>
              #{res.tag}{' '}
            </Text>
          ))}
        </View>
      )}

      {/* {data?.postInterests && data?.postInterests.length > 0 && (
        <View
          style={{
            ...AppStyles.flexRow,
            ...AppStyles.mBottom10,
            flexWrap: 'wrap',
          }}>
          <Text
            type={Fonts.type.medium}
            bold="600"
            size={14}
            color={Colors.white}>
            Post Interests:{' '}
          </Text>
          {data?.postInterests.map((res, index) => (
            <Text color={Colors.white} size={12} key={index}>
              {res}
              {', '}
            </Text>
          ))}
        </View>
      )} */}

      {!!post_text && (
        <PostText
          color={Colors.white}
          style={[
            styles.postContent,
            media.length == 0 && !childPost && parent.length == 0
              ? {...AppStyles.mBottom30}
              : {},
            media.length == 0 && childPost ? {...AppStyles.mBottom20} : {},
          ]}
          text={post_text}
        />
      )}
    </View>
  );
});

const SocialButtons = React.memo(props => {
  const {
    isPendingView,
    approveRejectAction,
    setShowLikesSheet,
    setShowLike,
    showLike,
    setShowCommentSheet,
    setShowShareSheet,
    react,
    data,
    post_id,
  } = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  return (
    <>
      {user.privacy != 'private' && (
        <View
          style={[
            styles.postActionsArea,
            isPendingView ? {maxWidth: 240} : {},
          ]}>
          {isPendingView && (
            <View style={styles.pendingMainView}>
              <ButtonView
                style={styles.pendingView}
                onPress={() => approveRejectAction('Approve')}>
                <Image
                  source={Images.approveIcon}
                  style={{maxHeight: 25, maxWidth: 25}}
                />
                <Text style={styles.pendingMsg}>Approve</Text>
              </ButtonView>

              <ButtonView
                style={styles.pendingView}
                onPress={() => approveRejectAction('Reject')}>
                <Image
                  source={Images.deleteIcon}
                  style={{maxHeight: 25, maxWidth: 25}}
                />
                <Text style={styles.pendingMsg}>Reject</Text>
              </ButtonView>
            </View>
          )}
          {!isPendingView && (
            <>
              <ButtonView
                style={[styles.actionBtn]}
                onPress={() => {
                  setShowLikesSheet(true);
                  dispatch(
                    getPostReactionsRequest(
                      {postId: post_id},
                      (res, err) => {},
                    ),
                  );
                }}
                onLongPress={() => setShowLike(!showLike)}>
                <Image
                  source={Images.likeHands}
                  alt="likeHand"
                  style={styles.actionImg}
                />
                <Text
                  style={styles.actionTxt}
                  size={Fonts.size.small}
                  type={Fonts.type.medium}
                  bold="600">
                  {react}
                </Text>
              </ButtonView>

              <ButtonView
                style={styles.actionBtn}
                onPress={() => {
                  // setLoading(true);
                  setShowCommentSheet(true);
                  dispatch(
                    getCommentRequest({post_id: post_id}, res => {
                      // setLoading(false);
                    }),
                  );
                }}>
                <Image
                  source={Images.comment}
                  alt="comments"
                  style={[
                    styles.actionImg,
                    {width: 17, height: 17, marginRight: -3},
                  ]}
                />
                <Text
                  style={styles.actionTxt}
                  size={Fonts.size.small}
                  type={Fonts.type.medium}
                  bold="600">
                  {data.comment}
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
    </>
  );
});
