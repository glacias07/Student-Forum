import React from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import ChatItem from './common/ChatItem';

const data = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: 'https://picsum.photos/id/1/200/300',
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: 'https://picsum.photos/id/2/200/300',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: 'https://picsum.photos/id/6/200/300',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: 'https://picsum.photos/id/9/200/300',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: 'https://picsum.photos/id/11/200/300',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const ChatScreen = ({navigation, route}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <ChatItem
          navigation={navigation}
          userImg={item.userImg}
          userName={item.userName}
          messageText={item.messageText}
          messageTime={item.messageTime}
        />
      )}
    />
  );
};

export default ChatScreen;
