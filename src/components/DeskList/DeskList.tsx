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
import React, {Component, ReactNode, useEffect, useState} from 'react';
import {} from 'react-native';
import styled from 'styled-components/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import SvgUnion from '@svg/Union';
import {getColumns} from '../../redux/Columns/index';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {columnsSelector} from '../../redux/Columns/index';
import {UserSelectors} from '../../redux/User/index';
type DeskListItemPropsNavigatior = NativeStackScreenProps<
  RootStackParamList,
  'Desks'
>;
type DeskListItemNavigationProp = DeskListItemPropsNavigatior['navigation'];
type DeskItemType = {
  id: number;
  userId: number;
  title: string;
  description: string | null;
};
type DeskListItemProps = {
  item: DeskItemType;
  navigation: DeskListItemNavigationProp;
};

const DeskListItem: React.FC<DeskListItemProps> = ({item, navigation}) => {
  const onPressListItem = (item: DeskItemType) => {
    navigation.navigate('Tasks', {
      screen: 'MyPrayers',
      params: {columnId: item.id},
    });
  };
  return (
    <DeskItemWrapper onPress={() => onPressListItem(item)}>
      <DeskItemText>{item.title}</DeskItemText>
    </DeskItemWrapper>
  );
};
const Desks: React.FC<DeskListItemPropsNavigatior> = ({navigation}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const columns: Array<DeskItemType> = useAppSelector(state =>
    columnsSelector.getAll(state),
  );
  const token = useAppSelector(state => UserSelectors.userData(state).token);

  useEffect(() => {
    dispatch(getColumns({token}));
    setLoaded(true);
  }, [loaded]);
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
        data={columns}
        keyExtractor={(item: DeskItemType) => `${item.title}-${item.id}`}
        extraData={columns}
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
