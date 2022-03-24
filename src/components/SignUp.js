import React, {useContext, useState, Component} from 'react';
import {ScrollView, View, Alert, TouchableOpacity} from 'react-native';
import {CustomText, FormButton, FormInput} from './common';
import {AuthContext} from '../routes/AuthProvider';
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
import {usernameSet, useridSet, avatarSet} from '../actions/PostScreenActions';
import {connect} from 'react-redux';

const formValidation = (pass, cpass, email) => {
  if (email === undefined || pass === undefined || cpass === undefined) {
    return Alert.alert('Fill all the fields');
  } else if (pass !== cpass) {
    Alert.alert('Passwords dont match');
  } else if (email.replace(/^\s+|\s+$/g, '') === '') {
    Alert.alert('Email cannot contain whitespace');
  } else {
    return true;
  }
};

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [myData, setMyData] = useState(null);
  const [users, setUsers] = useState([]);
  const {user} = useContext(AuthContext);

  const {register} = useContext(AuthContext);
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

  const uploadUserDetails = async () => {
    console.log('firestore connected(setupProfileScreen.js)');
    firestore()
      .collection('userDetails')
      .doc(user.uid)
      .set({
        userId: user.uid,
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
  };

  const first = async () =>
    await register(email.replace(/^\s+|\s+$/g, ''), password);
  const second = () =>
    new Promise((resolve, reject) => {
      uploadUserDetails();
      resolve('running second function over');
    });

  async function doWork() {
    var res1 = undefined;
    var res2 = undefined;
    res1 = await first();
    console.log('log for first', res1);
    console.log('this is me logging something');
    res2 = await second();
    console.log('log for second', res2);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText
        text="Create an account"
        textSize={40}
        textWeight={700}
        textColor="#3568a6"
        style={{marginTop: -10, marginBottom: 100}}
      />
      <FormInput
        placeHolderText="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        icon={require('../assets/icons/email.png')}
        onChangeText={userEmail => setEmail(userEmail)}
      />

      <FormInput
        placeHolderText="Password"
        secureTextEntry={true}
        icon={require('../assets/icons/lock.png')}
        onChangeText={pass => setPassword(pass)}
      />
      <FormInput
        placeHolderText="Confirm Password"
        secureTextEntry={true}
        icon={require('../assets/icons/lock.png')}
        onChangeText={cpass => setConfirmPassword(cpass)}
      />
      <FormInput
        maxLength={15}
        onChangeText={username => setUsername(username)}
        placeHolderText="Username (max characters 15)"
        autoCapitalize="none"
        autoCorrect={false}
        icon={require('../assets/icons/profile.png')}
        style={{marginBottom: 12}}
      />
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (formValidation(password, confirmPassword, email)) {
            register(email.replace(/^\s+|\s+$/g, ''), password, username);
            // uploadUserDetails();
            // doWork();
          }
        }}
        // onPress={() => {
        //   doWork();
        // }}
      />
      <View style={styles.haveAnAccount}>
        <CustomText
          text="Have an account?"
          textColor="#000000"
          textWeight={700}
          textSize={18}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <CustomText
            text=" Sign In"
            textColor="#3568a6"
            textWeight={700}
            textSize={18}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: '#f9fafd',
  },
  haveAnAccount: {
    marginVertical: 35,
    flexDirection: 'row',
  },
};

const mapStateToProps = state => {
  // console.log('Global State=', state);
  return {
    username: state.postListing.username,
  };
};

export default connect(mapStateToProps, {usernameSet})(SignUp);
