import React, {useState, useContext} from 'react';
import {
  Image,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
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

const LoginScreen = (props) => {
  const {navigation,modalVisible}=props
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [modalVisible,setModalVisible]=useState(False)

  const {login} = useContext(AuthContext);
  return (
    <>
      {modalVisible ? (
        <SplashScreen />
      ) : (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={require('../assets/images/splash.png')}
              style={styles.logo}
            />
            <CustomText
              text="Connect.Share.Discuss"
              textSize={16}
              textWeight={400}
              style={{marginTop: -35, marginBottom: 120}}
            />
          </View>
          <FormInput
            onChangeText={email => setEmail(email)}
            placeHolderText="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            icon={require('../assets/icons/profile.png')}
          />
          <FormInput
            placeHolderText="Password"
            secureTextEntry={true}
            icon={require('../assets/icons/lock.png')}
            onChangeText={pass => setPassword(pass)}
          />
          <FormButton
            buttonTitle="Sign In"
            onPress={() => {
              if (formValidation(email, password)) {
                login(email.replace(/^\s+|\s+$/g, ''), password);
              }
            }}
          />
          <View style={styles.noAccount}>
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
          </View>
        </KeyboardAvoidingView>
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
  return{
    modalVisible:state.postListing.modal_visible
  };
};

export default connect(mapStateToProps, {})(LoginScreen);
