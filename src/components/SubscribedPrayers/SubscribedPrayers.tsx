import React, {useState} from 'react';
import styled from 'styled-components/native';
import Prayer from 'src/types/Prayer';
import PrayerList from '@components/PrayerList';
import AnsweredButton from '@components/AnsweredButton/index';
const SubscribedPrayers: React.FC = () => {
  const [answeredPrayersIsShow, setAnseredPrayersIsShow] =
    useState<boolean>(false);

  const setAnseredPrayersIsShowHandler = () => {
    setAnseredPrayersIsShow(prev => !prev);
  };
  const SubscribedPrayers: Array<Prayer> = [
    {
      id: 1,
      title: 'Full master',
      description: 'nothing',
      checked: false,
      columnId: 1,
    },
    {
      id: 2,
      title: 'Leather man',
      description: 'Go ahead',
      checked: false,
      columnId: 1,
    },
  ];
  const SubscribedPrayersChecked: Array<Prayer> = [
    {
      id: 1,
      title: 'Golden finger',
      description: 'nothing',
      checked: true,
      columnId: 1,
    },
    {
      id: 2,
      title: 'Dark dungeon',
      description: 'Go ahead',
      checked: true,
      columnId: 1,
    },
  ];

  return (
    <PrayersWrapper>
      <PrayerList prayers={SubscribedPrayers} isEdited={true} />
      <AnsweredButton
        isShow={answeredPrayersIsShow}
        setAnseredPrayersIsShow={setAnseredPrayersIsShowHandler}
      />
      {answeredPrayersIsShow ? (
        <PrayerList prayers={SubscribedPrayersChecked} isEdited={true} />
      ) : null}
    </PrayersWrapper>
  );
};
const PrayersWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const PrayersLogo = styled.Text``;
export default SubscribedPrayers;
