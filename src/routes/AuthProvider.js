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
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            console.log('User Registered Successfully');
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        updateUserDetails: async (username) => {
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
          avatar = 'https://robohash.org/' + username
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
              comments: [],
              avatar: avatar
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
        onAddFriend: async (name, username) => {
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
                Alert.alert('This is already your friend, go to your chats');
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
            }
          } catch (error) {
            console.error(error);
          }
        },

        //FindUser
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
