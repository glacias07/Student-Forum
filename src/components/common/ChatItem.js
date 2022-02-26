import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {CustomText} from './';

const ChatItem = props => {
  const {id, userName, userImg, messageTime, messageText} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => console.log('Pressed')}
        style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{uri: userImg}} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{userName}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {messageText}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.time}>{messageTime}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // width: Dimensions.get('window').width,
    width:'60%',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {flexDirection: 'row'},
  midContainer: {justifyContent: 'space-around'},
  avatar: {
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 50,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey',
    // marginRight:100
  },
});

export default ChatItem;
