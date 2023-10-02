import React, {useEffect, useRef, useState} from 'react';
import {Image, View, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect, useDispatch} from 'react-redux';
import {TextInput, ButtonView, Text} from '../';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import styles from './styles';
import {
  addCommentReactionRequest,
  createCommentRequest,
  deleteCommentRequest,
  editCommentRequest,
  getCommentReactionsRequest,
  getCommentRequest,
} from '../../actions/commentAction';
import Loader from '../Loader';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ModalView from '../ModalView';
import util from '../../util';
import FastImage from 'react-native-fast-image';

const CommentRBSheet = props => {
  const {
    comments,
    showCommentSheet,
    setShowCommentSheet,
    post_id,
    commentReactions,
    userId,
  } = props;

  const [commentLikeDetailView, setCommentLikeDetailView] = useState(
    () => false,
  );
  const [comment, setComment] = useState(() => '');
  const [commentId, setCommentId] = useState(() => 0);
  const [deleteCommentId, setDeleteCommentId] = useState(() => 0);
  const [loading, setLoading] = useState(() => false);
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [showCommentLike, setShowCommentLike] = useState(null);
  const [showCommentReply, setShowCommentReply] = useState(null);
  const sheetRef = useRef(null);
  const commentFieldRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showCommentSheet) {
      sheetRef.current.open();
    }
  });

  const addCommentReaction = (isClap, isCare, isLiked) => {
    dispatch(
      addCommentReactionRequest(
        {
          commentId,
          isClap,
          isCare,
          isLiked,
        },
        (res, err) => {},
      ),
    );
    setShowCommentLike(null);
    setCommentId(0);
  };

  const commentSubmitHandler = () => {
    commentFieldRef.current.blur();
    setTimeout(() => setComment(''), 200);
    if (comment && !commentId) {
      dispatch(
        createCommentRequest({comment_text: comment, post_id}, res => {
          if (res) {
            setComment('');
            dispatch(getCommentRequest({post_id}, res => {}));
            setCommentLikeDetailView(false);
            setShowCommentSheet(false);
            setShowCommentLike(null);
            setShowCommentReply(null);
            sheetRef.current.close();
          }
        }),
      );
    }
    if (comment && commentId) {
      dispatch(
        editCommentRequest(
          {comment_text: comment, comment_id: commentId},
          res => {
            if (res) {
              setComment('');
              dispatch(
                getCommentRequest({post_id}, res => res && setCommentId(0)),
              );
            }
          },
        ),
      );
    }
  };

  const deleteCommentConfirmHandler = () => {
    dispatch(
      deleteCommentRequest(deleteCommentId.toString(), res => {
        if (res) {
          setModalVisible(false);
          dispatch(getCommentRequest({post_id}, res => {}));
          if (commentId === deleteCommentId) {
            setComment('');
            setCommentId(0);
          }
        }
      }),
    );
  };

  const CommentsListView = ({item, index}) => {
    return (
      <View
        style={[
          styles.commentRow,
          index === comments.length - 1 ? {borderBottomWidth: 0} : {},
        ]}>
        <FastImage
          style={styles.commentAvator}
          source={{
            uri:
              item.user.image ||
              'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.commentDetail}>
          <Text
            size={Fonts.size.xxSmall}
            type={Fonts.type.medium}
            bold="600"
            color={Colors.black1}>
            {item.user.name}
          </Text>
          <Text
            size={Fonts.size.xxSmall}
            color={Colors.black1}
            style={{marginBottom: 3, width: 170}}>
            {item.comment.comment_text}
          </Text>
          <View style={styles.commentActions}>
            <ButtonView
              onPress={() => {
                setCommentLikeDetailView(true);

                dispatch(
                  getCommentReactionsRequest(
                    {commentId: item.comment.id},
                    (res, err) => {},
                  ),
                );
              }}
              onLongPress={() => {
                setShowCommentLike(index);
                setCommentId(item.comment.id);
              }}>
              <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                Like {`${item.comment.react} .  `}
              </Text>
            </ButtonView>
            {item.comment.createdBy === userId && (
              <>
                <ButtonView
                  onPress={() => {
                    setComment(item.comment.comment_text);
                    setCommentId(item.comment.id);
                  }}>
                  <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                    Edit .{'  '}
                  </Text>
                </ButtonView>
                <ButtonView
                  onPress={() => {
                    setDeleteCommentId(item.comment.id);
                    setModalVisible(true);
                  }}>
                  <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                    Delete .{'  '}
                  </Text>
                </ButtonView>
              </>
            )}
            <ButtonView
              onPress={() => {
                setShowCommentReply(i => i === index || index);
              }}>
              <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                Reply {`${item.replies}`}
              </Text>
            </ButtonView>
          </View>
        </View>
        <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
          {util.timeAgo(item.comment.createdAt)}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Loader loading={loading} />
      <RBSheet
        onClose={() => {
          setCommentLikeDetailView(false);
          setShowCommentSheet(false);
          setShowCommentLike(null);
          setShowCommentReply(null);
        }}
        keyboardAvoidingViewEnabled={true}
        ref={sheetRef}
        height={Metrics.screenHeight / 2.5}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            // alignItems: 'center',
          },
          container: styles.commentContainer,
        }}>
        <ModalView
          deleteConfirmHandler={deleteCommentConfirmHandler}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          image={Images.deleteIcon}
          isConfirmModal={true}
          heading={'Delete Comment'}
          description={'Are you sure you want to delete this comment ?'}
          buttonText={'Confirm'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            ...AppStyles.pTop20,
          }}>
          {commentLikeDetailView && (
            <ButtonView
              style={styles.topBackBtn}
              onPress={() => setCommentLikeDetailView(false)}>
              <Image
                source={Images.back_btn}
                style={{tintColor: Colors.blue, width: 20}}
              />
            </ButtonView>
          )}
          <Text
            size={Fonts.size.medium}
            type={Fonts.type.medium}
            bold="600"
            style={{marginTop: 0}}>
            Comments
          </Text>
        </View>
        <View style={styles.comments}>
          {commentLikeDetailView ? (
            <LikesDetailView
              reactions={commentReactions}
              setCommentLikeDetailView={setCommentLikeDetailView}
            />
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{height: 220}}
                keyExtractor={(item, index) => item.comment.id}
                data={comments}
                onRefresh={() => {
                  setLoading(true);
                  dispatch(
                    getCommentRequest({post_id}, res => {
                      setLoading(false);
                    }),
                  );
                }}
                refreshing={loading}
                renderItem={({item, index}) => (
                  <>
                    <CommentsListView item={item} index={index} />
                    {showCommentReply === index && (
                      <RepliesListView
                        userId={userId}
                        child={item.child}
                        post_id={item.comment.post_id}
                        id={item.comment.id}
                        setCommentLikeDetailView={setCommentLikeDetailView}
                      />
                    )}
                    {showCommentLike === index && (
                      <LikeCommentView addReaction={addCommentReaction} />
                    )}
                  </>
                )}
              />

              <TextInputField
                customRef={commentFieldRef}
                value={comment}
                setValue={setComment}
                onSubmitEditing={commentSubmitHandler}
                placeholder="comment"
              />
              {/* <KeyboardSpacer /> */}
            </>
          )}
        </View>
      </RBSheet>
    </>
  );
};

const mapStateToProps = ({comments, user}) => ({
  comments: comments.postCommentsList,
  commentReactions: comments.commentReactions,
  userId: user.data.id,
});

const actions = {};

export default connect(mapStateToProps, actions)(CommentRBSheet);

const LikeCommentView = ({addReaction}) => (
  <View style={[styles.innerActionWrap]}>
    <View style={[styles.postActionsArea, styles.thumbsActions]}>
      <ButtonView
        style={[styles.actionBtn, styles.innerActionBtn]}
        onPress={() => addReaction(1, 0, 0)}>
        <Image
          source={Images.likeHands}
          alt="likeHand"
          style={[styles.actionImg, {width: 10, height: 11}]}
        />
      </ButtonView>
      <ButtonView
        style={[styles.actionBtn, styles.innerActionBtn]}
        onPress={() => addReaction(0, 1, 0)}>
        <Image
          source={Images.letsGo}
          alt="comments"
          style={[styles.actionImg, {width: 12, height: 12}]}
        />
      </ButtonView>
      <ButtonView
        style={[styles.actionBtn, styles.innerActionBtn]}
        onPress={() => addReaction(0, 0, 1)}>
        <Image
          source={Images.thumbsUp}
          alt="share"
          style={[styles.actionImg, {width: 10, height: 11}]}
        />
      </ButtonView>
    </View>
  </View>
);

const RepliesListView = ({
  child,
  post_id,
  id,
  userId,
  setCommentLikeDetailView,
}) => {
  const replyFieldRef = useRef(null);
  const [comment, setComment] = useState(() => '');
  const [commentId, setCommentId] = useState(() => 0);
  const [showCommentLike, setShowCommentLike] = useState(null);
  const dispatch = useDispatch();

  const replySubmitHandler = () => {
    // replyFieldRef.current.blur();
    setTimeout(() => setComment(''), 200);
    if (comment && !commentId) {
      dispatch(
        createCommentRequest(
          {comment_text: comment, post_id, parent_id: id},
          res => {
            if (res) {
              setComment('');
              dispatch(getCommentRequest({post_id}, res => {}));
            }
          },
        ),
      );
    }
    if (comment && commentId) {
      dispatch(
        editCommentRequest(
          {comment_text: comment, comment_id: commentId},
          res => {
            if (res) {
              setComment('');
              dispatch(
                getCommentRequest({post_id}, res => res && setCommentId(0)),
              );
            }
          },
        ),
      );
    }
  };

  const addReplyCommentReaction = (isClap, isCare, isLiked) => {
    dispatch(
      addCommentReactionRequest(
        {
          commentId,
          isClap,
          isCare,
          isLiked,
        },
        (res, err) => {},
      ),
    );
    setShowCommentLike(null);
    setCommentId(0);
  };

  return (
    <View style={styles.replyContainer}>
      <View style={styles.replyLine}></View>
      <View style={styles.replyCommentsContainer}>
        <FlatList
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index.id.toString()}
          data={child}
          renderItem={({item, index}) => (
            <>
              <View
                style={[
                  styles.commentRow,
                  index === child.length - 1 ? {borderBottomWidth: 0} : {},
                ]}>
                <FastImage
                  style={styles.commentAvator}
                  source={{
                    uri: item.user.image || Images.userEmptyImage,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.commentDetail}>
                  <Text
                    size={Fonts.size.xxSmall}
                    type={Fonts.type.medium}
                    bold="600"
                    color={Colors.black1}>
                    {item.user.name}
                  </Text>
                  <Text
                    size={Fonts.size.xxSmall}
                    color={Colors.black1}
                    style={{marginBottom: 3}}>
                    {item.comment_text}
                  </Text>
                  <View style={styles.commentActions}>
                    <ButtonView
                      onPress={() => {
                        setCommentLikeDetailView(true);
                        dispatch(
                          getCommentReactionsRequest(
                            {commentId: item.id},
                            (res, err) => {},
                          ),
                        );
                      }}
                      onLongPress={() => {
                        setShowCommentLike(index);
                        setCommentId(item.id);
                      }}>
                      <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                        Like {`${item.react} .  `}
                      </Text>
                    </ButtonView>
                    {item.createdBy === userId && (
                      <>
                        <ButtonView
                          onPress={() => {
                            setComment(item.comment_text);
                            setCommentId(item.id);
                          }}>
                          <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                            Edit .{'  '}
                          </Text>
                        </ButtonView>
                        <ButtonView
                          onPress={() => {
                            dispatch(
                              deleteCommentRequest(item.id.toString(), res => {
                                if (res) {
                                  dispatch(
                                    getCommentRequest({post_id}, res => {}),
                                  );
                                  if (commentId === item.id) {
                                    setComment('');
                                    setCommentId(0);
                                  }
                                }
                              }),
                            );
                          }}>
                          <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                            Delete .{'  '}
                          </Text>
                        </ButtonView>
                      </>
                    )}
                    <ButtonView
                      onPress={() => {
                        // setShowCommentReply(i => i === index || index);
                        replyFieldRef.current.focus();
                        setComment(`@${item.user.name} `);
                      }}>
                      <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                        Reply
                      </Text>
                    </ButtonView>
                  </View>
                </View>
                <Text color="#8A8A8F" size={Fonts.size.xxxSmall}>
                  {util.timeAgo(item.createdAt)}
                </Text>
              </View>
              {showCommentLike === index && (
                <LikeCommentView addReaction={addReplyCommentReaction} />
              )}
            </>
          )}
        />
        <TextInputField
          customRef={replyFieldRef}
          onSubmitEditing={replySubmitHandler}
          value={comment}
          setValue={setComment}
          placeholder="reply"
        />
      </View>
    </View>
  );
};

const TextInputField = ({
  customRef,
  value,
  setValue,
  onSubmitEditing,
  placeholder,
}) => (
  <TextInput
    placeholder={placeholder} //12345
    placeholderTextColor="#8A8A8F"
    returnKeyType="done"
    containerStyle={AppStyles.mBottom20}
    value={value}
    ref={customRef}
    onChangeText={value => setValue(value)}
    onSubmitEditing={onSubmitEditing}
    selectionColor={Colors.black}
    customStyle={{
      fontSize: Fonts.size.xxSmall,
      flexGrow: 1,
      color: Colors.black,
      backgroundColor: Colors.grey1,
      borderRadius: 8,
      height: 40,
      ...AppStyles.paddingHorizontalBase,
      ...AppStyles.mTop10,
      marginBottom: -20,
    }}
  />
);

const LikesDetailView = ({reactions, setCommentLikeDetailView}) => {
  const [likesCategorySelected, setLikesCategorySelected] = useState('all');

  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            ...AppStyles.pTop20,
          }}>
          <Text size={Fonts.size.medium} type={Fonts.type.medium} bold="600">
            Let's Go's
          </Text>
        </View>

        <View style={styles.likeTypeMainView}>
          <FlatList
            data={reactions.likesReactArray}
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
            data={reactions.users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <>
                  {(likesCategorySelected == item.type ||
                    likesCategorySelected == 'all') && (
                    <View style={styles.likeMainView}>
                      <View style={styles.likeView}>
                        <Image
                          source={Images.commentAvator}
                          style={styles.likeProfilePic}
                        />

                        <View>
                          <View style={styles.nameView}>
                            <Text style={styles.nameStyle}>
                              {item.user.name}
                            </Text>
                            <Image
                              source={item.type_image}
                              style={{width: 9, marginLeft: 5}}
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
      </View>
    </View>
  );
};
