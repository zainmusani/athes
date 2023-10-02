import React, {useRef, useState} from 'react';
import {StatusBar, View, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  TextInput,
  Button,
  UploadImage,
  RadioButton,
  Loader,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Images, Metrics} from '../../../theme';
import styles from './styles';
import _ from 'lodash';
import util from '../../../util';
import {uploadImageToServer} from '../../../helpers/ImageUploaderHelper';
import {useDispatch} from 'react-redux';
import {getGroupByIdRequest, updateGroupRequest} from '../../../actions/Group';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateGroup = props => {
  const {edit, data} = props;
  const [titleValue, setTitleValue] = useState(() => (edit ? data?.title : ''));
  const [detailsValue, setDetailsValue] = useState(() =>
    edit ? data?.description : '',
  );
  const [imageUri, setImageUri] = useState(() => (edit ? data?.image : ''));
  const [privacy, setPrivacy] = useState(() => (edit ? data?.privacy : 1));
  // const [groupHide, setGroupHide] = useState(() => edit ? data?.visibility : 1);
  const [errors, setErrors] = useState({
    name: null,
    details: null,
  });
  const title = useRef(null);
  const detailsRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // image upload
  const getSelectedImageUri = img => {
    // setImageUri(img.path);
    uploadImageToServer(img, setImageUri, setLoading).then(res => {});
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(titleValue)) {
      errors.name = util.isRequiredErrorMessage('Group title');
    }

    if (_.isEmpty(detailsValue)) {
      errors.details = util.isRequiredErrorMessage('Details');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (!_validateForm()) return;
    const payload = {
      title: titleValue,
      privacy: privacy,
      // visibility: groupHide,
      description: detailsValue,
      image: !_.isEmpty(imageUri)
        ? imageUri
        : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    };
    if (edit) {
      dispatch(
        updateGroupRequest({...payload, groupId: data.groupId}, (res, err) => {
          setLoading(true);
          if (res) {
            dispatch(
              getGroupByIdRequest(data.groupId.toString(), res => {
                setLoading(false);
                Actions.pop();
              }),
            );
          }
        }),
      );
    } else {
      Actions.invitePeopleScreen({
        isAddedGroupForm: true,
        isSkipButtonVisible: true,
        payload,
        edit: edit,
      });
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerTitle={edit ? strings.EDIT_GROUP : strings.CREATE_GROUP}
      hasBack>
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View>
            <TextInput
              placeholder="Enter Title"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Title"
              lableColor={'#FFF'}
              autoFocus
              ref={title}
              onSubmitEditing={() => {
                title.current.blur();
              }}
              containerStyle={AppStyles.mBottom10}
              value={titleValue}
              error={errors.name}
              onChangeText={value => {
                setTitleValue(value);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <Text
                color={Colors.white}
                style={{
                  ...AppStyles.mTop20,
                  ...AppStyles.mBottom15,
                  width: '100%',
                }}>
                Privacy
              </Text>
              <RadioButton
                buttonStyles={styles.radioButtonStyles}
                setPrivacy={setPrivacy}
                privacy={privacy}
                values={[
                  {
                    key: 1,
                    text: 'Public',
                    selected: true,
                  },
                  {
                    key: 0,
                    text: 'Private',
                    selected: false,
                  },
                ]}
              />
            </View>

            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text
              color={Colors.white}
              style={{
                ...AppStyles.mBottom15,
                width: '100%',
              }}>
              Hide Group
            </Text>
            <RadioButton
              buttonStyles={styles.radioButtonStyles}
              setPrivacy={setGroupHide}
              privacy={groupHide}
              values={[
                {
                  key: 1,
                  text: 'Visible',
                  selected: true,
                },
                {
                  key: 0,
                  text: 'Hidden',
                  selected: false,
                },
              ]}
            />
          </View> */}

            <TextInput
              placeholder="Type Here"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Details"
              lableColor={'#FFF'}
              ref={detailsRef}
              multiline
              onSubmitEditing={() => {
                detailsRef.current.blur();
              }}
              containerStyle={AppStyles.mBottom10}
              value={detailsValue}
              error={errors.details}
              onChangeText={value => {
                setDetailsValue(value);
              }}
            />

            <UploadImage
              isPhotoCamera
              postImages={!_.isEmpty(imageUri) ? [imageUri] : []}
              shouldReturnSelectedImageUri={true}
              getSelectedImageUri={getSelectedImageUri}
              shouldSelectMultipleImages={false}
              onlyOpenGallery={false}
              title={`Photo`}
              subTitle={`Add group image`}
            />
          </View>

          <Button
            background={Colors.white}
            onPress={() => _onSubmit()}
            icon="righArrowIcon"
            iconRight
            raised
            style={[
              AppStyles.mLeft30,
              AppStyles.mRight30,
              AppStyles.mBottom15,
              AppStyles.mTop15,
            ]}>
            {(edit ? `Update` : `Create`).toUpperCase()}
          </Button>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

CreateGroup.propTypes = {
  edit: PropTypes.bool.isRequired,
};
CreateGroup.defaultProps = {
  edit: false,
};

export default CreateGroup;
