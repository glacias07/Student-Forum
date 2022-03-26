import React, {useContext, useEffect, useState} from 'react';
import {TextInput, View, TouchableOpacity, FlatList, Image} from 'react-native';
import ChatItem from './common/ChatItem';
import {AuthContext} from '../routes/AuthProvider';
import {connect} from 'react-redux';
import {CustomText} from './common';
import {
  setFriendList,
  searchBoxValueChanged,
} from '../actions/PostScreenActions';
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

const ChatScreen = ({
  navigation,
  route,
  username,
  friend_list,
  setFriendList,
  searchBoxValueChanged,
  search,
  filtered_friend_list,
}) => {
  const {findUser} = useContext(AuthContext);

  const [friendsList, setFriendsList] = useState();
  const [myData, setMyData] = useState();
  const fetchData = async () => {
    const user = await findUser(username);
    // console.log(user.friends)
    setFriendsList(user.friends);
    setFriendList(friendsList);
    setMyData(user);
    // console.log(user);
  };
  useEffect(() => {
    fetchData();
  }, [myData]);
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#0062cd'}}>
        <View style={{padding: 20}}>
          <CustomText
            text="Chat with"
            textColor="white"
            textSize={30}
            textWeight={500}
          />
          <View style={{flexDirection: 'row'}}>
            <CustomText
              text="your"
              textColor="white"
              textSize={30}
              textWeight={500}
            />
            <CustomText
              text=" friends"
              textColor="#f6bf3e"
              textSize={30}
              textWeight={700}
            />
          </View>
          <View style={{marginTop: 10}}>
            <TextInput
              style={{
                backgroundColor: '#ffffff70',
                borderRadius: 20,
                paddingLeft: 45,
              }}
              placeholder="Search"
              onChangeText={search =>
                searchBoxValueChanged(friend_list, search)
              }
              value={search}
            />
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: '#ffffff',
                marginRight: 15,
                marginLeft: 15,
                position: 'absolute',
                top: '25%',
              }}
              source={require('../assets/icons/search.png')}
            />
          </View>
        </View>
        <FlatList
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            flex: 1,
            backgroundColor: '#ffffff',
          }}
          contentContainerStyle={{marginTop: 0}}
          data={search ==  '' ? friendsList:filtered_friend_list}
          ListEmptyComponent={
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
          }
          renderItem={({item}) => (
            <ChatItem
              style={{borderRadius: 25}}
              chatOnPress={() => {
                navigation.navigate('Personal Message', {
                  friendData: item,
                  myData: myData,
                  username: item.username,
                });
                // console.log("Username",item.username)
                // console.log("MyData",myData)
                // console.log("FirendData",item)
                console.log('Firends', friend_list);
              }}
              navigation={navigation}
              userImg={item.avatar}
              userName={item.username}
              messageText={item.messageText}
              messageTime={item.messageTime}
            />
          )}
        />
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    username: state.postListing.username,
    friend_list: state.postListing.friend_list,
    search: state.postListing.search,
    filtered_friend_list: state.postListing.filtered_friend_list,
  };
};

export default connect(mapStateToProps, {setFriendList, searchBoxValueChanged})(
  ChatScreen,
);
