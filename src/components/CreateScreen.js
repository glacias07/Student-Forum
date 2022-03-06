import React, {useEffect, useContext, useState, useLayoutEffect} from 'react';
import {View, TextInput, Image, ActivityIndicator, Modal} from 'react-native';
import {CustomHeaderButton, ModalLoader, FormButton} from './common';
import {AuthContext} from '../routes/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const CreateScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  const {user, submitPost} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);

  const postFilledOrNot = (post_title, post_content) => {
    var buttonColor = 'blue';
    var disabled = false;
    if (post_title === null || post_content === null) {
      disabled = true;
      buttonColor = '#00000070';
    } else {
      disabled = false;
      buttonColor = 'blue';
    }
    return {
      color: buttonColor,
      disabled: disabled,
    };
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality:0.1,
      // compressImageMaxWidth: 500,
      // compressImageMaxHeight:500
    }).then(image => {
      // console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality:0.1,
      // compressImageMaxHeight:500
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadPost = async () => {
    if (image == null) {
      submitPost(user.uid, userDetails[0].username, postTitle, postContent);
      navigation.goBack();
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      setImage(null);
      submitPost(
        user.uid,
        userDetails[0].username,
        postTitle,
        postContent,
        url,
      );
      setUploading(false);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const list = [];

      await firestore()
        .collection('userDetails')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, username, avatar} = doc.data();
            list.push({
              userId,
              username,
              avatar
            });
          });
        });
      setUserDetails(list);
      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error while fetching posts', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CustomHeaderButton
          onPress={() => navigation.goBack()}
          icon={require('../assets/icons/cancel.png')}
        />
      ),
      headerRight: () => (
        <CustomHeaderButton
          onPress={() => {
            uploadPost();
          }}
          disabled={postFilledOrNot(postTitle, postContent).disabled}
          icon={require('../assets/icons/tick.png')}
          tintColor={postFilledOrNot(postTitle, postContent).color}
          height={20}
          width={20}
        />
      ),
    });
  });

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
      }}>
      {image != null ? (
        <Image source={{uri: image}} style={{height: 100, aspectRatio: 1}} />
      ) : null}
      <TextInput
        placeholder="Post Title"
        multiline={true}
        onChangeText={postTitle => {
          setPostTitle(postTitle.replace(/^\s+|\s+$/g, ''));
        }}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#00000020',
          fontSize: 15,
          marginTop: 15,
        }}
      />
      <TextInput
        multiline={true}
        onChangeText={postContent => {
          setPostContent(postContent.replace(/^\s+|\s+$/g, ''));
        }}
        placeholder="Post Content"
        style={{fontSize: 13}}
      />
      <FormButton
        buttonTitle={'choose from gallery'}
        onPress={() => {
          choosePhotoFromLibrary();
        }}
      />
      <FormButton
        buttonTitle={'take a photo'}
        onPress={() => {
          takePhotoFromCamera();
          console.log('pressed');
        }}
      />
      {uploading ? <ModalLoader /> : null}
    </View>
  );
};

export default CreateScreen;
