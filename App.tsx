/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {JSXElement} from '@babel/types';
import React, {Component, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import RootStackNavigator from '@components/RootStackNavigator/index';
import store, {persistor} from 'src/redux/store';

const App: React.FC = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
};
export default App;
