// @flow
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {Image, View} from 'react-native';
import {Button, ButtonView, Text, TextInput} from '..';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../theme';
import {getSportIntrestRequest} from '../../actions/UserActions';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import util from '../../util';

const SportsInterests = props => {
  const {
    selectedValue,
    setSelectedValue,
    error,
    label,
    data,
    sportInterests,
    time,
    ...rest
  } = props;
  const [selectedIds, setSelectedIds] = useState([]);
  const [addAnother, setAddAnother] = useState(false);
  
  const selectBoxRef = useRef(null);
  const dispatch = useDispatch(null);

  let SPORTSINTRESTDATA = useSelector(state => state.user.sportIntrests);

  if (data) {
    SPORTSINTRESTDATA = data;
  }

  useEffect(() => {
    if (!data) dispatch(getSportIntrestRequest(res => {}));
  }, []);

  const getSelectedIntrest = data => {
    setSelectedIds(data);

    let newData = SPORTSINTRESTDATA.filter(res => {
      if (data.includes(res.id)) {
        return res;
      }
    });

    setSelectedValue(newData);
  };

  const removeSelectedInterest = id => {
    const values = selectedValue.filter(res => res.id != id);
    const ids = selectedIds.filter(res => res != id);
    setSelectedIds(ids);
    setSelectedValue(values);
  };

  return (
    <>
      <View style={AppStyles.mTop15}>
        <TextInput
          placeholder={
            !selectedValue || selectedValue.length === 0
              ? 'Search Here'
              : `${selectedValue.length} selected`
          }
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label={label}
          lableColor={'#FFF'}
          ref={selectBoxRef}
          containerStyle={AppStyles.mBottom10}
          error={error}
          onChangeText={value => {
            setSportInterestValue(value);
          }}
          editable={false}
          caretHidden={true}
        />
        <Button
          style={styles.hiddenTap}
          background="transparent"
          onPress={() => {
            let payload = {
              array: SPORTSINTRESTDATA,
              selected: selectedIds,
              getSelectedIntrest,
              addMore: sportInterests,
              addAnother,
              setAddAnother,
              ...props,
            };
            addAnother
              ? Actions.addMoreInputs(payload)
              : Actions.searchfilter(payload);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          ...AppStyles.mBottom15,
          paddingHorizontal: 10,
        }}>
        {(!selectedValue || !!selectedValue.length) &&
          selectedValue.map(res => {
            return (
              <View style={styles.selectedItem}>
                <ButtonView
                  style={{
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: -10,
                    top: -10,
                  }}
                  onPress={() => removeSelectedInterest(res.id)}>
                  <Image
                    source={Images.cancel}
                    style={{tintColor: Colors.white}}
                  />
                </ButtonView>
                <Text color={Colors.black}>
                  {time ? util.convertTimeInto12(res?.title) : res?.title}
                </Text>
              </View>
            );
          })}
      </View>
    </>
  );
};

SportsInterests.propTypes = {
  error: PropTypes.array,
  selectedValue: PropTypes.array,
  setSelectedValue: PropTypes.func,
  sportInterests: PropTypes.bool,
  time: PropTypes.bool,
};

SportsInterests.defaultProps = {
  error: {},
  selectedValue: [],
  setSelectedValue: () => {},
  sportInterests: false,
  time: false,
};
export default SportsInterests;
