import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SearchFilterView from './SearchFilterView';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';

function SearchFilterController(props) {
  const {selected, clearValues} = props;
  const [searchList, setSearchList] = useState(props.array);
  const [selectedIDs, setSelectedIDs] = useState(selected ? selected : []);

  const handleActiveSearchFilter = () => {};

  useEffect(() => {
    if (clearValues) {
      setSelectedIDs([]);
    }
  }, []);

  const setList = (id, title = '') => {
    if (selectedIDs.includes(id)) {
      setSelectedIDs(selectedIDs.filter(item => item !== id));
      if (!_.isEmpty(title) && title == 'ALL SPORTS') {
        setSelectedIDs([]);
      }
    } else {
      setSelectedIDs(oldArray => [...oldArray, id]);
      if (!_.isEmpty(title) && title == 'ALL SPORTS') {
        let list = _.cloneDeep(searchList);
        let tmpSelected = list.map(o => o?.id);
        setSelectedIDs(tmpSelected);
      }
    }
  };

  const _onSubmit = data => {
    props.getSelectedIntrest(data);

    Actions.pop();
  };

  return (
    <SearchFilterView
      {...props}
      setList={setList}
      _onSubmit={_onSubmit}
      searchList={searchList}
      selectedIDs={selectedIDs}
      setSelectedIDs={setSelectedIDs}
      setSearchList={setSearchList}
    />
  );
}

SearchFilterController.propTypes = {
  selected: PropTypes.array,
};
SearchFilterController.defaultProps = {
  selected: [],
};

const mapStateToProps = ({general}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SearchFilterController);
