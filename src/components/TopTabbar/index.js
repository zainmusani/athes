// @flow
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import _ from 'lodash';
import {Text, ButtonView} from '../../components';
import styles from './styles';
import {setSelectedTab} from '../../actions/GeneralActions';
import {connect} from 'react-redux';

const TopTabbar = props => {
  const {array, tabs, setTabs} = props;

  return (
    <View style={styles.approvalTabsMainView}>
      {array.map(item => {
        const abc = array.length > 3;

        return (
          <ButtonView
            style={
              tabs === item.id
                ? abc
                  ? styles.approvalTabsViewSelectedMoreTabs
                  : styles.approvalTabsViewSelected
                : abc
                ? styles.approvalTabsViewMoreTabs
                : styles.approvalTabsView
            }
            onPress={() => setTabs(item.id)}>
            <Text style={styles.approvalTabsText}>{item.status}</Text>
          </ButtonView>
        );
      })}
    </View>
  );
};

TopTabbar.propTypes = {
  array: PropTypes.array.isRequired,
  tabs: PropTypes.number.isRequired,
  setTabs: PropTypes.func.isRequired,
};
TopTabbar.defaultProps = {};

const mapStateToProps = ({}) => ({});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(TopTabbar);
