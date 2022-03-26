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
import {} from 'react-native';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import SvgUnion from '@svg/Union';
type DeskListItemPropsNavigatior = NativeStackScreenProps<
  RootStackParamList,
  'Desks'
>;
type DeskListItemNavigationProp = DeskListItemPropsNavigatior['navigation'];
type DeskItemType = {
  key: string;
  title: string;
};
type DeskListItemProps = {
  item: DeskItemType;
  navigation: DeskListItemNavigationProp;
};
const deskListItems: DeskItemType[] = [
  {key: 'item1', title: 'To do'},
  {key: 'item2', title: 'In Process'},
  {key: 'item3', title: 'Completed'},
];

const DeskListItem: React.FC<DeskListItemProps> = ({item, navigation}) => {
  const onPressListItem = (item: DeskItemType) => {
    console.log(item);
    navigation.navigate('Tasks');
  };
  return (
    <DeskItemWrapper onPress={() => onPressListItem(item)}>
      <DeskItemText>{item.title}</DeskItemText>
    </DeskItemWrapper>
  );
};
const Desks: React.FC<DeskListItemPropsNavigatior> = ({navigation}) => {
  return (
    <DeskContainer>
      <DeskHeader>
        <DeskTitleWrapper>
          <DeskTitle>My Desk</DeskTitle>
        </DeskTitleWrapper>
        <DeskImageWrapper>
          <SvgUnion />
        </DeskImageWrapper>
      </DeskHeader>
      <DeskList<React.ElementType>
        data={deskListItems}
        keyExtractor={(item: DeskItemType, index: number) =>
          `${item.title}-${index}`
        }
        renderItem={({item}: {item: DeskItemType}) => (
          <DeskListItem item={item} navigation={navigation} />
        )}
      />
    </DeskContainer>
  );
};
const DeskContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const DeskHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 22px;
  padding-right: 119px;
  padding-bottom: 22px;
  padding-left: 119px;
`;
const DeskTitle = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
`;
const DeskTitleWrapper = styled.View`
  align-items: center;
  width: 100%;
`;
const DeskImageWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 31px;
`;
const DeskList = styled.FlatList`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;
const DeskItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const DeskItemText = styled.Text`
  font-family: 'SF-UI-Text-Regular';
`;

export default Desks;
