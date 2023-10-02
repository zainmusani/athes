import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, TouchableNativeFeedback, View } from "react-native";
import util from '../../util';

export default class ButtonView extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    children: PropTypes.node,
    rippleOnAndroid: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    rippleOnAndroid: false,
  };

  pressed = false;

  onPress = (...args) => {
    if (this.pressed) return;
    this.pressed = true;
    setTimeout(() => {
      this.pressed = false;
    }, 1000);

    this.props.onPress && this.props.onPress(...args);
  };

  render() {
    const {style, children, rippleOnAndroid, ...rest} = this.props;

    if (util.isPlatformAndroid() && rippleOnAndroid) {
      return (
        <TouchableNativeFeedback {...rest} onPress={this.onPress}>
          <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        style={style}
        activeOpacity={0.7}
        {...rest}
        onPress={this.onPress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
