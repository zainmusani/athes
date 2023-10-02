// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {Button, Text} from '..';
import styles from './styles';
import calendarStyles from '../../containers/Calendar/CalendarStyles';
import Modal from 'react-native-modal';
import _ from 'lodash';
import ButtonView from '../ButtonView';
import {AppStyles, Colors, Fonts} from '../../theme';

export default class ModalView extends React.Component {
  static propTypes = {
    isModalVisible: PropTypes.bool,
    setModalVisible: PropTypes.func,
    deleteConfirmHandler: PropTypes.func,
    heading: PropTypes.string,
    description: PropTypes.string,
    buttonText: PropTypes.string,
    modalButtonPress: PropTypes.func,
    isProfileView: PropTypes.bool,
    isCommentModal: PropTypes.bool,
  };
  static defaultProps = {
    isModalVisible: false,
    setModalVisible: () => {},
    deleteConfirmHandler: () => {},
    heading: '',
    description: '',
    buttonText: '',
    modalButtonPress: () => {},
    isProfileView: false,
    isConfirmModal: false,
  };

  render() {
    const {
      isModalVisible,
      setModalVisible,
      image,
      heading,
      description,
      buttonText,
      modalButtonPress,
      isProfileView,
      isConfirmModal,
      deleteConfirmHandler,
      children,
    } = this.props;

    return (
      <Modal isVisible={isModalVisible}>
        <View
          style={[
            styles.modalView,
            isProfileView && {paddingHorizontal: 20, paddingVertical: 20},
          ]}>
          {image !== '' && <Image source={image} />}
          {heading !== '' && <Text style={styles.modalHeading}>{heading}</Text>}
          {description !== '' && (
            <Text style={styles.modalDescription}>{description}</Text>
          )}
          {!_.isEmpty(buttonText) && !isConfirmModal && (
            <Button
              hasLinear
              color="#FFF"
              icon="righArrowIcon"
              iconRight
              onPress={() => {
                setModalVisible(false);
                modalButtonPress(true);
              }}
              raised
              style={{
                marginTop: 60,
              }}>
              {/* {buttonText.toUpperCase() + '   '} */}
              <Text color="#FFF" size={Fonts.size.xSmall}>
                {buttonText.toUpperCase()}
              </Text>
              <Text>{'   '}</Text>
            </Button>
          )}

          {isConfirmModal && (
            <View
              style={[
                calendarStyles.RBSheetMainView3,
                {backgroundColor: 'transparent'},
              ]}>
              <ButtonView
                style={calendarStyles.cancelButtonView}
                onPress={() => setModalVisible(false)}>
                <Text style={calendarStyles.cancelButtonText}>Cancel</Text>
              </ButtonView>
              <View
                style={[AppStyles.flex, {backgroundColor: Colors.transparent}]}>
                <Button
                  hasLinear
                  color={Colors.white}
                  onPress={() => deleteConfirmHandler()}
                  raised
                  style={{paddingVertical: 5}}>
                  {buttonText}
                </Button>
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  }
}
