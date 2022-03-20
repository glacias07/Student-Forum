import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {CustomText} from '.';
import {AuthContext} from '../../routes/AuthProvider';
import Reply from './Reply';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

const Comment = ({
  comment_user_id,
  comment_id,
  nameOfUser,
  comment,
  comment_time,
  comment_replies,
  deleteOnPress,
  replyOnPress,
  avatar,
  showValue,
  no_of_replies,
  style,
  post_id,
}) => {
  const {user} = useContext(AuthContext);
  const {container} = styles;
  const [flatListVisible, setFlatListVisible] = useState(false);
  const [repliesButtonVisible, setRepliesButtonVisible] = useState(true);
  const [replyList, setReplyList] = useState([]);

  const changeState = (flatlist, button) => {
    setFlatListVisible(flatlist);
    setRepliesButtonVisible(button);
  };

  var list = [];

  const fetchReplyArray = async () => {
    try {
      await firestore()
        .collection('posts')
        .doc(post_id)
        .collection('comments')
        .doc(comment_id)
        .collection('replies')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {reply_user_id, reply, username, reply_time, avatar} =
              doc.data();
            list.push({
              reply_id: doc.id,
              reply_user_id,
              reply,
              username,
              reply_time,
              avatar,
            });
          });
        });
      // console.log('list list listlist list',list);
      setReplyList(list);
    } catch (error) {
      console.log('Error while fetching comments', error);
    }
  };

  const handleDelete = replyId => {
    Alert.alert(
      'Delete Comment',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteReply(replyId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteReply = replyId => {
    firestore()
      .collection('posts')
      .doc(post_id)
      .collection('comments')
      .doc(comment_id)
      .collection('replies')
      .doc(replyId)
      .delete()
      .then(() => {
        console.log('reply deleted from firebase successfully'),
          firestore()
            .collection('posts')
            .doc(post_id)
            .collection('comments')
            .doc(comment_id)
            .update({no_of_replies: no_of_replies - 1});
        changeState(false, true);
      })
      .catch(e =>
        console.log('Error occured when deleting reply from firebase: ', e),
      );
  };

  const renderReplies = () => {
    if (no_of_replies > 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            changeState(true, false), fetchReplyArray();
          }}>
          {flatListVisible ? (
            <>
              <TouchableOpacity onPress={() => changeState(false, true)}>
                <CustomText
                  text={no_of_replies > 1 ? 'Hide Replies' : 'Hide Reply'}
                  textColor={'blue'}
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
              <FlatList
                data={replyList}
                style={{
                  marginLeft: 10,
                  marginTop: 15,
                  borderLeftWidth: 0.5,
                  borderLeftColor: '#00000050',
                }}
                renderItem={item => (
                  <Reply
                    deleteOnPress={handleDelete}
                    reply={item.item.reply}
                    reply_id={item.item.reply_id}
                    reply_time={moment(item.item.reply_time.toDate()).fromNow()}
                    reply_user_id={item.item.reply_user_id}
                    nameOfUser={item.item.username}
                    avatar={item.item.avatar}
                  />
                )}
              />
            </>
          ) : showValue ? null : (
            <CustomText
              text={
                no_of_replies > 1
                  ? 'View Replies' + ' (' + no_of_replies + ')'
                  : 'View Reply'
              }
              textColor={'blue'}
              style={{marginLeft: 5, marginBottom: 5}}
            />
          )}
        </TouchableOpacity>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={[container, style]}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <Image
          source={{uri: avatar}}
          style={{
            height: 25,
            width: 25,
            borderRadius: 150 / 2,
            marginRight: 10,
          }}
        />
        <CustomText
          style={{marginRight: 5}}
          textSize={16}
          textWeight={600}
          text={nameOfUser}
        />
        <CustomText
          style={{marginRight: 5}}
          textSize={20}
          textWeight={400}
          text={'•'}
        />
        <CustomText
          style={{}}
          textSize={14}
          textWeight={400}
          text={comment_time}
        />
      </View>

      <CustomText
        style={{marginLeft: 10, marginVertical: 10}}
        textWeight={500}
        textSize={16}
        text={comment}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        {showValue ? null : (
          <>
            <TouchableOpacity
              onPress={replyOnPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <Image
                source={require('../../assets/icons/reply.png')}
                style={{
                  width: 15,
                  height: 15,
                  // marginRight: 2,
                  tintColor: '#868686',
                }}
              />
              <CustomText
                style={{marginLeft: 10, marginVertical: 5}}
                textWeight={500}
                textSize={16}
                text={'reply'}
              />
            </TouchableOpacity>

            <Menu>
              <MenuTrigger
                style={{
                  marginRight: 30,
                }}>
                <CustomText
                  textColor="#00000080"
                  textSize={22}
                  textWeight={700}
                  text="..."
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  borderRadius: 10,
                }}
                style={{
                  padding: 15,
                }}>
                <MenuOption
                  onSelect={() =>
                    console.log('Share function yet to be developed')
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../assets/icons/share.png')}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                        tintColor: '#868686',
                      }}
                    />
                    <CustomText text="Share" textColor="#000000" />
                  </View>
                </MenuOption>
                {1 == 1 ? (
                  <MenuOption
                    onSelect={() =>
                      console.log(
                        'Edit function yet to be developed',
                        comment_user_id,
                        user.uid,
                      )
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Image
                        source={require('../../assets/icons/edit.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 12,
                          tintColor: '#868686',
                        }}
                      />
                      <CustomText text="Edit" textColor="#000000" />
                    </View>
                  </MenuOption>
                ) : null}
                {comment_user_id === user.uid ? (
                  <MenuOption onSelect={() => deleteOnPress(comment_id)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Image
                        source={require('../../assets/icons/bin.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 12,
                          tintColor: '#d91c45',
                        }}
                      />
                      <CustomText text="Delete" textColor="#d91c45" />
                    </View>
                  </MenuOption>
                ) : null}
              </MenuOptions>
            </Menu>
          </>
        )}
      </View>

      {renderReplies(comment_replies)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
  text: {
    fontSize: 20,
    color: 'black',
    opacity: 0.8,
    margin: 5,
  },
  time: {
    fontSize: 15,
    marginRight: 10,
  },
});

export {Comment};
