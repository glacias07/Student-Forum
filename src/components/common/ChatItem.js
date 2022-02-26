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
  const {id, userName, userImg, messageTime, messageText, navigation, style} =
    props;
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Personal Message', {username: userName})
        }
        style={[styles.container, style]}>
        <Image source={{uri: userImg}} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{userName}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {messageText}
          </Text>
        </View>

          <Text style={styles.time}>{messageTime}</Text>
      </TouchableOpacity>
      <View style={{borderBottomWidth: 0.5, borderBottomColor: '#00000060', width: '85%', alignSelf: 'center',}}></View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  midContainer: {justifyContent: 'space-evenly'},
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
  },
});

export default ChatItem;
