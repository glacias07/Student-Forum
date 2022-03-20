import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AuthProvider';
import {CustomHeaderButton, CustomText} from './common';
import {connect} from 'react-redux';
import moment from 'moment';
import {NavigationContainer} from '@react-navigation/native';
import {Comment} from './common';
import {setCommentAdded} from '../actions/PostScreenActions';
const PostComment = props => {
  const [replyOrComment, setReplyOrComment] = useState(null);
  const {route, username, navigation, avatar, setCommentAdded, comment_added} =
    props;
  const {user, postThisReplyToFirebase, postThisCommentToFirebase} =
    useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title_of_screen,
      headerLeft: () => (
        <CustomHeaderButton
          onPress={() => navigation.goBack()}
          icon={require('../assets/icons/cancel.png')}
        />
      ),
      headerRight: () => (
        <CustomHeaderButton
          onPress={() => {
            {
              route.params.title_of_screen == 'Reply'
                ? submitReply()
                : submitComment();
            }
          }}
          disabled={replyOrCommentFilledOrNot(replyOrComment).disabled}
          icon={require('../assets/icons/tick.png')}
          tintColor={replyOrCommentFilledOrNot(replyOrComment).color}
          height={20}
          width={20}
        />
      ),
    });
  });

  const replyOrCommentFilledOrNot = replyOrComment => {
    var buttonColor = 'blue';
    var disabled = false;
    if (replyOrComment === null) {
      disabled = true;
      buttonColor = '#00000070';
    } else {
      disabled = false;
      buttonColor = 'blue';
    }
    return {
      color: buttonColor,
      disabled: disabled,
    };
  };

  const submitComment = () => {
    postThisCommentToFirebase(
      user.uid,
      replyOrComment,
      username,
      avatar,
      route.params.no_of_comments + 1,
      route.params.post_id,
    );

    navigation.goBack();
    setCommentAdded(true);
    // setPostComment('');
    // setLoading(true);
  };

  const submitReply = () => {
    postThisReplyToFirebase(
      user.uid,
      replyOrComment,
      username,
      avatar,
      route.params.no_of_replies + 1,
      route.params.comment_id,
      route.params.post_id,
    );
    setCommentAdded(true);
    navigation.goBack();
  };

  return (
    <>
      {route.params.title_of_screen == 'Reply' ? (
        <Comment
          nameOfUser={route.params.nameOfUser}
          comment={route.params.comment}
          comment_time={moment(route.params.comment_time.toDate()).fromNow()}
          comment_replies={route.params.comment_replies}
          avatar={route.params.avatar}
          showValue={true}
          style={{marginTop: 10}}
        />
      ) : (
        <CustomText
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
          text={route.params.post_title}
          textColor={'#000000'}
          textSize={16}
          textWeight={400}
        />
      )}

      <View style={{backgroundColor: 'white', flex: 1, marginTop: 10}}>
        <TextInput
          multiline={true}
          onChangeText={replyOrComment => {
            setReplyOrComment(replyOrComment.replace(/^\s+|\s+$/g, ''));
          }}
          placeholder={'Add your ' + route.params.title_of_screen}
          style={{fontSize: 17, margin: 10, backgroundColor: 'white'}}
        />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    username: state.postListing.username,
    avatar: state.postListing.avatar,
    comment_added: state.postListing.comment_added,
  };
};

export default connect(mapStateToProps, {setCommentAdded})(PostComment);

// import {replyListSet} from '../actions/PostScreenActions';
// const PostComment = props => {
//   const {route, username, replyListSet, replyList} = props;
//   const [replyOrComment, setReplyOrComment] = useState('');
//   const {user, updatePostCommentReplies} = useContext(AuthContext);
//   //   const [replyList, setReplyOrCommentList] = useState([]);

//   // const submitReply = Comment => {
//   //   updatePostComments(
//   //     [
//   //       ...postCommentList,
//   //       {
//   //         reply_user_id: user.uid,
//   //         reply_id: user.uid + moment().format(),
//   //         replyOrComment: replyOrComment,
//   //         username: username,
//   //         reply_time: moment().format(),
//   //       },
//   //     ],
//   //     route.params.post_id,
//   //   );

//   //  setReplyOrComment('')
//   // };
//   // useEffect(() => {
//   //   const k = route.params.comment_replies;
//   //   replyListSet(k);
//   // }, []);

//   // const addReplies = async replyOrComment => {
//   //   console.log('Checking ', replyOrComment, 'Old replies', replyList);
//   //   const new_replies = [
//   //     ...replyList,
//   //     {
//   //       reply_user_id: user.uid,
//   //       reply_id: user.uid + moment().format(),
//   //       replyOrComment: replyOrComment,
//   //       username: username,
//   //       reply_time: moment().format(),
//   //     },
//   //   ];

//   //   await justForTesting(new_replies);

//     // updatePostCommentReplies(
//     //   route.params.allCommentList.filter(obj => obj.comment_id != route.params.comment_id),
//     //   route.params.post_id,
//     //   route.params.comment,
//     //   route.params.comment_id,
//     //   route.params.comment_time,
//     //   route.params.comment_user_id,
//     //   ['replyList', 'this is it', 'nice welldone '],
//     //   // replyList,
//     //   route.params.nameOfUser,
//     // );
//     console.log('Final', replyList);
//   };

//   const justForTesting = async new_replies => {
//     replyListSet(new_replies);
//   };

//   const findAndUpdate = Comments => {
//     const extracted_comment = Comments.filter(
//       comment => comment.id === route.params.comment_id,
//     );
//     extracted_comment.replies = ['New replyOrComment'];
//     updatePostCommentReplies(
//       route.params.allCommentList,
//       route.params.post_id,
//       extracted_comment,
//     );
//   };

//   return (
//     <View>
//       <TextInput
//         multiline={true}
//         onChangeText={replyOrComment => {
//           setReplyOrComment(replyOrComment.replace(/^\s+|\s+$/g, ''));
//         }}
//         placeholder="Add your replyOrComment ..."
//         style={{fontSize: 17, margin: 10}}
//       />
//       <Button title="Submit" onPress={() => addReplies(replyOrComment)} />
//       {/* <Button title="Submit" onPress={() => replyListSet(new_replies)} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// const mapStateToProps = state => {
//   return {
//     username: state.postListing.username,
//     replyList: state.postListing.reply_list,
//   };
// };
// export default connect(mapStateToProps, {replyListSet})(PostComment);
