import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  View,
  Alert,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import {CustomText, FormButton, FormInput} from './common';
import {AuthContext} from '../routes/AuthProvider';
import SplashScreen from './SplashScreen';

import {connect} from 'react-redux';
const formValidation = (email, pass) => {
  if (email === undefined || pass === undefined) {
    return Alert.alert('Fill all the fields');
  } else if (email.replace(/^\s+|\s+$/g, '') === '') {
    Alert.alert('Email cannot contain whitespace');
  } else {
    return true;
  }
};

const LoginScreen = props => {
  const {navigation, modalVisible} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [marginTopForView, setMarginTopForView] = useState(0);
  // const [modalVisible,setModalVisible]=useState(False)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setMarginTopForView(-Dimensions.get('window').height / 3.8);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMarginTopForView(0);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const {login} = useContext(AuthContext);
  return (
    <>
      {modalVisible ? (
        <SplashScreen />
      ) : (
        <View style={{backgroundColor: '#0062cd', flex: 1}}>
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
            <View style={{flexDirection: 'row'}}>
              <CustomText
                text="Welcome to"
                textColor={'#ffffff'}
                textSize={25}
                textWeight={500}
              />
              <CustomText
                text=" ReachOut"
                textColor={'#dab54e'}
                textSize={25}
                textWeight={700}
              />
            </View>
            <View >
              <CustomText
                style={{marginTop: 10}}
                text="Please fill E-mail and password to login into your account."
                textColor={'#ffffff'}
                textSize={16}
                textWeight={400}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Sign Up');
                }}>
                <CustomText
                  text="Sign Up"
                  textColor="#dab54e"
                  textWeight={700}
                  textSize={18}
                  style={{marginTop: 5, textDecorationLine: 'underline'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flex: 1,
              marginTop: marginTopForView,
            }}>
            <CustomText
              text="E-mail"
              textColor="#949494"
              textWeight={500}
              textSize={16}
              style={{marginBottom: 5}}
            />
            <FormInput
              onChangeText={email => setEmail(email)}
              placeHolderText="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon={require('../assets/icons/profile.png')}
            />
            <CustomText
              text="Sign Up"
              textColor="#949494"
              textWeight={500}
              textSize={16}
              style={{marginVertical: 5}}
            />
            <FormInput
              placeHolderText="Password"
              secureTextEntry={true}
              icon={require('../assets/icons/lock.png')}
              onChangeText={pass => setPassword(pass)}
            />
            <TouchableOpacity
              onPress={() => console.log('Forgot Password ?')}
              style={
                {
                  // width: '97%',
                  // backgroundColor: '#ffc33a',
                  // paddingVertical: 14,
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  // alignSelf: 'center',
                  // borderRadius: 10,
                }
              }>
              <CustomText
                text="Forgot Password ?"
                textSize={14}
                textWeight={600}
                textColor="#707bc4"
                style={{position: 'absolute', right: 10, top: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (formValidation(email, password)) {
                  login(email.replace(/^\s+|\s+$/g, ''), password);
                }
              }}
              style={{
                width: '97%',
                backgroundColor: '#ffc33a',
                paddingVertical: 14,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                height: 60,
                position: 'absolute',
                bottom: 20,
              }}>
              <CustomText
                text="Login Now"
                textSize={22}
                textWeight={700}
                textColor="#414b5a"
              />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.noAccount}>
            <CustomText
              text="Don't have an account?"
              textColor="#000000"
              textWeight={700}
              textSize={18}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Sign Up');
              }}>
              <CustomText
                text=" Create Here"
                textColor="#3568a6"
                textWeight={700}
                textSize={18}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      )}
    </>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f9fafd',
    flex: 1,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  noAccount: {
    marginVertical: 35,
    flexDirection: 'row',
  },
};

const mapStateToProps = state => {
  return {
    modalVisible: state.postListing.modal_visible,
  };
};

export default connect(mapStateToProps, {})(LoginScreen);
