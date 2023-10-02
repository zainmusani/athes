import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

import {connect, useDispatch, useSelector} from 'react-redux';

import {Loader, Post, ScreenWrapper} from '../../components';
import {Colors, Images} from '../../theme';
import {
  getPostReactionsRequest,
  getSinglePostByIdRequest,
} from '../../actions/PostActions';
import util from '../../util';
import {manipulatePostListData} from '../../helpers/PostListHelper';
import {getCommentRequest} from '../../actions/commentAction';

const SinglePostView = props => {
  const {id, isComment, isReact, Userdata} = props;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(() => true);
  const dispatch = useDispatch();
  useEffect(() => {
    const params = `${id}`;
    dispatch(
      getSinglePostByIdRequest(params, res => {
        if (!util.isEmptyObject(res)) {
          setData(res);
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }),
    );
    dispatch(getCommentRequest({post_id: id}, res => {}));
    dispatch(getPostReactionsRequest({postId: id}, (res, err) => {}));
  }, []);

  const postData = manipulatePostListData(data);
  return (
    <ScreenWrapper pageBackground={Colors.black} hasBack>
      <View style={styles.PostView}>
        {!loading ? (
          <Post
            key={0}
            isComment={isComment}
            isReact={isReact}
            //   handleActionsOfPost={handleActionsOfPost}
            data={postData[0]}
            isProfileView={Userdata?.id == data?.userId}
          />
        ) : (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <ActivityIndicator size={'small'} color={Colors.white} style={{marginBottom: 30}} />
            </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const mapStateToProps = ({user}) => ({
  Userdata: user.data,
});
const actions = {};
export default connect(mapStateToProps, actions)(SinglePostView);
