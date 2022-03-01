import React, {useState, useCallback, useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';

const PersonalMessage = ({onBack, myData, route}) => {
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
      <Pressable>
        {/* <Image source={require('./assets/back.png')} /> */}
        <Text>{route.params.friendData?.name}</Text>
      </Pressable>
      <GiftedChat
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: route.params.myData.username,
        }}
      />
    </>
  );
};

export default PersonalMessage;
