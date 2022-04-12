import React, {useEffect} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import Prayer from 'src/types/Prayer';
import {useAppDispatch, useAppSelector} from 'src/redux/store';
import {setEditedPrayer, updatePrayer} from 'src/redux/Prayers/index';
import {UserSelectors} from 'src/redux/User/index';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
type EditedContentProps = {
  prayer: Prayer;
};
interface IFormInputs {
  title: string;
  description: string;
}
const EditContent: React.FC<EditedContentProps> = ({prayer}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const requestStatus = useAppSelector(state => state.prayers.requestStatus);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      title: prayer.title,
      description: prayer.description,
    },
  });
  useEffect(() => {
    if (requestStatus === 'SUCCESS_FETCHING') {
      dispatch(setEditedPrayer({prayer: null}));
    }
  }, [requestStatus]);
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    dispatch(
      updatePrayer({
        id: prayer.id,
        title: data.title,
        description: data.description,
        checked: prayer.checked,
        columnId: prayer.columnId,
        token,
      }),
    );
  };

  return (
    <EditContentWrapper>
      <Content>
        <Header>
          <Title>Prayer {prayer.id}</Title>
          <Close onPress={() => dispatch(setEditedPrayer({prayer: null}))}>
            <Сross>×</Сross>
          </Close>
        </Header>
        <Body>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({message}) => {
              switch (errors.description!.type) {
                case 'minLength':
                  return (
                    <ErrorText>
                      This field must be longer than 5 characters
                    </ErrorText>
                  );
                case 'required':
                  return <ErrorText>This field is required</ErrorText>;
              }
            }}
          />
          <InputWrapper>
            <Label>Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Enter a email"
                  placeholderColor="#727272"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </InputWrapper>
          <ErrorMessage
            errors={errors}
            name="description"
            render={({message}) => {
              switch (errors.description!.type) {
                case 'minLength':
                  return (
                    <ErrorText>
                      This field must be longer than 10 characters
                    </ErrorText>
                  );
              }
            }}
          />
          <InputWrapper>
            <Label>Description</Label>
            <Controller
              name="description"
              control={control}
              rules={{
                minLength: 10,
                required: false,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Enter a description"
                  placeholderColor="#727272"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </InputWrapper>
        </Body>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </Content>
    </EditContentWrapper>
  );
};
export default EditContent;
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
