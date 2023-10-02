import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={30}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.22.094a4.58 4.58 0 0 0-2.387 1.583c-.252.327-.725 1.225-.725 1.375 0 .053-1.915.07-8.044.07H1.02l-.293.14c-.345.163-.45.272-.611.63-.214.478-.114 1.003.265 1.385.384.388-.238.36 8.646.378l8.066.016.102.28c.496 1.364 1.779 2.47 3.207 2.764 2.005.415 4.098-.732 4.866-2.664l.14-.352 1.813-.03c1.961-.033 2.039-.045 2.388-.377.217-.206.39-.603.391-.897 0-.261-.212-.773-.387-.93a1.906 1.906 0 0 0-.374-.22c-.245-.113-.38-.121-2.037-.122l-1.774-.001-.065-.163c-.2-.51-.51-1.06-.782-1.393C24.062.93 23.248.386 22.432.128c-.49-.155-1.67-.173-2.212-.034Zm1.784 2.581a1.86 1.86 0 0 1 1.071 2.044 1.7 1.7 0 0 1-.515.994c-.395.399-.7.519-1.32.518-.438-.001-.573-.025-.791-.14a2.133 2.133 0 0 1-.869-.866c-.134-.256-.155-.369-.156-.83-.001-.626.117-.935.512-1.334.298-.301.507-.416.923-.507a1.75 1.75 0 0 1 1.145.121ZM8.2 10.109c-1.434.207-2.691 1.12-3.306 2.402-.141.293-.271.58-.29.637-.031.096-.172.104-1.838.105-2.025.002-2.098.014-2.46.432a1.232 1.232 0 0 0 0 1.622c.362.418.435.43 2.46.432 1.666.001 1.807.01 1.838.105.019.057.149.344.29.638.54 1.125 1.585 1.976 2.84 2.312.457.122 1.403.137 1.902.03 1.379-.295 2.56-1.309 3.14-2.694l.15-.36 8.114-.03c9.04-.033 8.27.006 8.658-.44a1.233 1.233 0 0 0 0-1.608c-.387-.446.382-.407-8.658-.44l-8.113-.03-.151-.36c-.467-1.115-1.273-1.952-2.341-2.432-.621-.279-1.575-.416-2.235-.32Zm1.035 2.574c.357.096.777.375.99.656.498.66.497 1.655-.004 2.319-.214.284-.698.589-1.075.676-1.514.35-2.766-1.293-2.053-2.695a1.824 1.824 0 0 1 2.142-.956ZM20.36 20.28c-1.397.3-2.677 1.416-3.166 2.76l-.102.28-8.066.016c-8.884.017-8.262-.01-8.646.378-.379.382-.48.907-.265 1.384.16.359.266.468.61.631l.294.14h8.044c6.13 0 8.044.017 8.044.07 0 .15.473 1.048.725 1.375.599.78 1.577 1.405 2.522 1.61.557.122 1.589.09 2.077-.062.812-.253 1.63-.8 2.15-1.437.272-.333.58-.883.781-1.392l.065-.163 1.774-.001c1.74 0 1.78-.003 2.067-.14.345-.163.45-.272.611-.63.282-.629.001-1.353-.64-1.651-.17-.079-.52-.1-2.018-.125l-1.814-.03-.14-.353c-.772-1.941-2.895-3.092-4.907-2.66Zm1.681 2.617c.324.16.717.54.868.839.252.5.254 1.216.004 1.71-.467.926-1.615 1.307-2.525.838-.295-.152-.67-.549-.83-.877-.196-.402-.195-1.227.003-1.61a2.07 2.07 0 0 1 1.18-1.015c.286-.094 1.006-.03 1.3.115Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
