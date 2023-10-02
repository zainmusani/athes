import React, {useEffect, useState} from 'react';
import SingalPostView from './SingalPostView';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {likeArray} from '../../constants';

const SingalPostController = props => {
  const [showLike, setShowLike] = useState(() => false);

  return (
    <SingalPostView
      showLike={showLike}
      setShowLike={setShowLike}
      likeArray={likeArray}
      {...props}
    />
  );
};

SingalPostController.propTypes = {
  handleActionsOfPost: PropTypes.func,
  isPendingView: PropTypes.bool,
  isDeletedView: PropTypes.bool,
  handlePendingRequestButtons: PropTypes.func,
  isProfileView: PropTypes.bool,
};

SingalPostController.defaultProps = {
  handleActionsOfPost: () => {},
  isPendingView: false,
  isDeletedView: false,
  handlePendingRequestButtons: () => {},
  isProfileView: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(SingalPostController);
