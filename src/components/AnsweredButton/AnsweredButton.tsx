import React from 'react';
import styled from 'styled-components/native';
type AnsweredButtonProps = {
  isShow: boolean;
  setAnseredPrayersIsShow: () => void;
};

const AnsweredButton: React.FC<AnsweredButtonProps> = ({
  isShow,
  setAnseredPrayersIsShow,
}) => {
  return (
    <AnswewdButtonWrapper>
      <AnsweredButtonBody onPress={() => setAnseredPrayersIsShow()}>
        <AnsweredButtonText>
          {isShow ? 'Hide' : 'Show'} Answered Prayers
        </AnsweredButtonText>
      </AnsweredButtonBody>
    </AnswewdButtonWrapper>
  );
};

const AnsweredButtonBody = styled.TouchableOpacity`
  background: #bfb393;
  box-shadow: 0px 2px 15px rgba(66, 78, 117, 0.1);
  border-radius: 15px;
  padding-left: 17px;
  padding-right: 17px;
  padding-top: 7px;
  padding-bottom: 7px;
`;
const AnsweredButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: 'SF-UI-Text-Regular';
`;
const AnswewdButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

export default AnsweredButton;
