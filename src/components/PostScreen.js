import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CustomText, PostCard} from './common';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const PostScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

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
              likes,
              comments,
            } = doc.data();
            list.push({
              userId,
              username,
              downloadUrl,
              likes,
              comments,
              liked: false,
              postTitle,
              id: doc.id,
              postContent,
              postTime,
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
          text: 'Confirma',
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

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        flex: 1,
      }}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        data={posts}
        removeClippedSubviews={true}
        initialNumToRender={5}
        renderItem={({item, index}) => (
          <PostCard
            deleteOnPress={handleDelete}
            cardOnPress={() => {
              navigation.navigate('Post Details', {
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
      <TouchableOpacity
        activeOpacity={0.65}
        onPress={() => {
          navigation.navigate('Create Screen');
        }}
        style={styles.postbtn}>
        <Image
          style={styles.iconStyle}
          source={require('../assets/icons/plus.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },
  postbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#5374ff',
    height: 65,
    width: 65,
    borderRadius: 150 / 2,
  },
  flatListStyle: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 13,
    marginVertical: 10,
    backgroundColor: '#000000',
    elevation: 5,
    padding: 20,
  },
});

export default PostScreen;
