import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import moment from 'moment';
import {replyListSet} from '../actions/PostScreenActions';
const PostComment = props => {
  const {route, username, replyListSet, replyList} = props;
  const [reply, setReply] = useState('');
  const {user, updatePostCommentReplies} = useContext(AuthContext);
  //   const [replyList, setReplyList] = useState([]);

  // const submitReply = Comment => {
  //   updatePostComments(
  //     [
  //       ...postCommentList,
  //       {
  //         reply_user_id: user.uid,
  //         reply_id: user.uid + moment().format(),
  //         reply: reply,
  //         username: username,
  //         reply_time: moment().format(),
  //       },
  //     ],
  //     route.params.post_id,
  //   );

  //  setReply('')
  // };
  useEffect(() => {
    const k = route.params.comment_replies;
    replyListSet(k);
  }, []);

  const addReplies = reply => {
    console.log('Checking ', reply, 'Old replies', replyList);
    const new_replies = [
      ...replyList,
      {
        reply_user_id: user.uid,
        reply_id: user.uid + moment().format(),
        reply: reply,
        username: username,
        reply_time: moment().format(),
      },
    ];



    replyListSet(new_replies);
    updatePostCommentReplies(
      route.params.allCommentList.filter(obj => obj.comment_id != route.params.comment_id),
      route.params.post_id,
      route.params.comment,
      route.params.comment_id,
      route.params.comment_time,
      route.params.comment_user_id,
      ['replyList', 'this is it', 'nice welldone'],
      route.params.nameOfUser,
    );
    console.log('Final', replyList);
  };


  const findAndUpdate=(Comments)=>{
    const extracted_comment= Comments.filter(comment=> comment.id=== route.params.comment_id)
    extracted_comment.replies=["New Reply"]
    updatePostCommentReplies(route.params.allCommentList,route.params.post_id,extracted_comment)
   
  }

  return (
    <View>
      <TextInput
        multiline={true}
        onChangeText={reply => {
          setReply(reply.replace(/^\s+|\s+$/g, ''));
        }}
        placeholder="Add your Reply ..."
        style={{fontSize: 17, margin: 10}}
      />
      <Button title="Submit" onPress={() => addReplies(reply)} />
      {/* <Button title="Submit" onPress={() => replyListSet(new_replies)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    username: state.postListing.username,
    replyList: state.postListing.reply_list,
  };
};
export default connect(mapStateToProps, {replyListSet})(PostComment);
