import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Comment = ({
  user = '847288AGV',
  comment = 'This is me Hello This is me Hello This is me Hello This is me Hello This is me Hello ',
  comment_time = '4-7-21',
}) => {
  const {container, username, text, time} = styles;
  return (
    <View style={container}>
      <Text style={username}>{user}</Text>
      <Text style={text}>{comment}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={time}>{comment_time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#d9d1d0',
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 3,
  },
  text: {
    fontSize: 20,
    color: 'black',
    opacity: 0.8,
    margin: 5,
  },
  time: {
    fontSize: 15,
    marginRight: 10,
  },
});

export {Comment};
