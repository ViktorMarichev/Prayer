import React, {useContext} from 'react';
import {GestureResponderEvent} from 'react-native';
import Prayer from 'src/types/Prayer';
import styled from 'styled-components/native';
import CheckBox from '@components/CheckBox/index';
import SvgRectangle from '@svg/Rectangle';
import SvgUser from '@svg/User';
import SvgPrayer from '@svg/PrayerLine';
import RootStackContext, {StackContextType} from 'src/context/RootStackContext';
import {useAppDispatch, useAppSelector} from 'src/redux/store';
import {UserSelectors} from 'src/redux/User/index';
import {updatePrayer} from 'src/redux/Prayers/index';
type PrayerItemProps = {
  prayer: Prayer;
};

const PrayerItem: React.FC<PrayerItemProps> = ({prayer}) => {
  const stackContext = useContext(RootStackContext) as StackContextType;
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const CheckedChangeHandler = (e: GestureResponderEvent, prayer: Prayer) => {
    e.stopPropagation();
    dispatch(
      updatePrayer({
        id: prayer.id,
        title: prayer.title,
        description: prayer.description,
        checked: !prayer.checked,
        columnId: prayer.columnId,
        token,
      }),
    );
  };
  return (
    <PrayerTouchableOpacity
      onPress={() => {
        stackContext.navigation.navigate('Details');
      }}>
      <PrayerItemWrapper>
        <PrayerStart>
          <RectangleWrapper>
            <SvgRectangle />
          </RectangleWrapper>
          <CheckBoxWrapper
            onPress={(e: GestureResponderEvent) =>
              CheckedChangeHandler(e, prayer)
            }>
            <CheckBox checked={prayer.checked} />
          </CheckBoxWrapper>
          <PrayerTitle
            numberOfLines={1}
            textDecoration={prayer.checked ? 'line-through' : null}>
            {prayer.title}
          </PrayerTitle>
        </PrayerStart>
        <PrayerIcons>
          <IconWrapper>
            <SvgUser />
            <CountSubscribers>3</CountSubscribers>
          </IconWrapper>
          <IconWrapper>
            <SvgPrayer color={'#72A8BC'} />
            <CountPrayers>234</CountPrayers>
          </IconWrapper>
        </PrayerIcons>
      </PrayerItemWrapper>
    </PrayerTouchableOpacity>
  );
};
const PrayerTouchableOpacity = styled.TouchableOpacity``;
const PrayerItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 3px;
  background-color: white;
`;
const PrayerTitle = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  max-width: 190px;
  text-decoration: ${({textDecoration}: {textDecoration: string}) =>
    textDecoration || 'none'};
`;
const RectangleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;
const CheckBoxWrapper = styled.TouchableOpacity`
  margin-left: 6px;
  margin-right: 15px;
`;
const PrayerStart = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PrayerIcons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  margin-right: 15px;
`;
const CountSubscribers = styled.Text`
  margin-left: 4px;
`;
const CountPrayers = styled(CountSubscribers)``;
export default PrayerItem;
