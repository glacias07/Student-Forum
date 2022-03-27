import React from 'react';
import {View, Text, StyleSheet,Image,Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../routes/AuthProvider';
import {useContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {modalVisibleSet} from '../actions/PostScreenActions';

const SplashScreen = ({navigation, modalVisibleSet, modal_visible}) => {
  const {main} = styles;

  //   const {user, setUser} = useContext(AuthContext);
  //   const [initializing, setInitializing] = useState(true);

  //   const onAuthStateChanged = user => {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   };

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
      <Modal
        animation="slide"
        visibile={modal_visible}
        onAnimationFinish={() => modalVisibleSet(false)}>
        <View style={main}>
        <Image   source={require('../assets/images/splash.png')}/>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'yellow',
    height: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
});

const mapStateToProps = state => {
  return {
    modal_visible: state.postListing.modal_visible,
  };
};

export default connect(mapStateToProps, {modalVisibleSet})(SplashScreen);
