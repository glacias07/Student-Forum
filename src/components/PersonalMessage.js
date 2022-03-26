import React, {useState, useCallback, useEffect} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat, Day} from 'react-native-gifted-chat';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';
import {CustomText} from './common';

const PersonalMessage = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const database = getDatabase();
      const myChatroom = await fetchMessages();
      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    const database = getDatabase();
    const chatroomRef = ref(
      database,
      `chatrooms/${route.params.friendData.chatroomId}`,
    );
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, route.params.friendData.chatroomId]);

  const renderDay = props => {
    return <Day {...props} textStyle={{color: '#000000'}} />;
  };

  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === route.params.myData.username
                  ? route.params.myData.username
                  : route.params.friendData.username,
              avatar:
                msg.sender === route.params.myData.username
                  ? route.params.myData.avatar
                  : route.params.friendData.avatar,
              name:
                msg.sender === route.params.myData.username
                  ? route.params.myData.username
                  : route.params.friendData.username,
            },
          }))
        : [];
    },
    [
      route.params.myData.avatar,
      route.params.myData.username,
      route.params.friendData.avatar,
      route.params.friendData.username,
    ],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${route.params.friendData.chatroomId}`),
    );

    return snapshot.val();
  }, [route.params.friendData.chatroomId]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${route.params.friendData.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: route.params.myData.username,
            createdAt: new Date(),
          },
        ],
      });

      setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
    },
    [
      fetchMessages,
      route.params.myData.username,
      route.params.friendData.chatroomId,
    ],
  );

  return (
    <>
      <View style={{backgroundColor: '#025ab4', flex: 1}}>
        <View style={{flexDirection: 'row', padding: 20, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: 25,
                width: 25,
                marginRight: 10,
                tintColor: '#ffffff',
              }}
              source={require('../assets/icons/back.png')}
            />
          </TouchableOpacity>
          <Image
            style={{height: 40, width: 40, marginRight: 10}}
            source={{uri: route.params.friendData.avatar}}
          />
          <CustomText
            text={route.params.friendData.username}
            textColor="#ffffff"
            textSize={22}
            textWeight={500}
          />
        </View>
        <ImageBackground
          style={{flex: 1, height: 1100, resizeMode: 'cover'}}
          source={require('../assets/images/background.jpg')}
          resizeMode="cover"
          imageStyle={{
            opacity: 0.7,
            backgroundColor: '#000000',
            borderRadius: 25,
          }}>
          <GiftedChat
            style={{zIndex: 2}}
            messages={messages}
            onSend={newMessage => onSend(newMessage)}
            user={{
              _id: route.params.myData.username,
            }}
            renderDay={renderDay}
          />
        </ImageBackground>
      </View>

      {/* <Image
        source={require('../assets/images/background.jpg')}
        style={{backfaceVisibility:'visible'}}
      /> */}
    </>
  );
};

export default PersonalMessage;
