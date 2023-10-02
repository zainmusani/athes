// @flow
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput, ActivityIndicator} from 'react-native';
import {ScreenWrapper, Text, Button, ButtonView} from '../';
import {Images, Colors, AppStyles, Metrics} from '../../theme';
import styles from './styles';
import TagInput from 'react-native-tags-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';

const AddMoreInputs = props => {
  const {
    selectedValue,
    setSelectedValue,
    setAddAnother,
    setSelectedIDs,
    clearValues,
  } = props;

  const [tags, setTags] = useState({
    tag: '',
    tagsArray: [],
  });

  useEffect(() => {
    if (clearValues) {
      setSelectedValue([]);
    }
  }, []);

  useEffect(() => {
    if (!clearValues) {
      let getValues = [];

      selectedValue.forEach(res => getValues.push(res.title));

      setTags({
        tag: '',
        tagsArray: getValues,
      });
    }
  }, [selectedValue]);

  const submit = () => {
    let selectedData = [];
    tags.tagsArray.forEach((res, idx) => {
      selectedData.push({
        id: 999 * (idx + 1),
        title: res,
      });
    });
    setSelectedValue(selectedData);
    setAddAnother(true);
    Actions.pop();
  };

  return (
    <ScreenWrapper headerTitle={`Add More`} pageBackground={Colors.black}>
      <View style={styles.container}>
        <ButtonView
          onPress={() => {
            setSelectedValue([]);
            setTimeout(() => {
              Actions.replace('searchfilter', {
                clearValues: true,
                ...props,
              });
            }, 100);
          }}
          style={{
            padding: 10,
            borderRadius: 7,
            backgroundColor: Colors.white,
            position: 'absolute',
            right: 10,
            top: -40,
          }}>
          <Text color={Colors.black}>Search</Text>
        </ButtonView>

        <TagInput
          allowFontScaling={false}
          updateState={state => {
            setTags(state);
          }}
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
        />
        <Button
          onPress={() => submit()}
          icon="righArrowIcon"
          iconRight
          raised
          style={{
            ...AppStyles.mTop25,
            ...AppStyles.mLeft30,
            ...AppStyles.mRight30,
            ...AppStyles.mBottom40,
          }}>
          {strings.DONE.toUpperCase()}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

AddMoreInputs.propTypes = {
  background: PropTypes.string,
};

AddMoreInputs.defaultProps = {
  background: Colors.white,
};

export default AddMoreInputs;
