import React, {useEffect, useState} from 'react';
import {Button, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import {useAppDispatch, useAppSelector} from 'src/redux/store';
import {createColumn} from 'src/redux/Columns/index';
import {UserSelectors} from 'src/redux/User/index';

type EditedContentProps = {
  closeModal: () => void;
};
interface IFormInputs {
  title: string;
  description: string;
}
const AddingAColumn: React.FC<EditedContentProps> = ({closeModal}) => {
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(state => state.columns.requestStatus);
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const AddingAcolumnHandler = () => {
    if (title.length < 5) {
      ToastAndroid.show('Too short !', ToastAndroid.SHORT);
    } else {
      dispatch(
        createColumn({
          title,
          description: '',
          token,
        }),
      );
    }
  };
  useEffect(() => {
    if (requestStatus === 'BEGIN_FETCHING') {
      closeModal();
    }
  }, [requestStatus]);

  return (
    <EditContentWrapper>
      <Content>
        <Header>
          <Title>Adding a Column</Title>
          <Close onPress={() => closeModal()}>
            <Сross>×</Сross>
          </Close>
        </Header>
        <Body>
          <InputWrapper>
            <Label>Title</Label>
            <Input
              placeholder="Enter a title"
              placeholderColor="#727272"
              onChangeText={(text: string) => setTitle(text)}
              value={title}
            />
          </InputWrapper>
        </Body>
        <Button title="Save" onPress={AddingAcolumnHandler} />
      </Content>
    </EditContentWrapper>
  );
};
export default AddingAColumn;
const EditContentWrapper = styled.View`
  width: 100%;
  height: 100%;
  background: #00000055;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const Title = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  color: black;
`;
const Content = styled.View`
  background-color: white;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
`;

const Body = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;
const InputWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const Label = styled.Text`
  padding-right: 5px;
`;
const Input = styled.TextInput`
  height: 45px;
  border: 1px solid gray;
  border-radius: 15px;
  background-color: white;
  color: black;
  flex: 1;
`;
const Close = styled.TouchableOpacity`
  justify-self: flex-end;
  position: absolute;
  right: 10px;
  bottom: -6px;
  z-index: 2;
`;
const Сross = styled.Text`
  font-size: 27px;
`;
const ErrorText = styled.Text`
  color: red;
  font-family: 'SF-UI-Text-Regular';
`;
