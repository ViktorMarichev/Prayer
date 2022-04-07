import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ReactNative from 'react-native';
import SvgUnion from '@svg/Union';
import PrayerList from '@components/PrayerList';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Prayer from 'src/types/Prayer';
import AnsweredButton from '@components/AnsweredButton/index';
import {useAppSelector, useAppDispatch} from 'src/redux/store';
import {prayersSelector, getPrayers} from 'src/redux/Prayers/index';
import {UserSelectors} from 'src/redux/User/index';
import TabScreenParamList from 'src/types/TabStackParamList';
type MyPrayersScreenProps = NativeStackScreenProps<
  TabScreenParamList,
  'MyPrayers'
>;
const MyPrayers: React.FC<MyPrayersScreenProps> = ({route}) => {
  const [prayerInputValue, setPrayerInputValue] = useState<string>('');
  const [answeredPrayersIsShow, setAnseredPrayersIsShow] =
    useState<boolean>(false);
  const setAnseredPrayersIsShowHandler = () => {
    setAnseredPrayersIsShow(prev => !prev);
  };

  const PrayeInputOnChangeHandler = (text: string) => {
    setPrayerInputValue(text);
  };
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const prayersChecked = useAppSelector(state =>
    prayersSelector.getCheckedPrayers(state),
  );
  const prayersNotChecked = useAppSelector(state =>
    prayersSelector.getNotCheckedPrayers(state),
  );
  useEffect(() => {
    dispatch(getPrayers({token}));
  }, []);
  useEffect(() => {
    console.log(prayersNotChecked);
  }, [prayersNotChecked]);
  const MyPrayersNotChecked: Array<Prayer> = [
    {
      id: 1,
      title: 'Golden finger',
      description: 'nothing',
      checked: false,
      columnId: 1,
    },
    {
      id: 2,
      title: 'Dark dungeon',
      description: 'Go ahead',
      checked: false,
      columnId: 1,
    },
  ];
  const MyPrayersChecked: Array<Prayer> = [
    {
      id: 1,
      title: 'Dungeon master',
      description: 'nothing',
      checked: true,
      columnId: 1,
    },
    {
      id: 2,
      title: 'Billy',
      description: 'Go ahead',
      checked: true,
      columnId: 1,
    },
  ];
  return (
    <PrayersWrapper>
      <InputWrapper>
        <AddPrayerToucher>
          <SvgUnion width={24} height={24} />
        </AddPrayerToucher>
        <PrayerInput
          placeholder="Add a prayer..."
          onChangeText={PrayeInputOnChangeHandler}
          value={prayerInputValue}
        />
      </InputWrapper>
      <PrayerList prayers={prayersNotChecked} isEdited={true} />
      <AnsweredButton
        isShow={answeredPrayersIsShow}
        setAnseredPrayersIsShow={setAnseredPrayersIsShowHandler}
      />
      {answeredPrayersIsShow ? (
        <PrayerList prayers={prayersChecked} isEdited={true} />
      ) : null}
    </PrayersWrapper>
  );
};
const PrayersWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const InputWrapper = styled.View`
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
  padding-top: 8px;
  padding-left: 14px;
  padding-bottom: 8px;
  padding-right: 14px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
`;
const AddPrayerToucher = styled.TouchableOpacity``;
const PrayerInput = styled.TextInput`
  width: 100%;
`;

export default MyPrayers;
