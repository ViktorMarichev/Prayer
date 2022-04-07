import React from 'react';
import styled from 'styled-components/native';
import {
  FlatList,
  Text,
  TouchableOpacity,
  ListRenderItemInfo,
  View,
} from 'react-native';
import Prayer from 'src/types/Prayer';
import PrayerItem from '@components/PrayerItem/index';
import {SwipeListView} from 'react-native-swipe-list-view';

type PrayerListProps = {
  prayers: Array<Prayer>;
  isEdited: boolean;
};
const PrayerList: React.FC<PrayerListProps> = ({prayers, isEdited}) => {
  type hiddenItemData = {
    item: Prayer;
  };
  type row = {
    closeRow: () => void;
  };
  const closeRow = (rowMap: Array<row>, rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderItemHidden = (data: hiddenItemData, rowMap: any) => {
    return (
      <HiddenItemsContainer>
        <EditRowButton>
          <EditRowText>Edit</EditRowText>
        </EditRowButton>
        <DeleteRowButton onPress={() => closeRow(rowMap, data.item.id)}>
          <DeleteRowText>Delete</DeleteRowText>
        </DeleteRowButton>
      </HiddenItemsContainer>
    );
  };

  return (
    <PrayerListWrapper>
      {isEdited ? (
        <SwipeListView
          data={prayers}
          extraData={prayers.length}
          renderItem={({item}: {item: Prayer}) => <PrayerItem prayer={item} />}
          renderHiddenItem={renderItemHidden}
          keyExtractor={(item: Prayer) => item.id.toString()}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      ) : (
        <List<React.Component>
          data={prayers}
          extraData={prayers.length}
          renderItem={({item}: {item: Prayer}) => <PrayerItem prayer={item} />}
          keyExtractor={(item: Prayer) => item.id.toString()}
        />
      )}
    </PrayerListWrapper>
  );
};

const PrayerListWrapper = styled.View`
  width: 100%;
  max-height: 50%;
  background-color: white;
`;
const List = styled.FlatList``;
const HiddenItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;
const DeleteRowButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #ac5253;
  height: 100%;
  width: 75px;
`;
const EditRowButton = styled(DeleteRowButton)`
  background-color: blue;
`;
const DeleteRowText = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  color: white;
`;
const EditRowText = styled(DeleteRowText)``;
export default PrayerList;
