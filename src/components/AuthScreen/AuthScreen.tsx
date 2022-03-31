import React, {ReactElement, useEffect} from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {UserSelectors} from '../../redux/User/index';
import {login} from '../../redux/User/index';
type AuthorizationProps = NativeStackScreenProps<
  RootStackParamList,
  'Authorization'
>;

const AuthScreen: React.FC<AuthorizationProps> = ({navigation}) => {
  interface IFormInputs {
    email: string;
    password: string;
  }
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => UserSelectors.userData(state));
  useEffect(() => {
    if (userData.token) {
      navigation.navigate('Desks');
    }
  }, [userData]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    dispatch(login(data));
  };
  return (
    <AuthScreenWrapper>
      <InputsContainer>
        <Title>Authorisation</Title>
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
        <ButtonWrapper>
          <SubmitButton title="Submit" onPress={handleSubmit(onSubmit)} />
        </ButtonWrapper>

        <RegistrationRefWrapper
          onPress={() => navigation.navigate('Registration')}>
          <RegistrationRef>I don't have an account</RegistrationRef>
        </RegistrationRefWrapper>
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
  color: black;
  font-size: 17px;
`;
const InputWrapper = styled.View`
  margin-top: 5px;
`;
const EmailInput = styled.TextInput`
  height: 45px;
  border: 1px solid gray;
  border-radius: 15px;
  background-color: white;
  color: black;
`;
const ErrorText = styled.Text`
  color: red;
  font-family: 'SF-UI-Text-Regular';
`;
const PasswordInput = styled(EmailInput)``;
const ButtonWrapper = styled.View`
  padding: 0px 20px 0px 20px;
`;
const SubmitButton = styled.Button``;
const RegistrationRefWrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const RegistrationRef = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  color: gray;
`;
export default AuthScreen;
