import React from 'react';
import styled from 'styled-components/native';
import SvgCheckMark from '@svg/CheckMark';
type CheckBoxProps = {
  checked: boolean;
};
const CheckBox: React.FC<CheckBoxProps> = ({checked}) => {
  return (
    <CheckBoxWrapper>
      <CheckMarkWrapper>
        {checked ? <SvgCheckMark width={20} height={20} /> : null}
      </CheckMarkWrapper>
    </CheckBoxWrapper>
  );
};
const CheckBoxWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 4px;
`;
const CheckMarkWrapper = styled.View`
  margin-left: 5px;
  margin-top: 5px;
`;
export default CheckBox;
