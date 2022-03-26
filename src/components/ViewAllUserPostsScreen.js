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
        console.log('Deleted ');
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
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}
      data={route.params.posts}
      renderItem={({item, index}) => (
        <PostCard
          deleteOnPress={handleDelete}
          cardOnPress={() => {
            navigation.navigate('PostDetails', {
              user_id: item.userId,
              post_id: item.id,
              post_title: item.postTitle,
              post_content: item.postContent,
              username: item.username,
              post_time: item.postTime,
              download_url: item.downloadUrl,
            });
          }}
          postId={item.id}
          postTitle={item.postTitle}
          postContent={item.postContent}
          postDate={item.postTime}
          userId={item.userId}
          username={item.username}
          imageUrl={item.downloadUrl}
        />
      )}></FlatList>
  );
};

export default ViewAllUserPostsScreen;
