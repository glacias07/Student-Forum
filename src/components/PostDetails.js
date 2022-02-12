import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AuthContext} from '../routes/AuthProvider';
import {CustomText, Comment} from './common';
import firestore from '@react-native-firebase/firestore';

const dataComments = [
  {
    id: '1',
    username: 'ajdnj23748',
    comment: 'Hi this is cool',
    createdAt: '4-7-22',
  },
  {
    id: '2',
    username: 'ajdnj23748',
    comment: 'Hi this is not cool, ok bye',
    createdAt: '4-7-22',
  },
  {
    id: '3',
    username: 'ajdnj23748',
    comment: 'Hi this is cool',
    createdAt: '4-7-22',
  },
  {
    id: '4',
    username: 'ajdnj23748',
    comment: 'Hi this is you  Hi this is you Hi this is you ',
    createdAt: '4-7-22',
  },
];

const PostDetails = ({route}) => {
  const {user} = useContext(AuthContext);
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [postComment, setPostComment] = useState();
  const {updatePostComments} = useContext(AuthContext);

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

  const fetctCommentArray = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('postTitle', '==', route.params.post_title)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {comments} = doc.data();
            list=[...comments]
          });
        });
      setPostComment(list);
    } catch (error) {
      console.log('Error while fetching comments', error);
    }
  };

  const submitPostComment = (Comment) => {
    // updatePostComments(
    //   [...comment, {comment: postComment, username: 'Amodh Pandey'}],
    //   route.params.post_id,
    // );

    console.log(postComment)
  };

  useEffect(() => {
    {
      route.params.download_url
        ? getImageSize(route.params.download_url)
        : null;
    }
    fetctCommentArray()
  }, []);

  return (
    <>
      <ScrollView>
        <View
          contentContainerStyle={{
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <CustomText
              text={route.params.username}
              textWeight={400}
              textSize={16}
            />
            <CustomText
              text={
                route.params.post_time.toDate().toLocaleDateString() +
                ' ' +
                route.params.post_time.toDate().toLocaleTimeString()
              }
              textWeight={400}
              textSize={13}
            />
          </View>
          <CustomText
            text={route.params.post_title}
            textWeight={500}
            textSize={20}
          />
          {route.params.download_url ? (
            <Image
              style={{
                resizeMode: 'contain',
                height: undefined,
                width: '100%',
                aspectRatio: aspect(imageHeight, imageWidth),
                backgroundColor: 'black',
              }}
              source={{uri: route.params.download_url}}
            />
          ) : null}

          <CustomText
            text={route.params.post_content}
            textSize={20}
            textWeight={500}
          />
        </View>
        {/*Comment FlatList */}
        <FlatList
          data={dataComments}
          renderItem={item => (
            <Comment
              username={item.username}
              comment={item.comment}
              createdAt={item.createdAt}
            />
          )}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={comment => setPostComment(comment)}
          style={{borderColor: 'black', borderWidth: 1, flex: 4}}
        />
        <TouchableOpacity onPress={() => submitPostComment(postComment)}>
          <CustomText
            text="post"
            textWeight={500}
            textSize={20}
            style={{flex: 1, marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PostDetails;
