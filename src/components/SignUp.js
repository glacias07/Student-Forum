import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  CustomHeaderButton,
  CustomText,
  FormButton,
  FormInput,
  TextField,
} from './common';
import {AuthContext} from '../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {usernameSet, useridSet, avatarSet} from '../actions/PostScreenActions';
import {connect} from 'react-redux';
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
  );
  const [myData, setMyData] = useState(null);
  const [users, setUsers] = useState([]);
  const [atTheEnd, setAtTheEnd] = useState(false);
  const [marginTopForFlatList, setMarginTopForFlatList] = useState(0);
  const [usernameNotAvailable, setUsernameNotAvailable] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsWeak, setPasswordIsWeak] = useState(false);
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const {user, register, findUser} = useContext(AuthContext);

  const scrollToAvatars = useRef(null);

  const formValidation = (pass, email) => {
    if (email === undefined || pass === undefined) {
      return Alert.alert('Fill all the fields');
    } else if (email.replace(/^\s+|\s+$/g, '') === '') {
      Alert.alert('Email cannot contain whitespace');
    } else {
      return true;
    }
  };

  const scrollToEndHorizontally = () => {
    setAtTheEnd(true);
  };
  const scrollToStartHorizontally = () => {
    setAtTheEnd(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setMarginTopForFlatList(-Dimensions.get('window').height / 3.8);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMarginTopForFlatList(0);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const Avatars = [
    {
      id: 1,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 2,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F2.png?alt=media&token=c97af191-e962-44cc-b0e4-abfa1bf8ffdb',
    },
    {
      id: 3,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F3.png?alt=media&token=23bf9ab1-7e00-4bfc-b90e-d4d420f3e5be',
    },
    {
      id: 4,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F4.png?alt=media&token=185b2fbf-0e7c-44e0-aae0-e631b2c09768',
    },
    {
      id: 5,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F7.png?alt=media&token=75747cc8-ff46-4324-a8a8-a2eec4525557',
    },
    {
      id: 6,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F6.png?alt=media&token=0b636e12-0cf7-48ec-8181-41c46eb815a2',
    },
    {
      id: 7,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F1.png?alt=media&token=04e37404-9211-43ac-b491-996ecb594f1c',
    },
    {
      id: 8,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F2.png?alt=media&token=c3d1d833-fa9d-4239-ad86-345327b1489c',
    },
    {
      id: 9,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F3.png?alt=media&token=ad5c4f45-e6e5-46c0-a776-d65ebd6401ce',
    },
    {
      id: 10,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F4.png?alt=media&token=77cae0bc-1a5a-4959-8acb-44513818bac7',
    },
    {
      id: 11,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F5.png?alt=media&token=daab821f-3fa2-4a73-83d6-ff423e5d2f3b',
    },
    {
      id: 12,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FGirls%2F7.png?alt=media&token=39db3077-86ff-424a-8d09-9fa3be090fe1',
    },
  ];

  const checkIfUsernameAvailable = async checkingUsername => {
    try {
      // console.log(usernameIsInvalid);
      if (!usernameIsInvalid) {
        const database = getDatabase();
        const user = await findUser(checkingUsername);
        if (checkingUsername == '') {
          // console.log(checkingUsername, 'empty');
          setUsernameNotAvailable(false);
        } else if (user) {
          // console.log(checkingUsername, 'exists');
          setUsernameNotAvailable(true);
        } else {
          // console.log(checkingUsername, 'not exists');
          setUsernameNotAvailable(false);
        }
      }
    } catch (error) {
      console.error('Error in firebase', error);
    }
  };

  const validateUsername = checkUsername => {
    if (
      String(checkUsername)
        .toLowerCase()
        .match(/^[a-zA-Z0-9_]+$/)
    ) {
      // console.log('good');
      setUsernameIsInvalid(false);
    } else {
      // console.log('bad');
      setUsernameIsInvalid(true);
    }
  };

  const validateEmail = email => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setEmailIsInvalid(false);
    } else {
      setEmailIsInvalid(true);
    }
  };

  const validatePassword = password => {
    if (
      String(password).match(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
    ) {
      setPasswordIsWeak(false);
      // console.log('good pass');
    } else {
      setPasswordIsWeak(true);
      // console.log('bad pass');
    }
  };

  return (
    <View
      style={{
        marginTop: marginTopForFlatList,
        flex: 1,
        backgroundColor: '#0062cd',
      }}>
      <View
        style={{
          height: 250,
          width: 250,
          borderRadius: 150,
          backgroundColor: '#025ab4',
          position: 'absolute',
          right: -125,
          top: -125,
        }}></View>
      <View
        style={{
          height: 150,
          width: 150,
          borderRadius: 150,
          backgroundColor: '#0062cd',
          position: 'absolute',
          right: -75,
          top: -75,
        }}></View>
      <View style={{padding: 20, marginTop: 55}}>
        <CustomText
          text="Create your account"
          textColor={'#ffffff'}
          textSize={25}
          textWeight={500}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <CustomText
            text="Do you already have an account ?"
            textColor={'#ffffff'}
            textSize={18}
            textWeight={400}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <CustomText
              text=" Sign In"
              textColor="#dab54e"
              textWeight={700}
              textSize={18}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        ref={scrollToAvatars}
        scrollEnabled={false}
        style={{
          backgroundColor: '#ffffff',
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
        }}>
        {!atTheEnd ? (
          <>
            <CustomText
              text="E-mail"
              textColor="#949494"
              textWeight={500}
              textSize={16}
              style={{marginBottom: 2}}
            />
            <FormInput
              placeHolderText="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              icon={require('../assets/icons/email.png')}
              onChangeText={userEmail => {
                setEmail(userEmail);
                validateEmail(userEmail);
              }}
            />
            {emailIsInvalid ? (
              <CustomText
                textColor={'red'}
                text="Oops, fix your email."
                textSize={14}
                textWeight={400}
                style={{marginLeft: 8, marginBottom: 5}}
              />
            ) : null}
            <CustomText
              text="Username"
              textColor="#949494"
              textWeight={500}
              textSize={16}
              style={{marginBottom: 2}}
            />
            <FormInput
              maxLength={15}
              onChangeText={username => {
                setUsername(username.toLowerCase());
                checkIfUsernameAvailable(username.toLowerCase());
                validateUsername(username);
              }}
              value={username}
              placeHolderText="Username (max characters 15)"
              autoCapitalize="none"
              autoCorrect={false}
              icon={require('../assets/icons/profile.png')}
            />
            {usernameNotAvailable ? (
              <CustomText
                textColor={'red'}
                text="That username is already taken."
                textSize={14}
                textWeight={400}
                style={{marginLeft: 8, marginBottom: 5}}
              />
            ) : null}
            {usernameIsInvalid ? (
              <CustomText
                textColor={'red'}
                text="Letters, numbers and underscores only. Please try again without symbols"
                textSize={14}
                textWeight={400}
                style={{marginLeft: 8, marginBottom: 5}}
              />
            ) : null}

            <CustomText
              text="Password"
              textColor="#949494"
              textWeight={500}
              textSize={16}
              style={{marginBottom: 2}}
            />
            <FormInput
              placeHolderText="Password"
              secureTextEntry={true}
              icon={require('../assets/icons/lock.png')}
              onChangeText={pass => {
                setPassword(pass);
                validatePassword(pass);
              }}
              value={password}
            />
            {passwordIsWeak ? (
              <CustomText
                textColor={'red'}
                text="Choose a password that includes an alphabet, number a special character and has a length of 16-20."
                textSize={14}
                textWeight={400}
                style={{marginLeft: 8, marginBottom: 5}}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => {
                if (formValidation(password, email)) {
                  scrollToEndHorizontally();
                }
              }}
              // onPress={() => {
              //   if (1 == 1) {
              //     scrollToEndHorizontally();
              //   }
              // }}
              style={{
                width: '100%',
                backgroundColor: '#ffc33a',
                paddingVertical: 14,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                height: 60,
                marginTop: '3%',
              }}>
              <CustomText
                text="Next"
                textSize={22}
                textWeight={700}
                textColor="#414b5a"
              />
            </TouchableOpacity>
          </>
        ) : null}
        {atTheEnd ? (
          <>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <CustomHeaderButton
                onPress={() => scrollToStartHorizontally()}
                icon={require('../assets/icons/back.png')}
                height={20}
                width={20}
                style={{
                  marginBottom: 15,
                  backgroundColor: '#00000040',
                  width: 35,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 150 / 2,
                }}
              />
              <View>
                <CustomText
                  textColor={'#000000'}
                  textWeight={700}
                  textSize={20}
                  text="Choose an avatar"
                  style={{marginLeft: 15, marginTop: 3}}
                />
                <CustomText
                  textColor={'#807e7e'}
                  textWeight={500}
                  textSize={16}
                  text="Choose an expressive avatar for your account profile"
                  style={{marginLeft: 15, marginTop: 3, paddingRight: 25}}
                />
              </View>
            </View>

            <View
              style={{
                // marginLeft: 10,
                height: Dimensions.get('window').height / 2,
                // marginBottom: 100,
              }}>
              <FlatList
                numColumns={4}
                style={{marginBottom: 20}}
                contentContainerStyle={{
                  paddingBottom: 20,
                  alignSelf: 'center',
                }}
                showsVerticalScrollIndicator={false}
                data={Avatars}
                removeClippedSubviews={true}
                renderItem={({item}) => (
                  <>
                    {avatar == item.avatar ? (
                      <TouchableOpacity onPress={() => setAvatar(item.avatar)}>
                        <Image
                          blurRadius={15}
                          style={{
                            height: Dimensions.get('window').width / 7,
                            width: Dimensions.get('window').width / 7,
                            margin: 10,
                          }}
                          source={{uri: item.avatar}}
                        />
                        <Image
                          style={{
                            height: Dimensions.get('window').width / 15,
                            width: Dimensions.get('window').width / 15,
                            margin: 10,
                            tintColor: '#ffffff',
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '25%',
                          }}
                          source={require('../assets/icons/fat-tick.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => setAvatar(item.avatar)}>
                        <Image
                          style={{
                            height: Dimensions.get('window').width / 7,
                            width: Dimensions.get('window').width / 7,
                            margin: 10,
                          }}
                          source={{uri: item.avatar}}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}></FlatList>
              <TouchableOpacity
                onPress={() => {
                  if (formValidation(password, email)) {
                    register(
                      email.replace(/^\s+|\s+$/g, ''),
                      password,
                      username,
                      avatar,
                    );
                  }
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#ffc33a',
                  paddingVertical: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 10,
                  height: 60,
                }}>
                <CustomText
                  text="Sign Up"
                  textSize={22}
                  textWeight={700}
                  textColor="#414b5a"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>

      {/* <View style={styles.haveAnAccount}>
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
      </View> */}
    </View>
  );
};

const styles = {
  container: {
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: '#0062cd',
    marginTop: 0,
  },
  haveAnAccount: {
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
