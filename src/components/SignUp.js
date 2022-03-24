import React, {useContext, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import {CustomHeaderButton, CustomText, FormButton, FormInput} from './common';
import {AuthContext} from '../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {usernameSet, useridSet, avatarSet} from '../actions/PostScreenActions';
import {connect} from 'react-redux';

const formValidation = (pass, email) => {
  if (email === undefined || pass === undefined) {
    return Alert.alert('Fill all the fields');
  } else if (email.replace(/^\s+|\s+$/g, '') === '') {
    Alert.alert('Email cannot contain whitespace');
  } else {
    return true;
  }
};

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();
  const [myData, setMyData] = useState(null);
  const [users, setUsers] = useState([]);
  const [atTheEnd, setAtTheEnd] = useState(false);

  const {user, register} = useContext(AuthContext);
  const scrollToAvatars = useRef(null);
  const scrollToEndHorizontally = () => {
    scrollToAvatars.current.scrollTo({
      x: Dimensions.get('window').width,
      y: 0,
      animated: true,
    });
    setAtTheEnd(true);
  };
  const scrollToStartHorizontally = () => {
    scrollToAvatars.current.scrollTo({x: 0, y: 0, animated: true});
    setAtTheEnd(false);
  };

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
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 8,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 9,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 10,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 11,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
    {
      id: 12,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/student-forum-57d6b.appspot.com/o/Avatars%2FBoys%2F1.png?alt=media&token=8c38050d-595f-4231-86e8-a47273028817',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText
        text="Create an account"
        textSize={40}
        textWeight={700}
        textColor="#3568a6"
        style={{marginBottom: 80}}
      />
      {atTheEnd ? (
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
      ) : (
        <View
          style={{
            height: 50,
          }}></View>
      )}

      <ScrollView
        horizontal={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollToAvatars}>
        <View style={{width: Dimensions.get('window').width / 1.11}}>
          <FormInput
            maxLength={15}
            onChangeText={username => setUsername(username)}
            placeHolderText="Username (max characters 15)"
            autoCapitalize="none"
            autoCorrect={false}
            icon={require('../assets/icons/profile.png')}
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
          <FormButton
            buttonTitle="Next"
            onPress={() => scrollToEndHorizontally()}
          />
        </View>
        <FlatList
          numColumns={4}
          style={{
            width: Dimensions.get('window').width / 1.11,
            marginLeft: 10,
          }}
          ListFooterComponent={
            <FormButton
              buttonTitle="Sign Up"
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
            />
          }
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={Avatars}
          removeClippedSubviews={true}
          renderItem={({item}) => (
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
          )}></FlatList>
      </ScrollView>

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
