import React, { useState, useEffect } from 'react';
import { View, Image, Share, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Text, ScreenWrapper } from '../../../components';
import { AppStyles, Colors, Fonts, Images } from '../../../theme';
import styles from './styles';
import { addChildRequest } from '../../../actions/ParentActions';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import { strings, UserRoles } from '../../../constants';
import { useDispatch } from 'react-redux';
import { uploadImageToServer } from '../../../helpers/ImageUploaderHelper';
import util from '../../../util';

const allSteps = [
  { step: 1, component: Step1, text: 'Basic' },
  { step: 2, component: Step2, text: 'Creds' },
  { step: 3, component: Step3, text: 'Share' },
];

const AddAthlete = props => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(allSteps.length);

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errors, setErrors] = useState({});
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const dispatch = useDispatch();

  const onSubmit = data => {
    // console.log(data);
  };

  const getSelectedStep = () => {
    const Step = allSteps[currentStep - 1].component;
    return (
      <Step
        fullName={fullName}
        setFullName={setFullName}
        dob={dob}
        setDob={setDob}
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        errors={errors}
        setErrors={setErrors}
        isImageUpload={isImageUpload}
        setIsImageUpload={setIsImageUpload}
        isDatePickerVisible={isDatePickerVisible}
        setIsDatePickerVisible={setIsDatePickerVisible}
        imageUri={imageUri}
        setImageUri={setImageUri}
        setImageData={setImageData}
        imageData={imageData}
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        onNext={onNext}
        onBack={onBack}
        onFinish={finish}
        onShare={onShare}
        onSubmit={onSubmit}
        loading={loading}
        setLoading={setLoading}
        imgLoading={imgLoading}
        setImgLoading={setImgLoading}
        privacy={privacy}
        setPrivacy={setPrivacy}
      />
    );
  };

  const onNext = () => {
    if (currentStep == 2) {
      let date = util.getFormattedDateTime(dob, 'YYYYMMDD');
      let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);

      setLoading(true);
      const payload = {
        fullname: fullName,
        photo: imageUri,
        dob: date,
        username: userName,
        password: password,
        sportIntrests: selectedInterest,
        privacy: privacy,
      };

      if (imageData) {
        uploadImageToServer(imageData, setImageUri, setImgLoading)
          .then(res => {
            if (res) {
              payload.photo = res;
              dispatch(
                addChildRequest(payload, res => {
                  setLoading(false);
                  if (res) {
                    if (currentStep !== totalSteps) {
                      setCurrentStep(currentStep + 1);
                    }
                  }
                }),
              );
            }
          })
          .catch(err => {
            util.topAlert('Somthing went wrong into save Data.', 'error');
            setLoading(false);
          });
      } else {
        dispatch(
          addChildRequest(payload, res => {
            setLoading(false);
            if (res) {
              if (currentStep !== totalSteps) {
                setCurrentStep(currentStep + 1);
              }
            }
          }),
        );
      }
    } else {
      if (currentStep !== totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }

    // next();
  };

  const onBack = value => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
    // back();
  };

  const finish = state => {
    Actions.replace('managementTab', {athleteAdded: new Date()});
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Link: https://google.com \n Name: ${fullName}  \n Username: ${userName} \n Password: ${password}`,
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerbackground={Colors.graybrown}
      hasBack
      headerTitle={strings.AddAthlete}>
      <StatusBar backgroundColor={Colors.graybrown} barStyle="light-content" />

      <View style={styles.mainBg}>
        <View style={styles.stepsHeader}>
          {allSteps.map((res, idx) => {
            return (
              <View style={styles.stepsBtn} key={idx}>
                <View
                  style={[
                    styles.stepCount,
                    currentStep == res.step
                      ? { backgroundColor: Colors.black }
                      : currentStep >= res.step
                        ? { backgroundColor: Colors.black1 }
                        : { backgroundColor: 'transparent' },
                  ]}>
                  {currentStep <= res.step ? (
                    <Text
                      color={
                        currentStep >= res.step ? Colors.white : Colors.grey
                      }>
                      {res.step}
                    </Text>
                  ) : (
                    <Image source={Images.check} style={{ tintColor: '#FFF' }} />
                  )}
                </View>
                <Text style={styles.stepText}>{res.text}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.container}>{getSelectedStep()}</View>
      </View>
    </ScreenWrapper>
  );
};

export default AddAthlete;
