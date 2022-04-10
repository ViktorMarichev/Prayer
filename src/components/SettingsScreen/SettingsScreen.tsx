import React from 'react';
import styled from 'styled-components/native';
import SvgArrowBack from '@svg/ArrowBack';
import {CommonActions} from '@react-navigation/native';
import SvgSettings from '@svg/Settings';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import {logout} from 'src/redux/User/index';
import {useAppDispatch} from 'src/redux/store';
type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;
const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(logout());
    navigation.dispatch(
      CommonActions.reset({index: 1, routes: [{name: 'Authorization'}]}),
    );
  };
  return (
    <SettingsScreenWrapper>
      <SettingsHeader>
        <ArrowWrapper onPress={() => navigation.goBack()}>
          <SvgArrowBack color={'white'} />
        </ArrowWrapper>
        <Title>Settings</Title>
        <SettingsSvgWrapper>
          <SvgSettings color={'white'} />
        </SettingsSvgWrapper>
      </SettingsHeader>
      <SettingsListWrapper>
        <SettingsList>
          <SettingItem onPress={logOut}>
            <SettingText>LogOut</SettingText>
          </SettingItem>
        </SettingsList>
      </SettingsListWrapper>
    </SettingsScreenWrapper>
  );
};
const SettingsScreenWrapper = styled.View`
  background-color: 'white';
`;
const SettingsHeader = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #bfb393;
`;
const SettingsSvgWrapper = styled.View`
  width: 29px;
  height: 29px;
  justify-content: center;
`;
const ArrowWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
`;
const Title = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  color: white;
`;
const SettingsListWrapper = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
`;
const SettingsList = styled.View`
  width: 100%;
`;
const SettingItem = styled.TouchableOpacity`
  width: 100%;
  border: pink;
  padding: 10px;
  border-radius: 10px;
`;
const SettingText = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 15px;
`;
export default SettingsScreen;
