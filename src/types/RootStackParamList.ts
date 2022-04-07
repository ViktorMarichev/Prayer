import { NavigatorScreenParams } from '@react-navigation/native';
import TabStackParamList from './TabStackParamList';
type RootStackParamList = {
  Desks: undefined;
  Tasks: undefined | NavigatorScreenParams<TabStackParamList>;
  Details: undefined;
  Authorization: undefined;
  Settings: undefined;
  Registration: undefined;
};
export default RootStackParamList;
