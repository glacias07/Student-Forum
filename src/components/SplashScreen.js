import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../routes/AuthProvider';
import {useContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {modalVisibleSet} from '../actions/PostScreenActions';

const SplashScreen = ({navigation, modalVisibleSet, modal_visible}) => {
  useEffect(() => {
    showModal();
  }, []);

  //   if (initializing) return null;
  const showModal = () => {
    setTimeout(() => {
      modalVisibleSet(false);
    }, 2000);
  };
  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
          // height: 1100,
          resizeMode: 'cover',
        }}
        resizeMode="cover"
        source={require('../assets/images/splash_bg.jpeg')}>
        <Modal
          transparent={true}
          animation="fade"
          visibile={modal_visible}
          onAnimationFinish={() => modalVisibleSet(false)}></Modal>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = state => {
  return {
    modal_visible: state.postListing.modal_visible,
  };
};

export default connect(mapStateToProps, {modalVisibleSet})(SplashScreen);
