import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import moment from 'moment';

const PostComment = (props) => {
  const {route}=props
  const [reply, setReply] = useState('');
  const {user} = useContext(AuthContext);
  const[replyList,setReplyList]=useState([])

  const submitReply = Comment => {
    updatePostComments(
      [
        ...postCommentList,
        {
          reply_user_id: user.uid,
          reply_id: user.uid + moment().format(),
          reply: reply,
          username: username,
          reply_time: moment().format(),
        },
      ],
      route.params.post_id,
    );

   setReply('')
  };

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
      
    </View>
  );
};

const styles = StyleSheet.create({});


const mapStateToProps=state=>{
    return{
        username:state.postListing.username
    }
}
export default connect(mapStateToProps, {})(PostComment);
