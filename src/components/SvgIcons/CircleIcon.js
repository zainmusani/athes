import * as React from 'react';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={78} height={78} fill="none" {...props}>
    <Circle
      cx={props.width / 2 || 39}
      cy={props.height / 2 || 39}
      r={props.width / 2 || 39}
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={35.5}
        y1={14.5}
        x2={39}
        y2={78}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#343434" />
        <Stop offset={1} stopColor="#060505" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
