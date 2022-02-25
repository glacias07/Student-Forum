import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {CustomText} from '.';
import {AuthContext} from '../../routes/AuthProvider';
const Comment = ({
 checkUsername,
  comment_id,
  nameOfUser,
  comment,
  comment_time,
  deleteOnPress,
}) => {
  const {user} = useContext(AuthContext);
  const {container, username, text, time} = styles;

  return (
    <View style={container}>
      <Text style={username}>{nameOfUser}</Text>
      <Text style={text}>{comment}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={time}>{comment_time}</Text>
      </View>
      <Menu style={{flex: 1}}>
        <MenuTrigger
          style={{
            width: '200%',
            alignSelf: 'center',
            alignItems: 'center',
            padding: 10,
            marginBottom: 30,
          }}>
          <CustomText
            textColor="#00000080"
            textSize={22}
            textWeight={700}
            text="..."
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 10,
            // flex: 1,
          }}
          style={{
            padding: 15,
          }}>
          <MenuOption
            onSelect={() => console.log('Share function yet to be developed')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 12,
                  tintColor: '#868686',
                }}
              />
              <CustomText text="Share" textColor="#000000" />
            </View>
          </MenuOption>
          {/* {user.uid === userId ? ( */}
          {1 == 1 ? (
            <MenuOption
              onSelect={() => console.log('Edit function yet to be developed',checkUsername)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Image
                  source={require('../../assets/icons/edit.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 12,
                    tintColor: '#868686',
                  }}
                />
                <CustomText text="Edit" textColor="#000000" />
              </View>
            </MenuOption>
          ) : null}
          {/* {user.uid === userId ? ( */}
          {checkUsername === nameOfUser ? (
            <MenuOption onSelect={() => deleteOnPress(comment_id)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Image
                  source={require('../../assets/icons/bin.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 12,
                    tintColor: '#d91c45',
                  }}
                />
                <CustomText text="Delete" textColor="#d91c45" />
              </View>
            </MenuOption>
          ) : null}
        </MenuOptions>
      </Menu>
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
