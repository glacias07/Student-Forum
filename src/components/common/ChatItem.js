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
  const {
    id,
    userName,
    userImg,
    messageTime,
    messageText,
    navigation,
    style,
    chatOnPress,
  } = props;
  return (
      <TouchableOpacity onPress={chatOnPress} style={[styles.container, style]}>
        <Image source={{uri: userImg}} style={styles.avatar} />
        <View style={styles.midContainer}>
          <CustomText textSize={18} textWeight={500} text={userName} />
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // width: '70%',
    // justifyContent: 'space-between',
    // alignSelf: 'center',
    // paddingVertical: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  midContainer: {alignSelf: 'center', paddingRight: 40},
  avatar: {
    height: 50,
    width: 50,
    marginRight: 15,
  },
});

export default ChatItem;
