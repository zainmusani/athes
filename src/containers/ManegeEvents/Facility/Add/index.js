import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {
  Button,
  ButtonView,
  EventTemplate,
  Loader,
  ScreenWrapper,
  SelectBox,
  Text,
  TextInput,
  UploadImage,
} from '../../../../components';
import {options, services, strings} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../../theme';
import util from '../../../../util';
import styles from './styles';
import _ from 'lodash';
import TagInput from 'react-native-tags-input';
import {uploadImageToServer} from '../../../../helpers/ImageUploaderHelper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFacilityRequest,
  getFacilityByIdRequest,
  getOwnFacilitiesRequest,
  updateFacilityRequest,
} from '../../../../actions/Facility';

const AddFacility = props => {
  const {edit, facilityId} = props;
  const {ownFacility} = useSelector(state => state.facility);

  const [titleValue, setTitleValue] = useState(() =>
    edit ? ownFacility?.title : '',
  );

  const [serviceValue, setServiceValue] = useState(() =>
    edit ? ownFacility?.service : '',
  );

  const [venueValue, setVenueValue] = useState(() =>
    edit ? ownFacility?.serviceDescription : '',
  );

  const [otherValue, setOtherValue] = useState(() =>
    edit ? ownFacility?.serviceDescription : '',
  );

  const [loading, setLoading] = useState(false);

  const [chargesValue, setChargesValue] = useState(() =>
    edit ? ownFacility?.charges.toString() : '',
  );

  const [detailValue, setDetailValue] = useState(() =>
    edit ? ownFacility?.description : '',
  );
  //
  const [isImageUpload, setIsImageUpload] = useState(false);

  const [imageUri, setImageUri] = useState(edit ? ownFacility?.image : '');

  const [disabledTags, setDisabledTags] = useState(false);

  const [tags, setTags] = useState({
    tag: '',
    tagsArray: edit ? ownFacility?.tags : [],
  });

  const [errors, setErrors] = useState({
    title: null,
    service: null,
    venue: null,
    others: null,
    charges: null,
    detail: null,
  });

  const titleRef = useRef(null);
  const serviceRef = useRef(null);
  const chargesRef = useRef(null);
  const detailRef = useRef(null);
  const venueRef = useRef(null);
  const otherRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tags.tagsArray.length >= 10) {
      setDisabledTags(true);
    } else {
      setDisabledTags(false);
    }
  }, [tags]);

  // validation
  const validateForm = () => {
    const errors = {};

    if (_.isEmpty(titleValue)) {
      // title is required
      errors.title = util.isRequiredErrorMessage('Title');
    }

    if (_.isEmpty(serviceValue)) {
      // Detail is required
      errors.service = util.isRequiredErrorMessage('Service');
    }

    if (!_.isNull(venueRef.current) && _.isEmpty(venueValue)) {
      // Detail is required
      errors.venue = util.isRequiredErrorMessage('Venue');
    }

    if (!_.isNull(otherRef.current) && _.isEmpty(otherValue)) {
      // Detail is required
      errors.others = util.isRequiredErrorMessage('Service Detail');
    }

    if (_.isEmpty(chargesValue)) {
      // charges is required
      errors.charges = util.isRequiredErrorMessage('Charge');
    }
    // else if (!util.isNumber(chargesValue)) {
    //   // invalid Charge
    //   errors.charges = util.isRequiredErrorMessage('Invalid Charges');
    // }

    if (_.isEmpty(detailValue)) {
      // Detail is required
      errors.detail = util.isRequiredErrorMessage('Detail');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    const payload = {
      title: titleValue,
      service: serviceValue,
      charges: +chargesValue,
      description: detailValue,
      serviceDescription: serviceValue === 'venue' ? venueValue : otherValue,
      image: !_.isEmpty(imageUri)
        ? imageUri
        : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      tags: tags.tagsArray,
    };
    if (edit) {
      dispatch(
        updateFacilityRequest(
          {...payload, facilityServiceId: facilityId},
          (res, err) => {
            setLoading(true);
            if (res) {
              dispatch(
                getFacilityByIdRequest(facilityId.toString(), res => {
                  if (res) {
                    setLoading(false);
                    Actions.pop();
                  }
                }),
              );
            }
          },
        ),
      );
    } else {
      dispatch(
        addFacilityRequest(payload, (res, err) => {
          setLoading(true);
          if (res) {
            setLoading(false);
            dispatch(
              getOwnFacilitiesRequest(
                {limit: 300, offset: 0},
                (res, err) => {},
              ),
            );
            Actions.replace('managementTab');
          }
        }),
      );
    }
  };

  // image upload
  const getSelectedImageUri = img => {
    // setImageUri(img.path);
    uploadImageToServer(img, setImageUri, setLoading).then(res => {});
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={edit ? 'Edit Facility' : strings.ADD_FACILITIES}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Title"
            lableColor={'#FFF'}
            autoFocus
            ref={titleRef}
            onSubmitEditing={() => {
              //   venueRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            value={titleValue}
            error={errors.title}
            onChangeText={value => {
              setTitleValue(value);
            }}
          />

          <SelectBox
            array={services}
            label="Service"
            icon={Images.downIconBlack}
            isRightIcon
            ref={serviceRef}
            setData={setServiceValue}
            value={serviceValue}
            error={errors.service}
            onChangeText={value => {
              setServiceValue(value);
            }}
          />
          {serviceValue == 'venue' && (
            <TextInput
              placeholder="Enter Venue"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Venue"
              lableColor={'#FFF'}
              ref={venueRef}
              onSubmitEditing={() => {
                chargesRef.current.focus();
              }}
              containerStyle={AppStyles.mBottom10}
              value={venueValue}
              error={errors.venue}
              onChangeText={value => {
                setVenueValue(value);
              }}
            />
          )}
          {serviceValue == 'others' && (
            <TextInput
              placeholder="Enter Detail"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Service Detail"
              lableColor={'#FFF'}
              ref={otherRef}
              onSubmitEditing={() => {
                chargesRef.current.focus();
              }}
              containerStyle={AppStyles.mBottom10}
              value={otherValue}
              error={errors.others}
              onChangeText={value => {
                setOtherValue(value);
              }}
            />
          )}

          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            keyboardType="numeric"
            underlineColorAndroid="#f000"
            label="Charges"
            lableColor={'#FFF'}
            ref={chargesRef}
            icon={{
              url: Images.dollarIcon,
              width: 8,
              height: 15,
            }}
            iconStyles={{marginRight: -30, marginTop: 2}}
            onSubmitEditing={() => {
              // venueRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            value={chargesValue}
            error={errors.charges}
            onChangeText={value => {
              util.validNumber.test(value)
                ? setChargesValue(value)
                : setChargesValue('');
            }}
          />

          <TagInput
            allowFontScaling={false}
            updateState={state => setTags(state)}
            tags={tags}
            placeholder="Tags..."
            label="Keywords:"
            labelStyle={{
              color: Colors.white,
              marginBottom: 10,
              width: '100%',
              padding: 0,
            }}
            leftElement={
              <Icon
                name={'ios-pricetags-outline'}
                color={Colors.grey4}
                size={24}
              />
            }
            leftElementContainerStyle={{marginLeft: 0}}
            containerStyle={{
              paddingHorizontal: 0,
              width: Metrics.screenWidth,
            }}
            inputContainerStyle={{
              borderBottomColor: Colors.grey1,
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              height: 45,
              justifyContent: 'center',
            }}
            inputStyle={{color: Colors.white}}
            autoCorrect={false}
            tagStyle={{
              backgroundColor: Colors.white,
              borderColor: Colors.white,
            }}
            tagTextStyle={{
              color: Colors.black,
              fontSize: 12,
            }}
            disabled={disabledTags}
          />

          <TextInput
            placeholder="Write"
            placeholderTextColor={Colors.grey4}
            multiline
            label="Details"
            lableColor={'#FFF'}
            numberOfLines={10}
            // customStyle={styles.detailStyle}
            ref={detailRef}
            value={detailValue}
            error={errors.detail}
            onChangeText={value => {
              setDetailValue(value);
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
            subTitle={`Upload Facility Photo Here`}
          />

          <Button
            background={Colors.white}
            icon="righArrowIcon"
            onPress={() => onSubmit()}
            iconRight
            raised
            style={[
              AppStyles.mLeft30,
              AppStyles.mRight30,
              AppStyles.mBottom20,
              AppStyles.mTop15,
            ]}>
            {edit ? 'Update'.toUpperCase() : 'Create'.toUpperCase()}
          </Button>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default AddFacility;
