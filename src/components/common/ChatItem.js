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
    <>
      <TouchableOpacity onPress={chatOnPress} style={[styles.container, style]}>
        <Image source={{uri: userImg}} style={styles.avatar} />
        <View style={styles.midContainer}>
          <CustomText textSize={28} textWeight={500} text={userName}/>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#00000060',
          width: '85%',
          alignSelf: 'center',
        }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: -5,
  },
  midContainer: {alignSelf: 'center', paddingRight: 40},
  avatar: {
    height: 60,
    width: 60,
    marginRight: 15,
    borderRadius: 50,
  },
});

export default ChatItem;
