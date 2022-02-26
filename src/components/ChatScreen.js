import React from 'react';
import {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const ChatScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Personal Message')} >
      <Text>Hello</Text>
     </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
