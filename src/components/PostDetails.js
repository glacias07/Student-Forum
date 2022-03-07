import React, {useContext, useState, useEffect} from 'react';
import {
  Alert,
  TextInput,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import {AuthContext} from '../routes/AuthProvider';
import {CustomText, Comment} from './common';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const PostDetails = props => {
  const {route, username, userId, navigation} = props;
  const {user} = useContext(AuthContext);
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [postComment, setPostComment] = useState();
  const [postCommentList, setPostCommentList] = useState([]);

  const {updatePostComments} = useContext(AuthContext);

  const getImageSize = url => {
    Image.getSize(
      url,
      (width, height) => {
        setImageHeight(height);
        setImageWidth(width);
        // console.log(height, width);
      },
      error => {
        console.log(error);
      },
    );
  };
  const aspect = (height, width) => {
    if (height === width) {
      return 3 / 3;
    } else if (height > width) {
      return 3 / 4;
    } else if (width > height) {
      return 3 / 2;
    }
  };

  var list = [];

  const fetctCommentArray = async () => {
    try {
      await firestore()
        .collection('posts')
        .where('postTitle', '==', route.params.post_title)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {comments} = doc.data();
            // console.log('This is fetch ', comments);
            // list=comments.map(item=>list.push(item))
            list = [...comments];
          });
        });
      setPostCommentList(list);
    } catch (error) {
      console.log('Error while fetching comments', error);
    }
  };
  const handleDelete = commentId => {
    Alert.alert(
      'Delete Comment',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteComment(commentId),
        },
      ],
      {cancelable: false},
    );
  };
  const removeByCommentId = value => {
    const newArr = postCommentList.filter(obj => obj.comment_id != value);
    setPostCommentList(newArr);
    updatePostComments(newArr, route.params.post_id);
  };
  const deleteComment = commentId => {
    removeByCommentId(commentId);
  };
  const submitComment = Comment => {
    updatePostComments(
      [
        ...postCommentList,
        {
          comment_user_id: user.uid,
          comment_id: user.uid + moment().format(),
          comment: Comment,
          username: username,
          comment_time: moment().format(),
          replies: [],
        },
      ],
      route.params.post_id,
    );

    setPostComment('');

    // console.log(postComment);
  };

  useEffect(() => {
    {
      route.params.download_url
        ? getImageSize(route.params.download_url)
        : null;
    }
    fetctCommentArray();
  }, [postComment, list]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#ffffff',
        }}>
        <Image
          style={{height: 50, width: 50, borderRadius: 150 / 2}}
          source={{uri: route.params.avatar}}
        />
        <View
          style={{
            paddingHorizontal: 15,
          }}>
          <CustomText
            text={route.params.username}
            textWeight={500}
            textSize={16}
          />
          <CustomText
            text={
              route.params.post_time.toDate().toLocaleDateString() +
              ' ' +
              route.params.post_time.toDate().toLocaleTimeString()
            }
            textWeight={400}
            textSize={12}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 10, backgroundColor: '#ffffff'}}>
        <CustomText
          style={{marginVertical: 10}}
          text={route.params.post_title}
          textWeight={700}
          textSize={25}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'black',
        }}>
        {route.params.download_url ? (
          <View style={{background: 'black', flex: 1}}>
            <Image
              style={{
                resizeMode: 'cover',
                height: 300,
                width: 300,
                aspectRatio: aspect(imageHeight, imageWidth),
                alignSelf: 'center',
              }}
              source={{uri: route.params.download_url}}
            />
          </View>
        ) : null}
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
        }}>
        <View style={{marginLeft: 10, marginBottom: 10}}>
          <CustomText
            text={route.params.post_content}
            textSize={17}
            textWeight={500}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 10,
          backgroundColor: '#ffffff',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 25, width: 25, marginRight: 5}}
            source={require('../assets/icons/comment.png')}
          />
          <CustomText
            textSize={15}
            textWeight={500}
            text={postCommentList.length}
          />
        </View>
        <Image
          style={{height: 25, width: 25, marginRight: 5}}
          source={require('../assets/icons/share.png')}
        />
        <Image
          style={{height: 25, width: 25, marginRight: 5}}
          source={require('../assets/icons/chat.png')}
        />
      </View>
      {/* Comment FlatList  */}
      <View
        style={{
          backgroundColor: '#00000005',
          paddingVertical: 10,
        }}>
        <CustomText
          style={{marginLeft: 10}}
          text="COMMENTS"
          textSize={16}
          textWeight={500}
        />
      </View>
      {postCommentList.length > 0 ? (
        <FlatList
          data={postCommentList}
          contentContainerStyle={{
            backgroundColor: '#00000005',
          }}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => {
                console.log(postCommentList);
              }}>
              <Comment
                comment_user_id={item.item.comment_user_id}
                deleteOnPress={handleDelete}
                replyOnPress={() =>
                  navigation.navigate('Post Comment', {
                    comment_user_id: item.item.comment_user_id,
                    nameOfUser: item.item.username,
                    comment: item.item.comment,
                    comment_time: item.item.comment_time,
                    post_title: route.params.post_title,
                    post_id: route.params.post_id,
                    comment_replies: item.item.replies,
                    allCommentList: postCommentList,
                    comment_id: item.item.comment_id,
                  })
                }
                comment_id={item.item.comment_id}
                nameOfUser={item.item.username}
                comment={item.item.comment}
                comment_replies={item.item.replies}
                comment_time={moment(item.item.comment_time).fromNow(true)}
                avatar={route.params.avatar}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{backgroundColor: 'white', height: 200}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{height: 80, width: 80, marginBottom: 10}}
              source={require('../assets/images/confused.png')}
            />
            <CustomText
              text="No Conversations Yet !"
              textSize={20}
              textWeight={200}
            />
            <CustomText
              text="Why don't you start one?"
              textSize={15}
              textWeight={600}
            />
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.7,
          borderColor: '#00000050',
          paddingHorizontal: 10,
          borderRadius: 5,
          margin: 10,
          backgroundColor: '#ffffff',
        }}>
        <TextInput
          onChangeText={comment => setPostComment(comment)}
          style={{flex: 4}}
          value={postComment}
          placeholder="Add a comment"
        />
        {postComment ? (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => submitComment(postComment)}>
            <Image
              style={{height: 25, width: 25, marginRight: 5}}
              source={require('../assets/icons/send.png')}
              tintColor="#5374ff"
            />
          </TouchableOpacity>
        ) : (
          <Image
            tintColor="lightgrey"
            style={{height: 25, width: 25, marginRight: 5}}
            source={require('../assets/icons/send.png')}
          />
        )}
      </View>
    </>
  );
};
const mapStateToProps = state => {
  // console.log('Inside post -', state);
  // console.log('Inside post user id -', state.postListing.userId);
  return {
    username: state.postListing.username,
    userId: state.postListing.userId,
  };
};
export default connect(mapStateToProps, {})(PostDetails);
