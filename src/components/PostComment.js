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
import {CustomHeaderButton} from './common';
import {connect} from 'react-redux';
import moment from 'moment';
import {NavigationContainer} from '@react-navigation/native';
import {Comment} from './common';

const PostComment = props => {
  const [reply, setReply] = useState(null);
  const {route, username, navigation, avatar} = props;
  const {user, updatePostComments} = useContext(AuthContext);

  useEffect(() => {
    fetctCommentArray();
  }, [reply]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Reply',
      headerLeft: () => (
        <CustomHeaderButton
          onPress={() => navigation.goBack()}
          icon={require('../assets/icons/cancel.png')}
        />
      ),
      headerRight: () => (
        <CustomHeaderButton
          onPress={() => {
            newReplyList(reply);
          }}
          disabled={postFilledOrNot(reply).disabled}
          icon={require('../assets/icons/tick.png')}
          tintColor={postFilledOrNot(reply).color}
          height={20}
          width={20}
        />
      ),
    });
  });

  const postFilledOrNot = reply => {
    var buttonColor = 'blue';
    var disabled = false;
    if (reply === null) {
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

  var commentList = [];
  var replyArray = [];
  var comment = [];
  var comment_object = {};
  const fetctCommentArray = async () => {
    try {
      await firestore()
        .collection('posts')
        .where('postTitle', '==', route.params.post_title)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {comments} = doc.data();
            commentList = [...comments];
          });
        });
      // console.log(commentList);
      extractCommentObjectAndReplyArray(commentList, route.params.comment_id);
    } catch (error) {
      console.log('Error while fetching comments', error);
    }
  };

  const extractCommentObjectAndReplyArray = (commentArray, id) => {
    comment = commentArray.filter(comment => comment.comment_id === id);
    commentList = commentArray.filter(comment => comment.comment_id != id);
    replyArray = comment[0].replies;
  };

  const newReplyList = () => {
    const new_replylist = [
      ...replyArray,
      {
        reply_user_id: user.uid,
        reply_id: user.uid + moment().format(),
        reply: reply,
        username: username,
        reply_time: moment().format(),
        parent_comment_id: 'awed',
        avatar: avatar,
      },
    ];

    setTimeout(test1, 2000);
    function test1() {
      // console.log('Our method of async await', comment[0]);
      comment_object = comment[0];
      // const [comment_object]=comment
      // comment_object.replies = new_replylist.map(reply => reply);
      for (var i of new_replylist) {
        comment_object.replies.push(i);
      }
      console.log('Final Push', comment_object);
      setTimeout(test2, 1000);
      function test2() {
        updatePostComments(
          [...commentList, comment_object],
          route.params.post_id,
        );
      }

      navigation.goBack();
    }
  };

  return (
    <>
        <Comment
          nameOfUser={route.params.nameOfUser}
          comment={route.params.comment}
          comment_time={moment(route.params.comment_time).fromNow(true)}
          comment_replies={route.params.comment_replies}
          avatar={route.params.avatar}
          showValue={true}
          style={{marginTop: 10}}
        />

      <View style={{backgroundColor: 'white', flex: 1, marginTop: 10}}>
        <TextInput
          multiline={true}
          onChangeText={reply => {
            setReply(reply.replace(/^\s+|\s+$/g, ''));
          }}
          placeholder="Add your Reply ..."
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
  };
};

export default connect(mapStateToProps, {})(PostComment);

// import {replyListSet} from '../actions/PostScreenActions';
// const PostComment = props => {
//   const {route, username, replyListSet, replyList} = props;
//   const [reply, setReply] = useState('');
//   const {user, updatePostCommentReplies} = useContext(AuthContext);
//   //   const [replyList, setReplyList] = useState([]);

//   // const submitReply = Comment => {
//   //   updatePostComments(
//   //     [
//   //       ...postCommentList,
//   //       {
//   //         reply_user_id: user.uid,
//   //         reply_id: user.uid + moment().format(),
//   //         reply: reply,
//   //         username: username,
//   //         reply_time: moment().format(),
//   //       },
//   //     ],
//   //     route.params.post_id,
//   //   );

//   //  setReply('')
//   // };
//   // useEffect(() => {
//   //   const k = route.params.comment_replies;
//   //   replyListSet(k);
//   // }, []);

//   // const addReplies = async reply => {
//   //   console.log('Checking ', reply, 'Old replies', replyList);
//   //   const new_replies = [
//   //     ...replyList,
//   //     {
//   //       reply_user_id: user.uid,
//   //       reply_id: user.uid + moment().format(),
//   //       reply: reply,
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
//     extracted_comment.replies = ['New Reply'];
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
//         onChangeText={reply => {
//           setReply(reply.replace(/^\s+|\s+$/g, ''));
//         }}
//         placeholder="Add your Reply ..."
//         style={{fontSize: 17, margin: 10}}
//       />
//       <Button title="Submit" onPress={() => addReplies(reply)} />
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
