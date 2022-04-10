import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import SvgComment from '@svg/Vector (stroke)';
import {UserSelectors} from 'src/redux/User/index';
import {useAppSelector, useAppDispatch} from 'src/redux/store';
import {getComments, commentsSelectors} from 'src/redux/Comments/index';
import Comment from 'src/types/Comment';

type CommentListProps = {
  prayerId: number;
};
const CommentList: React.FC<CommentListProps> = ({prayerId}) => {
  const [CommentValue, setCommentValue] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isMargin, setIsMargin] = useState<boolean>(false);
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state =>
    commentsSelectors.getCommentsByPrayerId(state, prayerId),
  );
  function formatDate(date: Date) {
    let dd: string | number = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: string | number = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: string | number = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }
  useEffect(() => {
    dispatch(getComments({token}));
    setLoaded(true);
  }, [loaded]);
  useEffect(() => {
    console.log('commentList', comments);
  }, [comments]);
  return (
    <CommentListContainer>
      <CommentListWrapper>
        <CommentListTitleWrapper>
          <CommentListTitle>COMMENTS</CommentListTitle>
        </CommentListTitleWrapper>

        <List>
          <FlatListComments<React.Component>
            data={comments}
            extraData={comments}
            renderItem={({item}: {item: Comment}) => (
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
                    <CommentTime>
                      {formatDate(new Date(item.created))}
                    </CommentTime>
                  </UserNameWrapper>
                  <CommentMessage>{item.body}</CommentMessage>
                </CommentItemBody>
              </CommentItem>
            )}
            keyExtractor={(item: Comment) => item.id.toString()}
          />
        </List>
      </CommentListWrapper>

      <CommentInputWrapper margin={isMargin ? 10 : null}>
        <SvgComment />
        <CommentInput
          placeholder="Add a comment..."
          onChangeText={(text: string) => setCommentValue(text)}
          onFocus={() => setIsMargin(true)}
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
const FlatListComments = styled.FlatList``;
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
  background-color: hsl(0, 0%, 100%);
`;
const CommentInputWrapper = styled.View`
  height: auto;
  padding-left: 15px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-left: 0px;
  margin-bottom: ${({margin}: {margin: number | null}) => margin || 0}px;
`;
export default CommentList;
