import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M17.561 10.561 16.121 12l1.44 1.439a1.5 1.5 0 1 1-2.122 2.122L14 14.121l-1.439 1.44a1.5 1.5 0 0 1-2.122-2.122L11.879 12l-1.44-1.439a1.5 1.5 0 1 1 2.122-2.122L14 9.879l1.439-1.44a1.5 1.5 0 1 1 2.122 2.122ZM24 7v10a5.006 5.006 0 0 1-5 5H9.977a5.533 5.533 0 0 1-4.37-2.159l-5.3-6.93a1.5 1.5 0 0 1 0-1.822l5.3-6.93A5.534 5.534 0 0 1 9.977 2H19a5.006 5.006 0 0 1 5 5Zm-3 0a2 2 0 0 0-2-2H9.977a2.518 2.518 0 0 0-1.987.981L3.389 12l4.6 6.019A2.518 2.518 0 0 0 9.977 19H19a2 2 0 0 0 2-2V7Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
