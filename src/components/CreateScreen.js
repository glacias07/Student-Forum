import React, {useEffect, useContext, useState, useLayoutEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {
  CustomHeaderButton,
  ModalLoader,
  FormButton,
  CustomText,
} from './common';
import {AuthContext} from '../routes/AuthProvider';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import Flair from './common/Flair';

const data = [
  {id: '1', flair: 'general', color: 'orange'},
  {id: '2', flair: 'ask', color: 'red'},
  {id: '3', flair: 'help', color: 'darkgreen'},
  {id: '4', flair: 'harrasment', color: 'black'},
  {id: '5', flair: 'bullying', color: 'purple'},
  {id: '6', flair: 'happy', color: '#ffc20a'},
];

const CreateScreen = ({navigation, avatar}) => {
  const [image, setImage] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  const {user, submitPost} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [flair, setFlair] = useState('');
  const [flairColor, setFlairColor] = useState('');

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
      compressImageQuality: 0.1,
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
      compressImageQuality: 0.1,
      // compressImageMaxHeight:500
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadPost = async () => {
    if (image == null) {
      submitPost(
        user.uid,
        userDetails[0].username,
        postTitle,
        postContent,
        null,
        avatar,
        flair,
        flairColor,
      );
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
        avatar,
        flair,
        flairColor,
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
              avatar,
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
            setModalVisible(true);
            // uploadPost();
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
      }}>
      <View style={{paddingHorizontal: 20}}>
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
            borderBottomWidth: 0.8,
            borderBottomColor: '#00000050',
            fontSize: 15,
            marginTop: 15,
          }}
        />
        <TextInput
          multiline={true}
          onChangeText={postContent => {
            setPostContent(postContent.trim());
          }}
          placeholder="Post Content"
          style={{fontSize: 13}}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              backgroundColor: '#00000040',
              width: '100%',
              flex: 1,
            }}></TouchableOpacity>
          <View
            style={{
              height: 350,
              backgroundColor: '#EEEFFF',
              // flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              // alignSelf: 'center',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              // justifyContent:'center',
              // alignItems:'center'
              paddingTop: 20,
              // paddingLeft: 30,
            }}>
            <TouchableOpacity
              onPress={() => uploadPost()}
              disabled={flair ? false : true}
              style={{
                top: 0,
                position: 'absolute',
                width: '100%',
                backgroundColor: flair ? '#0063c6' : 'grey',
                height: 50,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 1,
              }}>
              <CustomText
                text="Share"
                textSize={25}
                textWeight={700}
                textColor={'white'}
              />
            </TouchableOpacity>
            <View style={{paddingTop: 40, paddingLeft: 30}}>
              <CustomText
                text={'Please Choose a Flair'}
                textSize={25}
                textWeight={600}
              />
              <CustomText
                text={'Adding a flair will in getting relevant replies'}
                textSize={17}
                textWeight={400}
              />
              <FlatList
                data={data}
                numColumns={2}
                renderItem={({item}) => (
                  <Flair
                    flairOnPress={() => {
                      setFlair(item.flair), setFlairColor(item.color);
                    }}
                    flair={item.flair}
                    color={flair == item.flair ? 'lightgrey' : item.color}
                    textColor={item.textColor}
                    style={flair == item.flair ? {elevation: 3} : null}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#EEEFFF',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingVertical: 15,
          borderTopColor: '#00000050',
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            choosePhotoFromLibrary();
          }}>
          <Image
            style={{height: 35, width: 35, marginHorizontal: 25}}
            source={require('../assets/icons/gallery.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
          }}>
          <Image
            style={{height: 35, width: 35}}
            source={require('../assets/icons/camera.png')}
          />
        </TouchableOpacity>
      </View>

      {uploading ? <ModalLoader /> : null}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    avatar: state.postListing.avatar,
  };
};

export default connect(mapStateToProps, {})(CreateScreen);
