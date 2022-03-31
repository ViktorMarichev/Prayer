import {JSXElement} from '@babel/types';
import React, {Component, ReactNode} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings} from 'react-native';
import DeskList from '@components/DeskList/index';
import TasksList from '@components/TasksList/index';
import AuthScreen from '@components/AuthScreen/index';
import DetailsScreen from '@components/DetailsScreen/index';
import SettingsScreen from '@components/SettingsScreen';
import RegScreen from '@components/RegScreen/index';
import RootStackParamList from 'src/types/RootStackParamList';
const RootStack = createNativeStackNavigator<RootStackParamList>();
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Authorization">
          <RootStack.Screen name="Desks" component={DeskList} />
          <RootStack.Screen name="Tasks" component={TasksList} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
          <RootStack.Screen name="Authorization" component={AuthScreen} />
          <RootStack.Screen name="Settings" component={SettingsScreen} />
          <RootStack.Screen name="Registration" component={RegScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
