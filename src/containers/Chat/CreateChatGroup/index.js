import _ from 'lodash';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwitchToggle from 'react-native-switch-toggle';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {Button, ScreenWrapper, TextInput} from '../../../components';
import {EMIT_TO_SERVER_TYPES, strings, UserRoles} from '../../../constants';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';
import DataHandler from '../../../services/DataHandler';
import {createNewChatGroupRequest} from '../../../actions/ChatActions';
import {emitToServer} from '../../../helpers/chatHelper';

const CreateChatGroup = props => {
  const {user_role, selectedPeopleIds} = props;
  const [groupNameValue, setGroupNameValue] = useState(() => '');
  const [shouldDisableChat, setShouldDisableChat] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const dispatch = useDispatch();

  const onCreateButtonPressHandler = () => {
    const {id} = DataHandler.getStore().getState().user?.data;

    setIsSendingDataToServer(true);
    const payload = {
      user_id: id,
      user_ids: util.getIdsFromArray(selectedPeopleIds),
      title: groupNameValue,
      disable_chat_for_all_members: shouldDisableChat,
      is_group: true,
    };
    dispatch(
      createNewChatGroupRequest(payload, (status, res) => {
        const {roomID} = res;
        if (status) {
          const payload = {
            id: id,
            room_id: roomID,
          };
          emitToServer(EMIT_TO_SERVER_TYPES.ROOM_CREATED, payload);
          Actions.popTo('chat');
        }
        setTimeout(() => {
          setIsSendingDataToServer(false);
        }, 500);
      }),
    );
  };

  const renderEnterGroupNameSec = () => (
    <TextInput
      placeholder="Enter Group Name"
      placeholderTextColor={Colors.grey4}
      returnKeyType="next"
      autoCapitalize="none"
      underlineColorAndroid="#f000"
      label="Title"
      autoFocus
      containerStyle={AppStyles.mBottom20}
      onSubmitEditing={() => {}}
      value={groupNameValue}
      onChangeText={value => {
        setGroupNameValue(value);
      }}
      selectionColor={Colors.grey2}
    />
  );

  const renderCreateButton = () => (
    <Button
      background={Colors.white}
      onPress={onCreateButtonPressHandler}
      icon="righArrowIcon"
      iconRight
      disabled={util.isEmptyValue(groupNameValue)}
      raised
      isLoading={isSendingDataToServer}
      style={styles.createBtnStyle}>
      {strings.CREATE.toUpperCase()}
    </Button>
  );

  const renderToggleSection = () => {
    return (
      <View style={AppStyles.flexRow}>
        <SwitchToggle
          switchOn={shouldDisableChat}
          onPress={() => setShouldDisableChat(!shouldDisableChat)}
          containerStyle={styles.toggleBtnCont}
          circleStyle={styles.toggleInnerCircle}
          circleColorOff={Colors.presetColors.primary[0]}
          circleColorOn={Colors.white}
          backgroundColorOn={Colors.presetColors.primary[0]}
          backgroundColorOff={Colors.white}
        />
        <Text style={styles.disableGroupChatTextStyle}>
          {strings.DISABLE_CHAT_FOR_ALL_GROUP_MEMBERS}
        </Text>
      </View>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnPress={() => Actions.pop()}
      hasBack
      headerTitle={strings.NEW_GROUP}>
      <View style={styles.container}>
        {renderEnterGroupNameSec()}
        {/* todo */}
        {/* {user_role === UserRoles.team && renderToggleSection()} */}
        {renderToggleSection()}
        {renderCreateButton()}
      </View>
    </ScreenWrapper>
  );
};

CreateChatGroup.propTypes = {
  selectedPeopleIds: PropTypes.array.isRequired,
  user_role: PropTypes.string.isRequired,
};
CreateChatGroup.defaultProps = {};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});
export default connect(mapStateToProps, null)(CreateChatGroup);
