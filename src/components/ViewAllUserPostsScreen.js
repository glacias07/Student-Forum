import React, {useContext, useState, useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import PostCard from './common/PostCard';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const ViewAllUserPostsScreen = ({route, navigation}) => {
  // const [deleted, setDeleted] = useState(false);

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
          onPress: () => {
            deletePost(postId), console.log('Confirm Pressed');
          },
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
        // setDeleted(true);
      })
      .catch(e => {
        console.log(
          'error deleting the post details(viewAllUserPostsScreen): ',
          e,
        );
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

  return (
    <FlatList
      data={route.params.posts}
      contentContainerStyle={{
        paddingBottom: 10,
        backgroundColor: '#e5e5e5',
      }}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5}
      renderItem={({item, index}) => (
        <>
          {index > 0 ? (
            <PostCard
              style={{marginTop: 10}}
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
          ) : (
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
          )}
        </>
      )}></FlatList>
  );
};

export default ViewAllUserPostsScreen;
