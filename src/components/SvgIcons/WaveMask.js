import * as React from 'react';
import Svg, {Mask, Rect} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={1000}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="Mask"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={1000}
      height={45}>
      <Rect
        x="0"
        y="0"
        width={1000}
        height={45}
        fill={props.fill || 'yellow'}
      />
    </Mask>
  </Svg>
);

export default SvgComponent;
