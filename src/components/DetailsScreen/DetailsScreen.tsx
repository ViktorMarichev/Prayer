import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'src/types/RootStackParamList';
import SvgArrowBack from '@svg/ArrowBack';
import SvgPrayerline from '@svg/PrayerLine';
import SvgRectangle from '@svg/Rectangle';
import SvgUnion from '@svg/Union';

import SvgComment from '@svg/Vector (stroke)';
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailScreenProps> = ({navigation, route}) => {
  const [CommentValue, setCommentValue] = useState<string>('');

  return (
    <ScrollView
      style={{
        height: '100%',
        display: 'flex',
      }}>
      <DetailsScreenWrapper>
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
                <MemberImage source={require('src/assets/images/face1.png')} />
              </MemberImageWrapper>
              <MemberImageWrapper>
                <MemberImage source={require('src/assets/images/face2.png')} />
              </MemberImageWrapper>
              <JoinMemberButton>
                <AddCircle>
                  <SvgUnion color={'white'} />
                </AddCircle>
              </JoinMemberButton>
            </MemberList>
          </MembersWrapper>
        </DetailsBody>
        <DetailsBottom>
          <CommentListWrapper>
            <CommentListTitleWrapper>
              <CommentListTitle>COMMENTS</CommentListTitle>
            </CommentListTitleWrapper>

            <CommentList>
              <ScrollView>
                <CommentItem>
                  <CommentItemHeader>
                    <UserPreviewWrapper>
                      <UserPreview
                        source={require('src/assets/images/face3.png')}
                      />
                    </UserPreviewWrapper>
                  </CommentItemHeader>
                  <CommentItemBody>
                    <UserNameWrapper>
                      <UserName>Anna Barber</UserName>
                      <CommentTime>2 days ago</CommentTime>
                    </UserNameWrapper>
                    <CommentMessage>
                      What are you talking about?!
                    </CommentMessage>
                  </CommentItemBody>
                </CommentItem>

                <CommentItem>
                  <CommentItemHeader>
                    <UserPreviewWrapper>
                      <UserPreview
                        source={require('src/assets/images/face1.png')}
                      />
                    </UserPreviewWrapper>
                  </CommentItemHeader>
                  <CommentItemBody>
                    <UserNameWrapper>
                      <UserName>Hanna Barber</UserName>
                      <CommentTime>2 days ago</CommentTime>
                    </UserNameWrapper>
                    <CommentMessage>Of course you will deny it</CommentMessage>
                  </CommentItemBody>
                </CommentItem>

                <CommentItem>
                  <CommentItemHeader>
                    <UserPreviewWrapper>
                      <UserPreview
                        source={require('src/assets/images/face2.png')}
                      />
                    </UserPreviewWrapper>
                  </CommentItemHeader>
                  <CommentItemBody>
                    <UserNameWrapper>
                      <UserName>Gloria Jeans</UserName>
                      <CommentTime>2 days ago</CommentTime>
                    </UserNameWrapper>
                    <CommentMessage>Shut up everyone!</CommentMessage>
                  </CommentItemBody>
                </CommentItem>
              </ScrollView>
            </CommentList>
          </CommentListWrapper>
          <CommentInputWrapper>
            <SvgComment />
            <CommentInput
              placeholder="Add a comment..."
              onChangeText={(text: string) => setCommentValue(text)}
              value={CommentValue}
            />
          </CommentInputWrapper>
        </DetailsBottom>
      </DetailsScreenWrapper>
    </ScrollView>
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
const CommentListWrapper = styled.View`
  padding-top: 28px;

  flex-grow: 1;
`;
const CommentList = styled.View`
  width: 100%;

  min-height: 230px;
`;
const CommentItem = styled.View`
  width: 100%;
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 14px;
  border: 1px solid #e5e5e5;
  padding-left: 15px;
`;
const CommentItemHeader = styled.View`
  padding-right: 9px;
`;
const CommentItemBody = styled.View``;
const UserPreviewWrapper = styled.View`
  border-radius: 50px;
  overflow: hidden;
`;
const CommentListTitle = styled(TableItemAdditionValueBlue)`
  margin-bottom: 15px;
`;
const CommentListTitleWrapper = styled.View`
  padding-left: 15px;
`;
const UserPreview = styled.Image``;
const UserNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserName = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  line-height: 20px;
  color: #514d47;
`;
const CommentTime = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 13px;
  line-height: 16px;
  color: #9c9c9c;
  margin-left: 6px;
`;
const CommentMessage = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 17px;
  line-height: 20px;
  margin-top: 2px;
  color: #514d47;
`;
const CommentInput = styled.TextInput`
  width: 100%;
  background-color: white;
`;
const CommentInputWrapper = styled.View`
  height: auto;
  padding-left: 15px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
`;
const AddCircle = styled.View`
  background-color: #bfb393;
  border-radius: 50px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;
export default DetailsScreen;
