import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [myData, setMyData] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },
        register: async (email, password, username) => {
          try {
            const doLogin = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            console.log('User Registered Successfully');
            if (doLogin.user) {
              firestore()
                .collection('userDetails')
                .doc(doLogin.user.uid)
                .set({
                  userId: doLogin.user.uid,
                  username: username,
                  avatar: 'https://robohash.org/' + username,
                })
                .then(() => {
                  console.log('Details Added');
                  onLogin();
                })
                .catch(e => {
                  console.log('Error in the firestore: ', e);
                });
            }

            const onLogin = async () => {
              try {
                const database = getDatabase();
                //first check if the user registered before

                const user = await findUser(username);

                //create a new user if not registered
                if (user) {
                  setMyData(user);
                } else {
                  const newUserObj = {
                    username: username,
                    avatar: 'https://robohash.org/' + username,
                  };

                  set(ref(database, `users/${username}`), newUserObj);
                  setMyData(newUserObj);
                }

                // set friends list change listener
                const myUserRef = ref(database, `users/${username}`);
                onValue(myUserRef, snapshot => {
                  const data = snapshot.val();
                  setUsers(data.friends);
                  setMyData(prevData => ({
                    ...prevData,
                    friends: data.friends,
                  }));
                });
                // setCurrentPage('users');
              } catch (error) {
                console.error(error);
              }
            };

            const findUser = async name => {
              const database = getDatabase();

              const mySnapshot = await get(ref(database, `users/${name}`));

              return mySnapshot.val();
            };
          } catch (e) {
            console.log('Error uploading user details', e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        updateUserDetails: async username => {
          firestore()
            .collection('userDetails')
            .doc(user.uid)
            .update({
              username,
            })
            .then(() => {
              console.log('User Updated!');
              Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.',
              );
            });
        },
        updatePostDetails: async (postContent, postId) => {
          firestore()
            .collection('posts')
            .doc(postId)
            .update({
              postContent,
            })
            .then(() => {
              console.log('Post Updated!');
            });
        },
        updateCommentDetails: async (comment, commentId, postId) => {
          firestore()
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .doc(commentId)
            .update({
              comment,
            })
            .then(() => {
              console.log('Comment Updated!');
            });
        },
        postThisCommentToFirebase: async (
          comment_user_id,
          comment,
          username,
          avatar,
          no_of_comments,
          post_id,
        ) => {
          firestore()
            .collection('posts')
            .doc(post_id)
            .collection('comments')
            .add({
              comment_user_id,
              comment,
              username,
              avatar,
              comment_time: firestore.Timestamp.fromDate(new Date()),
              no_of_replies: 0,
            })
            .then(() => {
              console.log('Comment added to the firebase succesfully'),
                firestore()
                  .collection('posts')
                  .doc(post_id)
                  .update({no_of_comments});
            })
            .catch(e => {
              console.log('Error adding comment to firebase: ', e);
            });
        },
        postThisReplyToFirebase: async (
          reply_user_id,
          reply,
          username,
          avatar,
          no_of_replies,
          parent_comment_id,
          post_id,
        ) => {
          firestore()
            .collection('posts')
            .doc(post_id)
            .collection('comments')
            .doc(parent_comment_id)
            .collection('replies')
            .add({
              reply_user_id,
              reply,
              username,
              avatar,
              reply_time: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              {
                console.log('Reply added to the firebase succesfully'),
                  firestore()
                    .collection('posts')
                    .doc(post_id)
                    .collection('comments')
                    .doc(parent_comment_id)
                    .update({no_of_replies});
              }
            })
            .catch(e => {
              console.log('Error adding reply to firebase: ', e);
            });
        },
        updatePostComments: async (updatedComments, post_id) => {
          firestore()
            .collection('posts')
            .doc(post_id)
            .update({
              comments: updatedComments,
            })
            .then(() => {
              console.log('Post Comments Updated!');
            });
        },
        updateUserPostsDetails: async (doc_id, username) => {
          console.log('executing updateUserPostsDetails');
          firestore()
            .collection('posts')
            .doc(doc_id)
            .update({
              username: username,
            })
            .then(() => {
              console.log('User details updated on user made posts!');
            });
        },
        submitPost: async (
          userid,
          username,
          postTitle,
          postContent,
          imageUrl = null,
          avatar = 'https://robohash.org/' + username,
        ) => {
          console.log(avatar);
          firestore()
            .collection('posts')
            .add({
              userId: userid,
              downloadUrl: imageUrl,
              username: username,
              postTitle: postTitle,
              postContent: postContent,
              postTime: firestore.Timestamp.fromDate(new Date()),
              no_of_comments: 0,
              avatar: avatar,
            })
            .then(() => {
              console.log('Post Added');
            })
            .catch(e => {
              console.log('Error in the firestore: ', e);
            });
        },
        submitComment: async (commentid, userid, username, comment) => {
          firestore()
            .collection('comments')
            .add({
              userId: userid,
              username: username,
              comment: comment,
              commentTime: firestore.Timestamp.fromDate(new Date()),
            })
            .then(() => {
              console.log('Comment Added');
            })
            .catch(e => {
              console.log('Error in the firestore: ', e);
            });
        },
        onAddFriend: async (name, username, navigation) => {
          try {
            //find user and add it to my friends and also add me to his friends
            const database = getDatabase();
            const findUser = async name => {
              const database = getDatabase();

              const mySnapshot = await get(ref(database, `users/${name}`));

              return mySnapshot.val();
            };
            const chatUser = await findUser(name);
            const myUsername = await findUser(username);

            if (chatUser) {
              if (
                myUsername.friends &&
                chatUser.friends.filter(f => f.username === myUsername.username)
                  .length > 0
              ) {
                // don't let chatUser add a chatUser twice
                // Alert.alert('This is already your friend, go to your chats');
                const friendData = myUsername.friends.filter(
                  f => f.username == chatUser.username,
                );

                navigation.navigate('Personal Message', {
                  username: chatUser.username,
                  myData: myUsername,
                  friendData: friendData[0],
                });
                // console.log('Username from Auth',chatUser.username)
                // console.log('myData from Auth',myUsername)
                // console.log('friendData from Auth',friendData[0])
                return;
              }

              // create a chatroom and store the chatroom id

              const newChatroomRef = push(ref(database, 'chatrooms'), {
                firstUser: myUsername.username,
                secondUser: chatUser.username,
                messages: [],
              });

              const newChatroomId = newChatroomRef.key;

              const userFriends = chatUser.friends || [];
              //join myself to this chatUser friend list
              update(ref(database, `users/${chatUser.username}`), {
                friends: [
                  ...userFriends,
                  {
                    username: myUsername.username,
                    avatar: myUsername.avatar,
                    chatroomId: newChatroomId,
                  },
                ],
              });

              const myFriends = myUsername.friends || [];
              //add this chatUser to my friend list
              update(ref(database, `users/${myUsername.username}`), {
                friends: [
                  ...myFriends,
                  {
                    username: chatUser.username,
                    avatar: chatUser.avatar,
                    chatroomId: newChatroomId,
                  },
                ],
              });
              const goToChat = async (name, username, navigation) => {
                const chatUser = await findUser(name);
                const myUsername = await findUser(username);
                const friendData = myUsername.friends.filter(
                  f => f.username == chatUser.username,
                );

                navigation.navigate('Personal Message', {
                  username: chatUser.username,
                  myData: myUsername,
                  friendData: friendData[0],
                });
              };
              await goToChat(name, username, navigation);
            }
          } catch (error) {
            console.error(error);
          }
        },
        findUser: async name => {
          const database = getDatabase();

          const mySnapshot = await get(ref(database, `users/${name}`));

          return mySnapshot.val();
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
