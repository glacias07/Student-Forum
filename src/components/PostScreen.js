import React from 'react';
import {} from './SetupProfileScreen';
import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
// import {CustomText, PostCard} from './common';
import PostCard from './common/PostCard';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import {usernameSet, useridSet, avatarSet} from '../actions/PostScreenActions';
import {CustomText} from './common';
import HomeScreenShimmer from './HomeScreenShimmer';

const PostScreen = ({navigation, usernameSet, useridSet, avatarSet}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const {user} = useContext(AuthContext);

  // const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {
              userId,
              username,
              downloadUrl,
              postTitle,
              postContent,
              postTime,
              no_of_comments,
              avatar,
            } = doc.data();
            list.push({
              userId,
              username,
              downloadUrl,
              no_of_comments,
              liked: false,
              postTitle,
              id: doc.id,
              postContent,
              postTime,
              avatar,
            });
          });
        });
      setPosts(list);

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.log(
        'Error while fetching posts (Located on PostScreen.js)',
        error,
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
    setDeleted(false);
  }, [navigation, loading, deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePostDetails = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log('Deleted post details');
        setDeleted(true);
      })
      .catch(e => {
        console.log('error deleting the post details(Postscreen.js): ', e);
      });
  };

  const deletePost = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {downloadUrl} = documentSnapshot.data();
          if (downloadUrl != null) {
            const storageRef = storage().refFromURL(downloadUrl);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log('image deleted from storage');
                deletePostDetails(postId);
              })
              .catch(e => {
                console.log(
                  'error deleting the image from storage (PostScreen.js): ' + e,
                );
              });
          } else {
            deletePostDetails(postId);
          }
        }
      });
  };

  const fetchUserDetails = async () => {
    try {
      const list = [];

      await firestore()
        .collection('userDetails')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, username, avatar} = doc.data();
            list.push({
              userId,
              username,
              avatar,
            });
          });
        });
      console.log('User details ', list);
      useridSet(list[0].userId);
      usernameSet(list[0].username);
      avatarSet(list[0].avatar);

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error while fetching User Details', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      {posts == null ? (
        <HomeScreenShimmer />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={posts}
          removeClippedSubviews={true}
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <PostCard
              deleteOnPress={handleDelete}
              editOnPress={() =>
                navigation.navigate('Edit Screen', {
                  post_id: item.id,
                  post_title: item.postTitle,
                  default_value: item.postContent,
                  title: 'Post',
                  placeholder: 'Post Content',
                })
              }
              cardOnPress={() => {
                navigation.navigate('Post Details', {
                  user_id: item.userId,
                  post_id: item.id,
                  post_title: item.postTitle,
                  post_content: item.postContent,
                  username: item.username,
                  post_time: item.postTime,
                  download_url: item.downloadUrl,
                  avatar: item.avatar,
                  no_of_comments: item.no_of_comments,
                });
              }}
              postId={item.id}
              postTitle={item.postTitle}
              postContent={item.postContent}
              postDate={item.postTime}
              userId={item.userId}
              username={item.username}
              imageUrl={item.downloadUrl}
              navigation={navigation}
              no_of_comments={item.no_of_comments}
              avatar={item.avatar}
            />
          )}></FlatList>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  // console.log('Global State=', state);
  return {
    username: state.postListing.username,
  };
};

export default connect(mapStateToProps, {usernameSet, useridSet, avatarSet})(
  PostScreen,
);
