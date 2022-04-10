import React from 'react';
import styled from 'styled-components/native';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import SvgArrowBack from '@svg/ArrowBack';
import SvgPrayerline from '@svg/PrayerLine';
import SvgRectangle from '@svg/Rectangle';
import AddCircle from '@svg/AddCircle';
import CommentList from '@components/CommentList/index';
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailScreenProps> = ({navigation, route}) => {
  return (
    <DetailsScreenWrapper>
      <ScrollView
        style={{
          height: '100%',
          display: 'flex',
        }}
        nestedScrollEnabled={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, justifyContent: 'flex-end'}}>
          <DetailsHeader>
            <HeaderTop>
              <ArrowWrapper onPress={() => navigation.goBack()}>
                <SvgArrowBack color={'white'} />
              </ArrowWrapper>
              <Title>{route.params.title}</Title>
              <PrayerLineWrapper>
                <SvgPrayerline color={'white'} />
              </PrayerLineWrapper>
            </HeaderTop>
            <HeaderBody>
              <PrayerDescription>
                {route.params.description
                  ? route.params.description
                  : 'Some description about your live in this city'}
              </PrayerDescription>
            </HeaderBody>
          </DetailsHeader>
          <DetailsBody>
            <LastPrayedWpaper>
              <RectangleWrapper>
                <SvgRectangle />
              </RectangleWrapper>
              <LastPrayed>Last Prayed 8 min ago</LastPrayed>
            </LastPrayedWpaper>
            <IndicatorsTable>
              <DateAddedItem>
                <TableItemGeneralValue>March 25 2022</TableItemGeneralValue>
                <TableItemAdditionalValue>Date Added</TableItemAdditionalValue>
                <TableItemAdditionValueBlue>
                  Opened for 4 days
                </TableItemAdditionValueBlue>
              </DateAddedItem>
              <TableItem>
                <TableItemGeneralValue>123</TableItemGeneralValue>
                <TableItemAdditionalValue>
                  Times Prayed Total
                </TableItemAdditionalValue>
              </TableItem>
              <TableItem>
                <TableItemGeneralValue>63</TableItemGeneralValue>
                <TableItemAdditionalValue>
                  Times Prayed by Me
                </TableItemAdditionalValue>
              </TableItem>
              <TableItem>
                <TableItemGeneralValue>60</TableItemGeneralValue>
                <TableItemAdditionalValue>
                  Times Prayed by Others
                </TableItemAdditionalValue>
              </TableItem>
            </IndicatorsTable>
            <MembersWrapper>
              <TableItemAdditionValueBlue>MEMBERS</TableItemAdditionValueBlue>
              <MemberList>
                <MemberImageWrapper>
                  <MemberImage
                    source={require('src/assets/images/face1.png')}
                  />
                </MemberImageWrapper>
                <MemberImageWrapper>
                  <MemberImage
                    source={require('src/assets/images/face2.png')}
                  />
                </MemberImageWrapper>
                <JoinMemberButton>
                  <AddCircle />
                </JoinMemberButton>
              </MemberList>
            </MembersWrapper>
          </DetailsBody>

          <DetailsBottom>
            <CommentList prayerId={route.params.id} />
          </DetailsBottom>
        </KeyboardAvoidingView>
      </ScrollView>
    </DetailsScreenWrapper>
  );
};
const DetailsScreenWrapper = styled.View`
  width: 100%;
  height: ${hp('100%')}px;
  background-color: white;
`;
const DetailsHeader = styled.View`
  background-color: #bfb393;
`;
const DetailsBody = styled.View``;

const DetailsBottom = styled.View`
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  color: white;
`;

const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 15px;
  padding-top: 20px;
`;
const HeaderBody = styled.View`
  padding-top: 17px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 23px;
`;
const PrayerDescription = styled(Title)`
  width: 100%;
`;
const ArrowWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
`;
const PrayerLineWrapper = styled.View`
  width: 29px;
  height: 29px;
  justify-content: center;
`;
const LastPrayedWpaper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 13px;
  padding-left: 3px;
  padding-right: 3px;
  padding-bottom: 15px;
`;
const RectangleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
const LastPrayed = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
`;
const IndicatorsTable = styled.View`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`;
const TableItem = styled.View`
  flex: 2 2 50%;
  min-height: 108px;
  border: 1px solid #e5e5e5;
  justify-content: center;
  padding-left: 15px;
`;
const DateAddedItem = styled(TableItem)`
  border-right: 1px solid gray;
`;
const TableItemGeneralValue = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  width: 100%;
  margin-bottom: 4px;
  font-size: 22px;
  line-height: 26px;

  color: #bfb393;
`;
const TableItemAdditionalValue = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 13px;
  line-height: 15px;
  color: #514d47;
`;
const TableItemAdditionValueBlue = styled(TableItemAdditionalValue)`
  color: #72a8bc;
`;
const MembersWrapper = styled.View`
  width: 100%;
  padding-left: 15px;
  padding-top: 20px;
`;
const MemberList = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 13px;
`;
const MemberImage = styled.Image``;
const MemberImageWrapper = styled.View`
  border-radius: 50px;
  margin-right: 4.55px;
  overflow: hidden;
`;
const JoinMemberButton = styled.TouchableOpacity``;

export default DetailsScreen;
