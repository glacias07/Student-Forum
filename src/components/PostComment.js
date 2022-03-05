import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AuthProvider';

import {connect} from 'react-redux';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';

const PostComment = props => {
  const [reply, setReply] = useState('');
  const {route, username, navigation} = props;
  const {user, updatePostComments} = useContext(AuthContext);

  useEffect(() => {
    fetctCommentArray();
  }, [reply]);
  var commentList = [];
  var replyArray = [];
  var comment = [];
  var comment_object = {}
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
      console.log(commentList);
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
      },
    ];
    console.log('Our method of async await',comment[0]);
    comment_object = comment[0]
    comment_object.replies = new_replylist.map(reply => reply);
    console.log("Isko kehte hai jugad",comment_object)
    updatePostComments([...commentList, comment_object], route.params.post_id);
    navigation.goBack()
  };

  return (
    <View>
      <TextInput
        multiline={true}
        onChangeText={reply => {
          setReply(reply.replace(/^\s+|\s+$/g, ''));
        }}
        placeholder="Your reply"
        style={{fontSize: 17, margin: 10}}
      />

      <TouchableOpacity onPress={() => newReplyList(reply)}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    username: state.postListing.username,
  };
};

export default connect(mapStateToProps, {})(PostComment);
