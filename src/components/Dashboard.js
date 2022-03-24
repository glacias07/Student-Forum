import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  SectionList,
} from 'react-native';
import {CustomText, FormButton, SmallButton} from './common';
import {AuthContext} from '../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// import {PostCard} from './common';
import PostCard from './common/PostCard';

const Dashboard = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', user.uid)
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
              avatar,
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
              avatar,
            });
          });
        });
      setPosts(list);
    } catch (error) {
      console.log('Error while fetching posts', error);
    }
  };

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
        console.log('error deleting the post details(dashboard): ', e);
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
  var list = [];
  const fetchUserDetails = async () => {
    try {
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
      setUserDetails(list);

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error while fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUserDetails();
    navigation.addListener('focus', () => setLoading(!loading));
    setDeleted(false);
  }, [navigation, loading, deleted]);

  return (
    <SectionList
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}
      sections={[
        {
          title: 'Your posts',
          data: posts.slice(0, 3),
        },
      ]}
      renderSectionHeader={({section}) => (
        <View>
          {userDetails.map(item => (
            <View key={'unique'}>
              <View
                style={{
                  marginVertical: 20,
                }}>
                <View>
                  <Image
                    source={{uri: item.avatar}}
                    style={{
        
                      width:150,
                      height: 150,
                      alignSelf: 'center',
                    }}
                  />
                  <CustomText
                    text={item.username}
                    textColor="#3e3f53"
                    textSize={30}
                    textWeight={400}
                    style={{alignSelf: 'center'}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    alignSelf: 'center',
                  }}>
                  <SmallButton
                    onPress={() => {
                      // window.setTimeout (()=>{setPostsIdsArray(posts);},0)
                      navigation.navigate('Edit Profile', {
                        userDetails: item,
                        posts: posts,
                      });
                    }}
                    title="Edit"
                    icon={require('../assets/icons/edit.png')}
                  />
                  <SmallButton
                    onPress={() => {
                      logout();
                    }}
                    style={{marginLeft: 15}}
                    title="Logout"
                    icon={require('../assets/icons/logout.png')}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  borderWidth: 1,
                  borderColor: '#eaeaea',
                  paddingVertical: 20,
                }}>
                <View>
                  <CustomText
                    textSize={20}
                    textWeight={500}
                    textColor="#3e3f53"
                    text={posts.length}
                  />
                  <CustomText
                    text="posts"
                    textSize={14}
                    // textWeight={500}
                    textColor="#656567"
                  />
                </View>
                <View>
                  <CustomText
                    textSize={20}
                    textWeight={500}
                    textColor="#3e3f53"
                    text="134"
                  />
                  <CustomText
                    text="followers"
                    textSize={14}
                    // textWeight={500}
                    textColor="#656567"
                  />
                </View>
                <View>
                  <CustomText
                    textSize={20}
                    textWeight={500}
                    textColor="#3e3f53"
                    text="54"
                  />
                  <CustomText
                    text="following"
                    textSize={14}
                    // textWeight={500}
                    textColor="#656567"
                  />
                </View>
              </View>
            </View>
          ))}
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#eaeaea',
              flexDirection: 'row',
              paddingHorizontal: 25,
              paddingVertical: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              textSize={22}
              textWeight={400}
              textColor={'#3e3f53'}
              text={section.title}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('All Posts', {posts: posts});
              }}>
              <CustomText
                textSize={15}
                textWeight={400}
                textColor={'#3e3f53'}
                text={'View All >'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      renderItem={({item}) => (
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
              avatar: item.avatar,
            });
          }}
          postId={item.id}
          postTitle={item.postTitle}
          postContent={item.postContent}
          postDate={item.postTime}
          userId={item.userId}
          username={item.username}
          imageUrl={item.downloadUrl}
          avatar={item.avatar}
        />
      )}
    />
  );
};

export default Dashboard;
