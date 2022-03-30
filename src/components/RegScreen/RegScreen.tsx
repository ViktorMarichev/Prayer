import React, {useEffect} from 'react';
import {TextInput, Text} from 'react-native';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../types/RootStackParamList';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';

type RegistrationProps = NativeStackScreenProps<
  RootStackParamList,
  'Registration'
>;

const RegScreen: React.FC<RegistrationProps> = ({navigation}) => {
  interface IFormInputs {
    email: string;
    password: string;
    name: string;
  }

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {};
  return (
    <AuthScreenWrapper>
      <InputsContainer>
        <Title>Fill in the fields</Title>
        <InputsWrapper>
          <InputWrapper>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({message}) => {
                switch (errors.email!.type) {
                  case 'required':
                    return <ErrorText>This field is required</ErrorText>;
                  case 'pattern':
                    return <ErrorText>This is not email</ErrorText>;
                  default:
                    return <ErrorText>{errors.email!.type}</ErrorText>;
                }
              }}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: /^\S+@\S+$/i,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <EmailInput
                  placeholder="Enter a email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({message}) => {
                switch (errors.password!.type) {
                  case 'required':
                    return <ErrorText>This field is required</ErrorText>;
                  case 'minLength':
                    return <ErrorText>Too short</ErrorText>;
                  default:
                    return <ErrorText>{null}</ErrorText>;
                }
              }}
            />
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <NameInput
                  placeholder="Enter your name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({message}) => {
                switch (errors.password!.type) {
                  case 'required':
                    return <ErrorText>This field is required</ErrorText>;
                  case 'minLength':
                    return <ErrorText>Too short</ErrorText>;
                  default:
                    return <ErrorText>{null}</ErrorText>;
                }
              }}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <PasswordInput
                  placeholder="Enter a password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </InputWrapper>
        </InputsWrapper>
        <SubmitButton title="Submit" onPress={handleSubmit(onSubmit)} />
        <AuthorizationRefWrapper
          onPress={() => navigation.navigate('Authorization')}>
          <AuthorizationRef>I have an account</AuthorizationRef>
        </AuthorizationRefWrapper>
      </InputsContainer>
    </AuthScreenWrapper>
  );
};
const AuthScreenWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
const InputsContainer = styled.View`
  width: 100%;
  max-width: 300px;
  background-color: pink;
  border-radius: 15px;
`;
const InputsWrapper = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
`;
const Title = styled.Text`
  width: 100%;
  font-family: 'SF-UI-Text-Regular';
  text-align: center;
  font-size: 17px;
`;
const InputWrapper = styled.View`
  margin-top: 5px;
`;
const EmailInput = styled.TextInput`
  border: 1px solid gray;
  border-radius: 15px;
  background-color: white;
`;
const ErrorText = styled.Text`
  color: red;
  font-family: 'SF-UI-Text-Regular';
`;
const PasswordInput = styled(EmailInput)``;
const NameInput = styled(EmailInput)``;
const SubmitButton = styled.Button``;
const AuthorizationRefWrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const AuthorizationRef = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  color: gray;
`;
export default RegScreen;
