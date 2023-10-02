import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import PropTypes from 'prop-types';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const HtmlRender = props => {
  const {width} = useWindowDimensions();

  const source = {
    html: `
       <div style='font-size: 16px; font-weight: 400; color: ${props.color}; line-height: 21.82px;'>
        ${props.source}
       </div>`,
  };

  return <RenderHtml contentWidth={width} source={source} />;
};
HtmlRender.propTypes = {
  color: PropTypes.string,
};

HtmlRender.defaultProps = {
  color: Colors.white,
};

export default HtmlRender;