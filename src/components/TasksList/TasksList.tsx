import React from 'react';
import {} from 'react-native';
import styled from 'styled-components/native';
import SvgSettings from '@svg/Settings';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import MyPrayers from '@components/MyPrayers/index';
import SubscribedPrayers from '@components/SubscribedPrayers/index';
import StackContext from 'src/context/RootStackContext';
import TabStackParamList from 'src/types/TabStackParamList';
const Tab = createMaterialTopTabNavigator<TabStackParamList>();

type TasksProps = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

const TaskList: React.FC<TasksProps> = ({navigation}) => {
  return (
    <StackContext.Provider value={{navigation}}>
      <TaskWrapper>
        <Header>
          <HeaderTitleWrapper>
            <HeaderTitle>To do</HeaderTitle>
          </HeaderTitleWrapper>
          <SettingsButtonWrapper
            onPress={() => navigation.navigate('Settings')}>
            <SvgSettings color={'#72A8BC'} />
          </SettingsButtonWrapper>
        </Header>
        <Tab.Navigator
          initialRouteName="MyPrayers"
          screenOptions={{
            tabBarLabelStyle: {fontSize: 12, color: '#72A8BC'},
            tabBarStyle: {borderBottomColor: 'red'},
            tabBarIndicatorStyle: {backgroundColor: '#72A8BC'},
            swipeEnabled: false,
          }}>
          <Tab.Screen
            name="MyPrayers"
            component={MyPrayers}
            options={{tabBarLabel: 'MY PRAYERS'}}
          />
          <Tab.Screen
            name="SubPrayers"
            component={SubscribedPrayers}
            options={{tabBarLabel: 'DESCRIBED'}}
          />
        </Tab.Navigator>
      </TaskWrapper>
    </StackContext.Provider>
  );
};

const TaskWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 22px;
  padding-right: 119px;
  padding-bottom: 22px;
  padding-left: 119px;
`;
const HeaderTitleWrapper = styled.View`
  align-items: center;
  width: 100%;
`;
const HeaderTitle = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
`;
const SettingsButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 31px;
`;
export default TaskList;
