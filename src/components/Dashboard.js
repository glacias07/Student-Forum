import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import {CustomText, FormButton, SmallButton} from './common';
import {AuthContext} from '../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';

import PostCard from './common/PostCard';

const Dashboard = ({navigation, username, avatar}) => {
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
              flair,
              flairColor,
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
              flair,
              flairColor,
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

  useEffect(() => {
    fetchPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    navigation.addListener('focus', () => setLoading(!loading));
    setDeleted(false);
  }, [navigation, loading, deleted]);

  return (
    <ScrollView>
      <View style={{backgroundColor: '#025ab4', zIndex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            zIndex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#ffffff',
                  marginRight: 15,
                  marginLeft: 15,
                }}
                source={require('../assets/icons/back.png')}
              />
            </TouchableOpacity>
            <CustomText
              text="Dashboard"
              textColor={'#ffffff'}
              textSize={22}
              textWeight={500}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Profile', {
                  username: username,
                  avatar: avatar,
                  // posts: posts,
                });
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#ffffff',
                  marginRight: 15,
                  marginLeft: 15,
                }}
                source={require('../assets/icons/edit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logout();
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#ffffff',
                  marginRight: 15,
                  marginLeft: 15,
                }}
                source={require('../assets/icons/logout.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 500,
            width: 600,
            borderRadius: 250,
            backgroundColor: '#0063c6',
            position: 'absolute',
            top: -250,
            left: -190,
          }}></View>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={{uri: avatar}}
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
            }}
          />
          <CustomText
            text={username}
            textColor="#ffffff"
            textSize={30}
            textWeight={500}
            style={{alignSelf: 'center', marginBottom: 100}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 20,
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 10,
              position: 'absolute',
              bottom: '-15%',
              alignSelf: 'center',
              elevation: 3,
              // zIndex: 1,
            }}>
            <View style={{alignItems: 'center'}}>
              <CustomText
                textSize={22}
                textWeight={500}
                textColor="#3e3f53"
                text={posts.length}
              />
              <CustomText
                text="posts"
                textSize={18}
                textWeight={500}
                textColor="#656567"
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomText
                textSize={22}
                textWeight={500}
                textColor="#3e3f53"
                text="134"
              />
              <CustomText
                text="followers"
                textSize={18}
                textWeight={500}
                textColor="#656567"
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <CustomText
                textSize={22}
                textWeight={500}
                textColor="#3e3f53"
                text="54"
              />
              <CustomText
                text="following"
                textSize={18}
                textWeight={500}
                textColor="#656567"
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#eaecef',
          paddingTop: 55,
          paddingHorizontal: 25,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomText
          textSize={20}
          textWeight={500}
          textColor={'#3e3f53'}
          text={'Your Posts'}
        />
        <TouchableOpacity
          style={{alignItems: 'center', flexDirection: 'row'}}
          onPress={() => {
            navigation.navigate('All Posts', {posts: posts});
          }}>
          <CustomText
            textSize={15}
            textWeight={500}
            textColor={'#2578cc'}
            text={'View All '}
          />
          <Image
            style={{height: 15, width: 15, tintColor: '#2578cc'}}
            source={require('../assets/icons/next.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 10,
          backgroundColor: '#e5e5e5',
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        data={posts.slice(0, 3)}
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
                    flair:item.flair,
                    flairColor:item.flairColor
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
                    flair:item.flair,
                    flairColor:item.flairColor
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
            )}
          </>
        )}></FlatList>
      {/* <FlatList
        scrollEnabled={false}
        data={posts.slice(0, 3)}
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
      /> */}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  // console.log('Global State=', state);
  return {
    username: state.postListing.username,
    avatar: state.postListing.avatar,
  };
};

export default connect(mapStateToProps, {})(Dashboard);
{
  /* <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignSelf: 'center'
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
        </View> */
}
// <SectionList
//   style={{
//     backgroundColor: '#ffffff',
//     flex: 1,
//   }}
//   sections={[
//     {
//       title: 'Your posts',
//       data: posts.slice(0, 3),
//     },
//   ]}
//   renderSectionHeader={({section}) => (
//     <View>
//       {userDetails.map(item => (
//     <View key={'unique' } style={{backgroundColor: '#025ab4'}}>
//     <View
// style={{
//   height: 500,
//   width: 600,
//   borderRadius: 250,
//   backgroundColor: '#0063c6',
//   position: 'absolute',
//   top: -250,
//   left: -190
// }}></View>
//         <View >
//           <Image
//             source={{uri: item.avatar}}
//             style={{

//               width:150,
//               height: 150,
//               alignSelf: 'center',
//             }}
//           />
//           <CustomText
//             text={item.username}
//             textColor="#ffffff"
//             textSize={30}
//             textWeight={500}
//             style={{alignSelf: 'center', marginBottom: 100}}
//           />
//         </View>
//         {/* <View
//           style={{
//             flexDirection: 'row',
//             marginTop: 15,
//             alignSelf: 'center'
//           }}>
//           <SmallButton
//             onPress={() => {
//               // window.setTimeout (()=>{setPostsIdsArray(posts);},0)
//               navigation.navigate('Edit Profile', {
//                 userDetails: item,
//                 posts: posts,
//               });
//             }}
//             title="Edit"
//             icon={require('../assets/icons/edit.png')}
//           />
//           <SmallButton
//             onPress={() => {
//               logout();
//             }}
//             style={{marginLeft: 15}}
//             title="Logout"
//             icon={require('../assets/icons/logout.png')}
//           />
//         </View> */}
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           borderWidth: 1,
//           borderColor: '#eaeaea',
//           paddingVertical: 20,
//           backgroundColor: 'white'
//         }}>
//         <View>
//           <CustomText
//             textSize={20}
//             textWeight={500}
//             textColor="#3e3f53"
//             text={posts.length}
//           />
//           <CustomText
//             text="posts"
//             textSize={14}
//             // textWeight={500}
//             textColor="#656567"
//           />
//         </View>
//         <View>
//           <CustomText
//             textSize={20}
//             textWeight={500}
//             textColor="#3e3f53"
//             text="134"
//           />
//           <CustomText
//             text="followers"
//             textSize={14}
//             // textWeight={500}
//             textColor="#656567"
//           />
//         </View>
//         <View>
//           <CustomText
//             textSize={20}
//             textWeight={500}
//             textColor="#3e3f53"
//             text="54"
//           />
//           <CustomText
//             text="following"
//             textSize={14}
//             // textWeight={500}
//             textColor="#656567"
//           />
//         </View>
//       </View>
//     </View>
//       ))}
//       <View
//         style={{
//           borderBottomWidth: 1,
//           borderColor: '#eaeaea',
//           flexDirection: 'row',
//           paddingHorizontal: 25,
//           paddingVertical: 15,
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//         <CustomText
//           textSize={22}
//           textWeight={400}
//           textColor={'#3e3f53'}
//           text={section.title}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('All Posts', {posts: posts});
//           }}>
//           <CustomText
//             textSize={15}
//             textWeight={400}
//             textColor={'#3e3f53'}
//             text={'View All >'}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   )}
//   renderItem={({item}) => (
//     <PostCard
//       deleteOnPress={handleDelete}
//       cardOnPress={() => {
//         navigation.navigate('Post Details', {
//           user_id: item.userId,
//           post_id: item.id,
//           post_title: item.postTitle,
//           post_content: item.postContent,
//           username: item.username,
//           post_time: item.postTime,
//           download_url: item.downloadUrl,
//           avatar: item.avatar,
//         });
//       }}
//       postId={item.id}
//       postTitle={item.postTitle}
//       postContent={item.postContent}
//       postDate={item.postTime}
//       userId={item.userId}
//       username={item.username}
//       imageUrl={item.downloadUrl}
//       avatar={item.avatar}
//     />
//   )}
// />
