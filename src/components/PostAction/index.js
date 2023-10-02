// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {Text} from '../';
import {AppStyles} from '../../theme';
import styles from './styles';

const PostAction = props => {
  const {actionsOfPost} = props;
  return (
    <View style={styles.actionPostMainView}>
      <View style={styles.actionPostView}>
        <Image
          source={actionsOfPost.icon}
          style={{width: 20}}
          resizeMode="contain"
        />

        <View style={AppStyles.mLeft15}>
          <Text style={styles.actionPostHeading}>{actionsOfPost.name}</Text>
          {!!actionsOfPost.description && (
            <Text style={styles.actionPostDescription}>
              {actionsOfPost?.description}
            </Text>
          )}
        </View>
      </View>

      {/* <ButtonView
                    style={styles.undoButtonView}
                    onPress={() => setActionsOfPost({})}>
                    <Text style={styles.undoButton}>Undo</Text>
                  </ButtonView> */}
    </View>
  );
};
PostAction.propTypes = {
  actionsOfPost: PropTypes.object,
};

PostAction.defaultProps = {
  actionsOfPost: {},
};

export default PostAction;
