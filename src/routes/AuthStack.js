import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../components/LoginScreen';
import SignUp from '../components/SignUp';


const AuthStackNav = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthStackNav.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
      <AuthStackNav.Screen name="Sign Up" component={SignUp} />
    </AuthStackNav.Navigator>
  );
};

export default AuthStack;
