import {View, Text, TextInput} from 'react-native';
import React, {useState, useLayoutEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {CustomHeaderButton} from './common';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import {AuthContext} from '../routes/AuthProvider';

export default function EditPostScreen({navigation, route}) {
  const [textFieldValue, setTextFieldValue] = useState(null);
  const {updatePostDetails, updateCommentDetails} = useContext(AuthContext);

  const postFilledOrNot = () => {
    var buttonColor = 'blue';
    var disabled = false;
    if (textFieldValue === null) {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit ' + route.params.title,
      headerLeft: () => (
        <CustomHeaderButton
          onPress={() => navigation.goBack()}
          icon={require('../assets/icons/cancel.png')}
        />
      ),
      headerRight: () => (
        <CustomHeaderButton
          onPress={() => {
            route.params.title == 'Post'
              ? updatePostDetails(textFieldValue, route.params.post_id)
              : updateCommentDetails(
                  textFieldValue,
                  route.params.comment_id,
                  route.params.post_id,
                ),
              navigation.goBack();
          }}
          disabled={postFilledOrNot(textFieldValue).disabled}
          icon={require('../assets/icons/tick.png')}
          tintColor={postFilledOrNot(textFieldValue).color}
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
      {/* <TextInput
        placeholder="Post Title"
        multiline={true}
        defaultValue={route.params.post_title}
        onChangeText={postTitle => {
          setPostTitle(postTitle.replace(/^\s+|\s+$/g, ''));
        }}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#00000020',
          fontSize: 15,
          marginTop: 15,
        }}
      /> */}
      <TextInput
        multiline={true}
        defaultValue={route.params.default_value}
        onChangeText={textFieldValue => {
          setTextFieldValue(textFieldValue.replace(/^\s+|\s+$/g, ''));
        }}
        placeholder={route.params.placeholder}
        style={{fontSize: 13}}
      />
    </View>
  );
}
