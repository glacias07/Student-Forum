import React, {useContext, useState, useEffect} from 'react';
import {Text, View,ScrollView, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';

const PostDetails = ({route}) => {
  const {user} = useContext(AuthContext);
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const getImageSize = url => {
    Image.getSize(
      url,
      (width, height) => {
        setImageHeight(height);
        setImageWidth(width);
        // console.log(height, width);
      },
      error => {
        console.log(error);
      },
    );
  };
  const aspect = (height, width) => {
    if (height === width) {
      return 3 / 3;
    } else if (height > width) {
      return 3 / 4;
    } else if (width > height) {
      return 3 / 2;
    }
  };
  useEffect(() => {
    {route.params.download_url?getImageSize(route.params.download_url):null}
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {route.params.download_url ? (
        <TouchableOpacity onPress={() => console.log(imageHeight, imageWidth)}>
          <Image
            style={{
              resizeMode: 'contain',
              height: undefined,
              width: '100%',
              aspectRatio: aspect(imageHeight,imageWidth),
              backgroundColor: 'black',
            }}
            source={{uri: route.params.download_url}}
          />
        </TouchableOpacity>
      ) : null}
      <Text>{route.params.post_title}</Text>
      <Text>{route.params.post_content}</Text>
      <Text>Post made by {route.params.username}</Text>
      <Text>Post made on {route.params.post_time.toDate().toDateString()}</Text>
      <Text>
        Post made on {route.params.post_time.toDate().toLocaleDateString()}
      </Text>
      <Text>Post made at {route.params.post_time.toDate().toTimeString()}</Text>
      <Text>
        Post made at {route.params.post_time.toDate().toLocaleTimeString()}
      </Text>
    </ScrollView>
  );
};

export default PostDetails;
