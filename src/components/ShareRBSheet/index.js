import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect, useDispatch} from 'react-redux';
import {TextInput, ButtonView, Text} from '../';
import {
  addPostRequest,
  getOwnPostsListRequest,
  getWallPostsListRequest,
} from '../../actions/PostActions';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import Button from '../Button';
import Loader from '../Loader';
import Post from '../Post';
import styles from './styles';

const ShareRBSheetController = props => {
  const {showShareSheet, setShowShareSheet, post} = props;

  const [loading, setLoading] = useState(false);
  const [shareTextValue, setShareTextValue] = useState('');
  const dispatch = useDispatch();
  const shareSheetRef = useRef(null);
  const shareTextRef = useRef(null);

  useEffect(() => {
    if (showShareSheet) {
      shareSheetRef.current.open();
    }
  });

  const sharePost = () => {
    setLoading(true);
    const payload = {
      post_text: !_.isEmpty(shareTextValue) ? shareTextValue : ' ',
      media_urls: [],
      parent_id: post.id,
    };

    dispatch(
      addPostRequest(payload, res => {
        setLoading(false);
        if (res) {
          dispatch(getWallPostsListRequest({limit: 10, offset: 0}, res => {}));
          if (shareSheetRef) {
            shareSheetRef.current?.close();
          }
          setShowShareSheet(false);
        }
      }),
    );
  };

  return (
    <RBSheet
      ref={shareSheetRef}
      height={Metrics.screenHeight / 1.5}
      openDuration={250}
      closeOnPressMask={true}
      onClose={() => setShowShareSheet(false)}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: styles.commentContainer,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            ...AppStyles.pTop20,
          }}>
          <Text size={Fonts.size.medium} type={Fonts.type.medium} bold="600">
            Share Post
          </Text>
          <ButtonView
            style={styles.commentClose}
            onPress={() => {
              setShowShareSheet(false);
              if (shareSheetRef) {
                shareSheetRef.current?.close();
              }
            }}>
            <Image source={Images.close} />
          </ButtonView>
        </View>
        <View style={AppStyles.paddingHorizontalBase}>
          <TextInput
            placeholder="Say something about this.."
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            ref={shareTextRef}
            multiline
            onSubmitEditing={() => {
              shareTextRef.current.blur();
            }}
            containerStyle={{...AppStyles.mBottom10, ...AppStyles.mTop30}}
            value={shareTextValue}
            onChangeText={value => {
              setShareTextValue(value);
            }}
            selectionColor={Colors.selectionColor}
            customStyle={{
              fontSize: Fonts.size.xxSmall,
              flexGrow: 1,
              color: Colors.black,
              height: 100,
              paddingTop: 10,
              paddingBottom: 10,
              textAlignVertical: 'top',
            }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={AppStyles.paddingHorizontalBase}>
            <Text
              size={Fonts.size.normal}
              type={Fonts.type.medium}
              bold="500"
              style={{...AppStyles.mTop10}}>
              Post Detail
            </Text>
          </View>
          <Post data={post} isDeletedView />
        </ScrollView>
        <View
          style={{
            ...AppStyles.paddingHorizontalBase,
            height: 0,
          }}>
          <Button
            hasLinear
            color={Colors.white}
            raised
            style={{marginTop: -90}}
            onPress={sharePost}>
            {strings.SHARE}
          </Button>
        </View>
        <Loader loading={loading} />
      </View>
    </RBSheet>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ShareRBSheetController);
