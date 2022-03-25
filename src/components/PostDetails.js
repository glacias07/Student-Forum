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
import {setCommentAdded} from '../actions/PostScreenActions';

const PostDetails = props => {
  const {
    route,
    username,
    userId,
    navigation,
    avatar,
    comment_added,
    setCommentAdded,
  } = props;
  const {user} = useContext(AuthContext);
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [postComment, setPostComment] = useState();
  const [postCommentList, setPostCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {updatePostComments, postThisCommentToFirebase} =
    useContext(AuthContext);

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

  const fetchCommentArray = async () => {
    try {
      await firestore()
        .collection('posts')
        .doc(route.params.post_id)
        .collection('comments')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {
              comment_user_id,
              comment,
              username,
              comment_time,
              avatar,
              no_of_replies,
            } = doc.data();
            list.push({
              comment_user_id,
              comment_id: doc.id,
              comment,
              username,
              comment_time,
              avatar,
              no_of_replies,
            });
          });
        });
      // console.log(list);
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

  const deleteComment = commentId => {
    firestore()
      .collection('posts')
      .doc(route.params.post_id)
      .collection('comments')
      .doc(commentId)
      .delete()
      .then(() => {
        console.log('Comment deleted from firebase successfully'),
          setLoading(true);
      })
      .catch(e =>
        console.log('Error occured when deleting comment from firebase: ', e),
      );
  };

  useEffect(() => {
    {
      route.params.download_url
        ? getImageSize(route.params.download_url)
        : null;
    }
    console.log('UseEffect fetch');
    fetchCommentArray();
    setCommentAdded(false);
    setLoading(false);
  }, [loading, navigation, comment_added]);

  const headerComponent = () => {
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
            style={{
              height: 50,
              width: 50,
              // borderRadius: 150 / 2,
              // backgroundColor: '#dde1e4',
            }}
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
      </>
    );
  };

  const emptyComponent = () => {
    return (
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
    );
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={emptyComponent}
        data={postCommentList}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              console.log(postCommentList);
            }}>
            <Comment
              comment_user_id={item.item.comment_user_id}
              editOnPress={() =>
                navigation.navigate('Edit Screen', {
                  title: 'Comment',
                  placeholder: 'Comment',
                  default_value: item.item.comment,
                  comment_id: item.item.comment_id,
                  post_id: route.params.post_id,
                })
              }
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
                  avatar: item.item.avatar,
                  no_of_replies: item.item.no_of_replies,
                  title_of_screen: 'Reply',
                })
              }
              comment_id={item.item.comment_id}
              nameOfUser={item.item.username}
              comment={item.item.comment}
              comment_time={moment(item.item.comment_time.toDate()).fromNow()}
              avatar={item.item.avatar}
              no_of_replies={item.item.no_of_replies}
              post_id={route.params.post_id}
            />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('Post Comment', {
            post_id: route.params.post_id,
            no_of_comments: postCommentList.length,
            title_of_screen: 'Comment',
            // user_id: route.params.user_id,
            post_title: route.params.post_title,
            // post_content: route.params.post_content,
            // username: route.params.username,
            // post_time: route.params.post_time,
            // download_url: route.params.downloadUrl,
            // avatar: route.params.avatar,
            // no_of_comments: route.params.no_of_comments,
          })
        }
        style={{
          backgroundColor: '#ffffff',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          elevation: 5,
          borderTopWidth: 0.2,
          borderTopColor: '#00000030',
        }}>
        <Image
          style={{
            height: '80%',
            marginRight: 5,
            flex: 2,
            // backgroundColor: '#dde1e4',
            // borderRadius: 150 / 2,
          }}
          source={{uri: route.params.avatar}}
        />
        <View
          style={{
            backgroundColor: '#dde1e4',
            height: '80%',
            flex: 15,
            borderRadius: 8,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomText
            text={'Add a comment'}
            textSize={17}
            style={{marginLeft: 10}}
          />
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: '#00000070',
              borderRadius: 150 / 2,
              marginRight: 12,
            }}
            source={require('../assets/icons/send.png')}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};
const mapStateToProps = state => {
  console.log('Inside post -', state);
  // console.log('Inside post user id -', state.postListing.userId);
  return {
    username: state.postListing.username,
    userId: state.postListing.userId,
    avatar: state.postListing.avatar,
    comment_added: state.postListing.comment_added,
  };
};
export default connect(mapStateToProps, {setCommentAdded})(PostDetails);
