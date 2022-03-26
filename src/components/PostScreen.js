import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
// import {CustomText, PostCard} from './common';
import PostCard from './common/PostCard';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import {
  usernameSet,
  useridSet,
  avatarSet,
  filterModalVisibleSet,
} from '../actions/PostScreenActions';
import {CustomText} from './common';
import HomeScreenShimmer from './HomeScreenShimmer';
import Flair from './common/Flair';

const PostScreen = ({
  navigation,
  usernameSet,
  useridSet,
  avatarSet,
  filter_modal_visible,
  filterModalVisibleSet,
}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const {user} = useContext(AuthContext);
  const [flair, setFlair] = useState(null);
  const [flairColor, setFlairColor] = useState('');

  // const dispatch = useDispatch();
  const flairData = [
    {id: '1', flair: 'general', color: 'orange'},
    {id: '2', flair: 'ask', color: 'red'},
    {id: '3', flair: 'help', color: 'darkgreen'},
    {id: '4', flair: 'harrasment', color: 'black'},
    {id: '5', flair: 'bullying', color: 'purple'},
    {id: '6', flair: 'happy', color: '#ffc20a'},
  ];
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
              flair,
              flairColor,
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
              flair,
              flairColor,
            });
          });
        });
      setPosts(list);
      // console.log("List",list)

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
      // console.log('User details ', list);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={filter_modal_visible}
        onRequestClose={() => {
          !filter_modal_visible;
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              filterModalVisibleSet(!filter_modal_visible);
            }}
            style={{
              backgroundColor: '#00000040',
              width: '100%',
              flex: 1,
            }}></TouchableOpacity>
          <View
            style={{
              height: 350,
              backgroundColor: '#EEEFFF',
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                height: 50,
                width: '100%',
                elevation: 2,
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText
                text="Filters"
                textWeight={500}
                textSize={18}
                textColor="#515159"
              />
              <TouchableOpacity
                onPress={() => {
                  setFlair(null);
                  filterModalVisibleSet(false);
                }}>
                <CustomText
                  text="Clear all"
                  textWeight={500}
                  textSize={18}
                  textColor="#515159"
                />
              </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
              <FlatList
                data={flairData}
                numColumns={3}
                renderItem={({item}) => (
                  <Flair
                    flairOnPress={() => {
                      setFlair(item.flair), setFlairColor(item.color);
                    }}
                    flair={item.flair}
                    color={item.color}
                    textColor={item.textColor}
                    style={{alignSelf: 'baseline'}}
                    // style={flair == item.flair ? {elevation: 3} : null}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => filterModalVisibleSet(false)}
              style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText text="CLOSE" textWeight={700} />
            </TouchableOpacity>
            <CustomText
              text="|"
              textWeight={500}
              textSize={20}
              textColor="#E4EFF0"
            />
            <TouchableOpacity
              onPress={() => filterModalVisibleSet(false)}
              style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText text="APPLY" textWeight={700} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {posts == null ? (
        <HomeScreenShimmer />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{
              backgroundColor: '#e5e5e5',
            }}
            showsVerticalScrollIndicator={false}
            data={posts}
            removeClippedSubviews={true}
            initialNumToRender={5}
            renderItem={({item, index}) => (
              <>
                {flair == null ? (
                  <PostCard
                    style={{marginBottom: 10}}
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
                      navigation.navigate('PostDetails', {
                        user_id: item.userId,
                        post_id: item.id,
                        post_title: item.postTitle,
                        post_content: item.postContent,
                        username: item.username,
                        post_time: item.postTime,
                        download_url: item.downloadUrl,
                        avatar: item.avatar,
                        no_of_comments: item.no_of_comments,
                        flair: item.flair,
                        flairColor: item.flairColor,
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
                    flair={item.flair}
                    flairColor={item.flairColor}
                  />
                ) : flair == item.flair ? (
                  <PostCard
                    style={{marginBottom: 10}}
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
                      navigation.navigate('PostDetails', {
                        user_id: item.userId,
                        post_id: item.id,
                        post_title: item.postTitle,
                        post_content: item.postContent,
                        username: item.username,
                        post_time: item.postTime,
                        download_url: item.downloadUrl,
                        avatar: item.avatar,
                        no_of_comments: item.no_of_comments,
                        flair: item.flair,
                        flairColor: item.flairColor,
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
                    flair={item.flair}
                    flairColor={item.flairColor}
                  />
                ) : null}
              </>
            )}></FlatList>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  // console.log('Global State=', state);
  return {
    username: state.postListing.username,
    filter_modal_visible: state.postListing.filter_modal_visible,
  };
};

export default connect(mapStateToProps, {
  usernameSet,
  useridSet,
  avatarSet,
  filterModalVisibleSet,
})(PostScreen);
