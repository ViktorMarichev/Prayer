import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const SvgRectangle: React.FC = (props: SvgProps) => (
  <Svg width={3} height={23} fill="none" {...props}>
    <Path fill={props.color} d="M-12-.063h24v24h-24z" />
  </Svg>
);
SvgRectangle.defaultProps = {
  color: '#AC5253',
};
export default SvgRectangle;
