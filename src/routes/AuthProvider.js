import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

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
        updateUserDetails: async (username, bio, workplace, designation) => {
          firestore()
            .collection('userDetails')
            .doc(user.uid)
            .update({
              username,
              bio,
              workplace,
              designation,
            })
            .then(() => {
              console.log('User Updated!');
              Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.',
              );
            });
        },
        updateUserPostsDetails: async (doc_id,username) => {
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
        ) => {
          console.log(imageUrl);
          firestore()
            .collection('posts')
            .add({
              userId: userid,
              downloadUrl: imageUrl,
              username: username,
              postTitle: postTitle,
              postContent: postContent,
              postTime: firestore.Timestamp.fromDate(new Date()),
              likes: null,
              comments: null,
            })
            .then(() => {
              console.log('Post Added');
            })
            .catch(e => {
              console.log('Error in the firestore: ', e);
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
