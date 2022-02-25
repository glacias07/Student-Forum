import React, {useContext, useState, useEffect} from 'react';
import {
  Alert,
  TextInput,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';
import {CustomText, Comment} from './common';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {connect} from 'react-redux';

const PostDetails = props => {
  const {route, username, userId} = props;
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
            console.log('This is fetch ', comments);
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
          comment_id: user.uid + moment().format(),
          comment: Comment,
          username: username,
          comment_time: moment().format(),
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
  }, [postComment]);

  return (
    <>
      <ScrollView>
        <View
          contentContainerStyle={{
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <CustomText
              text={route.params.username}
              textWeight={200}
              textSize={16}
            />
            <CustomText
              text={
                route.params.post_time.toDate().toLocaleDateString() +
                ' ' +
                route.params.post_time.toDate().toLocaleTimeString()
              }
              textWeight={100}
              textSize={12}
            />
          </View>
          <View style={{margin: 10, marginTop: -3}}>
            <CustomText
              text={route.params.post_title}
              textWeight={700}
              textSize={25}
            />
          </View>
          {route.params.download_url ? (
            <View style={{marginLeft: 10}}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: 300,
                  width: 300,
                  aspectRatio: aspect(imageHeight, imageWidth),
                  borderRadius: 10,
                }}
                source={{uri: route.params.download_url}}
              />
            </View>
          ) : null}
          <View style={{marginLeft: 10, marginBottom: 10}}>
            <CustomText
              text={route.params.post_content}
              textSize={20}
              textWeight={500}
            />
          </View>
        </View>
        {/* Comment FlatList  */}
        <View style={{backgroundColor: '#fff3d9'}}>
          <View style={{marginLeft: 20}}>
            <CustomText text="Comments" textSize={20} textWeight={900} />
          </View>
          <FlatList
            data={postCommentList}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  console.log(postCommentList);
                }}>
                <Comment
                  comment_user_id={userId}
                  deleteOnPress={handleDelete}
                  comment_id={item.item.comment_id}
                  nameOfUser={item.item.username}
                  comment={item.item.comment}
                  comment_time={moment(item.item.comment_time).format(
                    'MM/DD/YYYY',
                  )}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={comment => setPostComment(comment)}
          style={{borderColor: 'black', borderWidth: 1, flex: 4}}
          value={postComment}
        />
        <TouchableOpacity onPress={() => submitComment(postComment)}>
          <CustomText
            text="post"
            textWeight={500}
            textSize={20}
            style={{flex: 1, marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapStateToProps = state => {
  // console.log('Inside post -', state);
  console.log('Inside post user id -', state.postListing.userid);
  return {
    username: state.postListing.username,
    userId: state.postListing.userid,
  };
};
export default connect(mapStateToProps, {})(PostDetails);
