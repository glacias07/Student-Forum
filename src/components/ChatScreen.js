import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList,Image} from 'react-native';
import ChatItem from './common/ChatItem';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import { CustomText } from './common';

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

const ChatScreen = ({navigation, route, username}) => {
  const {findUser} = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState();
  const [myData, setMyData] = useState();
  const fetchData = async () => {
    const user = await findUser(username);
    setFriendsList(user.friends);
    setMyData(user);
    // console.log(user);
  };
  useEffect(() => {
    fetchData();
  }, [myData]);
  return (
    <>
      {friendsList!=undefined ? (
        <FlatList
          data={friendsList}
          contentContainerStyle={{marginTop: 10}}
          renderItem={({item}) => (
            <ChatItem
              style={{marginBottom: 10}}
              chatOnPress={() => {
                navigation.navigate('Personal Message', {
                  friendData: item,
                  myData: myData,
                  username: item.username,
                });
              }}
              navigation={navigation}
              userImg={item.avatar}
              userName={item.username}
              messageText={item.messageText}
              messageTime={item.messageTime}
            />
          )}
        />
      ) : (
        <View style={{backgroundColor: 'white', height: 200,flex:1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 120,
            }}>
            <Image
              style={{height: 80, width: 80, marginBottom: 10}}
              source={require('../assets/images/confused.png')}
            />
            <CustomText
              text="No Chats Yet !"
              textSize={20}
              textWeight={200}
            />
            <CustomText
              text="Why don't you start one?"
              textSize={15}
              textWeight={600}
            />
          </View>
        </View>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    username: state.postListing.username,
  };
};

export default connect(mapStateToProps, {})(ChatScreen);
