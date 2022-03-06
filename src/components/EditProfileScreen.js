import React, {useContext, useState, useLayoutEffect} from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';
import {CustomHeaderButton, FormInput} from './common';

const EditProfile = ({navigation, route}) => {
  const {updateUserDetails, updateUserPostsDetails} = useContext(AuthContext);

  const [username, setUsername] = useState(route.params.userDetails.username);
  const [postsIdsArray, setPostsIdsArray] = useState(() => {
    const list = [];
    route.params.posts.forEach((item, index, array) => {
      list.push(route.params.posts[index].id);
    });
    return list;
  });
  const [bio, setBio] = useState(route.params.userDetails.bio);
  const [designation, setDesignation] = useState(
    route.params.userDetails.designation,
  );
  const [workplace, setWorkplace] = useState(
    route.params.userDetails.workplace,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          onPress={() => navigation.goBack()}
          icon={require('../assets/icons/cancel.png')}
        />
      ),
      headerRight: () => (
        <CustomHeaderButton
          onPress={() => {
            navigation.goBack(),
              updateUserDetails(username, bio, workplace, designation);
            postsIdsArray.forEach((item, index, array) => {
              updateUserPostsDetails(postsIdsArray[index], username);
            });
          }}
          icon={require('../assets/icons/tick.png')}
          tintColor="blue"
          height={20}
          width={20}
        />
      ),
    });
  });

  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => console.log('image was clicked')}>
          <Image
            source={require('../assets/images/profile.png')}
            style={{
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              aspectRatio: 1,
              height: 150,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
        </TouchableOpacity>
        <FormInput
          label="Username"
          onlyBottomBorder={true}
          maxLength={15}
          value={username}
          onChangeText={username => setUsername(username)}
          placeHolderText="username (max characters 15)"
          autoCapitalize="none"
          autoCorrect={false}
          style={{marginBottom: 12}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
