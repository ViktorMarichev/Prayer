import React, {useState, useEffect, useRef} from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ToastAndroid,
  TextInputSubmitEditingEventData,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import SvgComment from '@svg/Vector (stroke)';
import {UserSelectors} from 'src/redux/User/index';
import {useAppSelector, useAppDispatch} from 'src/redux/store';
import {
  getComments,
  createComment,
  commentsSelectors,
} from 'src/redux/Comments/index';
import Comment from 'src/types/Comment';

type CommentListProps = {
  prayerId: number;
};
const CommentList: React.FC<CommentListProps> = ({prayerId}) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isMargin, setIsMargin] = useState<boolean>(false);
  const flatListRef = useRef<FlatList | null>(null);
  const token = useAppSelector(state => UserSelectors.userData(state).token);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state =>
    commentsSelectors.getCommentsByPrayerId(state, prayerId),
  );
  const formatDate = (date: Date) => {
    let dd: string | number = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm: string | number = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy: string | number = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  };
  const diffDaysCalculation = (date: Date) => {
    const currentDate = new Date();

    var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let diffWeeks = (currentDate.getTime() - date.getTime()) / 1000;
    diffWeeks /= 3600 * 24 * 7;
    diffWeeks = Math.abs(Math.round(diffWeeks));

    var diffMinutes = (currentDate.getTime() - date.getTime()) / 1000;
    diffMinutes /= 60;
    diffMinutes = Math.abs(Math.round(diffMinutes));
    if (diffWeeks >= 6) {
      return formatDate(date);
    } else if (diffWeeks != 0) {
      return diffWeeks + ' weeks ago';
    } else if (diffDays >= 1 && diffMinutes >= 1440) {
      return diffDays + ' days ago';
    } else {
      return Math.ceil(diffMinutes) + ' minutes ago';
    }
  };

  const OnChangeCommentHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setCommentValue(event.nativeEvent.text);
  };
  const onSubmitComment = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (commentValue.length < 8) {
      ToastAndroid.show('Comment is too short !', ToastAndroid.SHORT);
    } else {
      dispatch(
        createComment({
          token,
          body: commentValue,
          prayerId,
          created: Date.now,
        }),
      );
      setCommentValue('');
    }
  };
  useEffect(() => {
    dispatch(getComments({token}));
    setLoaded(true);
  }, [loaded]);
  useEffect(() => {}, [comments]);
  const contentSizeChangeHandler = () => {
    flatListRef.current!.scrollToEnd();
  };
  return (
    <CommentListContainer margin={isMargin ? 10 : null}>
      <CommentListWrapper>
        <CommentListTitleWrapper>
          <CommentListTitle>COMMENTS</CommentListTitle>
        </CommentListTitleWrapper>

        <List>
          <FlatListComments<FlatList>
            ref={flatListRef}
            data={comments}
            extraData={comments}
            nestedScrollEnabled={true}
            onContentSizeChange={contentSizeChangeHandler}
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
                      {diffDaysCalculation(new Date(item.created))}
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

      <CommentInputWrapper>
        <SvgComment />
        <CommentInput
          placeholder="Add a comment..."
          onChange={OnChangeCommentHandler}
          onFocus={() => setIsMargin(true)}
          onSubmitEditing={onSubmitComment}
          value={commentValue}
        />
      </CommentInputWrapper>
    </CommentListContainer>
  );
};
const CommentListContainer = styled.View`
  flex-direction: column;
  height: 100%;
  flex: 1;
  margin-bottom: ${({margin}: {margin: number | null}) => margin || 0}px;
`;
const CommentListWrapper = styled.View`
  padding-top: 28px;

  flex-grow: 1;
`;
const List = styled.View`
  width: 100%;
  flex: 1;
`;
const FlatListComments = styled.FlatList`
  width: 100%;
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
  background-color: hsl(0, 0%, 100%);
`;
const CommentInputWrapper = styled.View`
  height: auto;
  padding-left: 15px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-left: 0px;
`;
export default CommentList;
