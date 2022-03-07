import React, {useContext, useState, Component} from 'react';
import {ScrollView, View, Alert, TouchableOpacity} from 'react-native';
import {CustomText, FormButton, FormInput} from './common';
import {AuthContext} from '../routes/AuthProvider';

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

  const {register} = useContext(AuthContext);

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
        icon={require('../assets/icons/profile.png')}
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
      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (formValidation(password, confirmPassword, email)) {
            register(email.replace(/^\s+|\s+$/g, ''), password),
              navigation.navigate('Setup Screen');
          }
        }}
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

export default SignUp;
