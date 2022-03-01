import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';
import {FormButton, FormInput} from './common';
import firestore from '@react-native-firebase/firestore';

import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
import { connect } from 'react-redux';

const SetupProfileScreen = ({navigation,chatUsername}) => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [designation, setDesignation] = useState();
  const [workplace, setWorkplace] = useState();
  const [myData, setMyData] = useState(null);
  const [users, setUsers] = useState([]);

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
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
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


  const uploadUserDetails = async () => {
    console.log('firestore connected(setupProfileScreen.js)');
    firestore()
      .collection('userDetails')
      .doc(user.uid)
      .set({
        userId: user.uid,
        username: username,
        bio: bio,
        designation: designation,
        workplace: workplace,
      })
      .then(() => {
        console.log('Details Added');
        onLogin()
      })
      .catch(e => {
        console.log('Error in the firestore: ', e);
      });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 20,
      }}>
      <FormInput
        maxLength={15}
        onChangeText={username => setUsername(username)}
        placeHolderText="username (max characters 15)"
        autoCapitalize="none"
        autoCorrect={false}
        label="Username"
        onlyBottomBorder={true}
        style={{marginBottom: 12}}
      />
      <FormInput
        onChangeText={Bio => setBio(Bio)}
        placeHolderText="Bio"
        multiline={true}
        maxLength={200}
        label="Bio"
        onlyBottomBorder={true}
        style={{marginBottom: 12}}
      />
      <FormInput
        onChangeText={designation => setDesignation(designation)}
        placeHolderText="Designation"
        multiline={true}
        maxLength={200}
        label="Designation"
        onlyBottomBorder={true}
        style={{marginBottom: 12}}
      />
      <FormInput
        onChangeText={workplace => setWorkplace(workplace)}
        placeHolderText="company/school"
        multiline={true}
        maxLength={200}
        label="Workplace"
        onlyBottomBorder={true}
        style={{marginBottom: 12}}
      />
      <FormButton
        buttonTitle="Save"
        onPress={() => {
          uploadUserDetails(), navigation.navigate('Posts Screen');
        }}
      />
    </View>
  );
};

const mapStateToProps=state=>{
  return{
    chatUsername:state.postListing.chatUsername
  }
}

export default connect(mapStateToProps,{})( SetupProfileScreen)
