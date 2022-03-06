import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../routes/AuthProvider';
import {useContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {modalVisibleSet} from '../actions/PostScreenActions';

const SplashScreen = ({navigation, modalVisibleSet}) => {
  const {main} = styles;

  //   const {user, setUser} = useContext(AuthContext);
  //   const [initializing, setInitializing] = useState(true);

  //   const onAuthStateChanged = user => {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   };

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  //   if (initializing) return null;
  return (
    <>
      <View style={main}>
        <LottieView
          source={require('../assets/Splash.json')}
          autoPlay
          loop={false}
          speed={3}
          onAnimationFinish={() => modalVisibleSet(false)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#3490dc',
    flex: 1,
  },
});

export default connect(null, {modalVisibleSet})(SplashScreen);
