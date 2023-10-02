import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {reportPostRequest} from '../../actions/PostActions';
import {
  Button,
  Loader,
  ModalView,
  RadioButton,
  ScreenWrapper,
  Text,
  TextInput,
} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts} from '../../theme';
import styles from './styles';

const Report = props => {
  const {post_id} = props;
  const [option, setOption] = useState(() => 'nudity');
  const [messageValue, setMessageValue] = useState(() => '');
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const message = useRef(null);

  const _onSubmit = () => {
    setLoading(true);
    let payload = {
      reason: option,
      description: messageValue,
      postId: post_id,
    };
    dispatch(
      reportPostRequest(payload, res => {
        if (res) {
          setTimeout(() => {
            setModalVisible(true);
          }, 800);
        }
        setLoading(false);
      }),
    );
  };

  const {} = props;
  return (
    <>
      <ScreenWrapper
        pageBackground={Colors.black}
        hasBack
        headerTitle={`Report`}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={AppStyles.alignItemsCenter}>
          <Text
            style={styles.heading}
            color={Colors.white}
            type={Fonts.type.medium}
            size={24}
            bold="500">
            Reporting a Problem
          </Text>
          <View>
            <View style={{...AppStyles.mTop30}}>
              <RadioButton
                buttonStyles={styles.radioButtonStyles}
                privacy={option}
                setPrivacy={setOption}
                values={[
                  {
                    key: 'nudity',
                    text: 'Nudity',
                    selected: false,
                  },
                  {
                    key: 'violence',
                    text: 'Violence',
                    selected: false,
                  },
                  {
                    key: 'harassment',
                    text: 'Harassment',
                    selected: false,
                  },
                  {
                    key: 'false-information',
                    text: 'False Information',
                    selected: false,
                  },
                  {
                    key: 'other',
                    text: 'Other',
                    selected: true,
                  },
                ]}
              />
            </View>
            <TextInput
              customStyle={styles.textArea}
              multiline={true}
              numberOfLines={8}
              placeholder="Your Message"
              placeholderTextColor={Colors.grey4}
              textAlignVertical="top"
              ref={message}
              value={messageValue}
              onChangeText={value => {
                setMessageValue(value);
              }}
            />
          </View>

          <Button
            background={Colors.white}
            disabled={false}
            icon="righArrowIcon"
            iconRight
            raised
            onPress={() => {
              _onSubmit();
            }}
            style={[AppStyles.mTop25]}>
            {strings.CONTINUE}
          </Button>
        </KeyboardAwareScrollView>
        <Loader loading={loading} />
      </ScreenWrapper>
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={() => Actions.pop()}
        heading={'Reported successfully'}
        buttonText={'Done'}
        isProfileView
      />
    </>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Report);
