import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import SvgComment from '@svg/Vector (stroke)';
const CommentList: React.FC = () => {
  const [CommentValue, setCommentValue] = useState<string>('');
  return (
    <CommentListContainer>
      <CommentListWrapper>
        <CommentListTitleWrapper>
          <CommentListTitle>COMMENTS</CommentListTitle>
        </CommentListTitleWrapper>

        <List>
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
                <CommentMessage>What are you talking about?!</CommentMessage>
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
        </List>
      </CommentListWrapper>
      <CommentInputWrapper>
        <SvgComment />
        <CommentInput
          placeholder="Add a comment..."
          onChangeText={(text: string) => setCommentValue(text)}
          value={CommentValue}
        />
      </CommentInputWrapper>
    </CommentListContainer>
  );
};
const CommentListContainer = styled.View`
  flex-direction: column;
`;
const CommentListWrapper = styled.View`
  padding-top: 28px;

  flex-grow: 1;
`;
const List = styled.View`
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
const TableItemAdditionalValue = styled.Text`
  font-family: 'SF-UI-Text-Regular';
  font-size: 13px;
  line-height: 15px;
  color: #72a8bc;
`;
const CommentListTitle = styled(TableItemAdditionalValue)`
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
export default CommentList;
