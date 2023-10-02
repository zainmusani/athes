import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={36}
    height={36}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M0 18A18 18 0 1 0 18 0 18.02 18.02 0 0 0 0 18Zm21.802-8.56 5.38 5.379a4.501 4.501 0 0 1 0 6.364l-5.38 5.378-.037.035a1.498 1.498 0 0 1-2.47-.51 1.501 1.501 0 0 1 .386-1.646l4.94-4.94L9 19.51a1.5 1.5 0 1 1 0-3l15.62-.01-4.939-4.94a1.501 1.501 0 0 1 1.056-2.578 1.5 1.5 0 0 1 1.066.458Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
