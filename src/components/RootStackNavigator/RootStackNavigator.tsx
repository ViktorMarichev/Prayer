import React from 'react';
import {Settings} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import DeskList from '@components/DeskList/index';
import TasksList from '@components/TasksList/index';
import AuthScreen from '@components/AuthScreen/index';
import DetailsScreen from '@components/DetailsScreen/index';
import SettingsScreen from '@components/SettingsScreen';
import RegistrationScreen from '@components/RegScreen/index';
import {useAppSelector} from 'src/redux/store';
import {UserSelectors} from 'src/redux/User/index';
const RootStackNavigator: React.FC = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={token ? 'Desks' : 'Authorization'}>
      <RootStack.Screen name="Desks" component={DeskList} />
      <RootStack.Screen name="Tasks" component={TasksList} />
      <RootStack.Screen name="Details" component={DetailsScreen} />
      <RootStack.Screen name="Authorization" component={AuthScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
      <RootStack.Screen name="Registration" component={RegistrationScreen} />
    </RootStack.Navigator>
  );
};
export default RootStackNavigator;
