import React, {useState, useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {getDatabase, get, ref, onValue, off, update} from 'firebase/database';

const PersonalMessage = ({onBack, myData, selectedUser, route}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const database = getDatabase();
      const myChatroom = fetchMessages();
      setMessages(renderMessages(myChatroom))
    };

    loadData();
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${route.params.friendData.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });
  }, []);

  const renderMessages = msgs => {

    return msgs
    ? msgs.reverse().map((msg, index) => ({
        ...msg,
        _id: index,
        user: {
          _id:
            msg.sender === myData.username
              ? myData.username
              : friendData.username,
          avatar:
            msg.sender === myData.username
              ? myData.avatar
              : friendData.avatar,
          name:
            msg.sender === myData.username
              ? myData.username
              : friendData.username,
        },
      }))
    : [];
},
[
  myData.avatar,
  myData.username,
  friendData.avatar,
  friendData.username,
],
);

  const fetchMessages = async () => {
    const database = getDatabase();
    const snapshot = await get(
      ref(database, `chatrooms/${route.params.friendData.chatroomId}`),
    );
    return snapshot.val();
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);



  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default PersonalMessage;
