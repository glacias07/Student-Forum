import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';
import {FormButton, FormInput} from './common';
import firestore from '@react-native-firebase/firestore';

const SetupProfileScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [designation, setDesignation] = useState();
  const [workplace, setWorkplace] = useState();

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

export default SetupProfileScreen;
