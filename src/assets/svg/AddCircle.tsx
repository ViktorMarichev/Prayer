import * as React from 'react';
import Svg, {SvgProps, Circle, Mask, Path, G} from 'react-native-svg';

const SvgAddCircle = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Circle cx={16} cy={16} r={16} fill="#BFB393" />
    <Mask id="AddCircle_svg__a" x={8} y={8} width={16} height={16}>
      <Path
        d="M15.273 23.273a.727.727 0 1 0 1.454 0v-6.546h6.546a.727.727 0 1 0 0-1.454h-6.546V8.727a.727.727 0 0 0-1.454 0v6.546H8.727a.727.727 0 0 0 0 1.454h6.546v6.546Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#AddCircle_svg__a)">
      <Path fill="white" d="M7.273 7.273h17.454v17.454H7.273z" />
    </G>
  </Svg>
);

export default SvgAddCircle;
