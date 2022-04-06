import {createContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
type TasksListItemPropsNavigatior = NativeStackScreenProps<
  RootStackParamList,
  'Tasks'
>;
type navigationType = TasksListItemPropsNavigatior['navigation'];
export type StackContextType = {
  navigation: navigationType;
};

const StackContext = createContext<StackContextType | null>(null);
export default StackContext;
