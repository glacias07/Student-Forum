import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {CustomText} from './CustomText';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {AuthContext} from '../../routes/AuthProvider';

const Reply = props => {
  const {reply, reply_id, reply_time, reply_user_id, nameOfUser, avatar, deleteOnPress} =
    props;
  const {container} = styles;
  const {user} = useContext(AuthContext);

  return (
    <View style={container}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <Image
          source={{uri: avatar}}
          style={{
            height: 25,
            width: 25,
            // borderRadius: 150 / 2,
            marginRight: 10,
            // backgroundColor:'#dde1e4'
          }}
        />
        <CustomText
          style={{marginRight: 5}}
          textSize={16}
          textWeight={600}
          text={nameOfUser}
        />
        <CustomText
          style={{marginRight: 5}}
          textSize={20}
          textWeight={400}
          text={'•'}
        />
        <CustomText
          style={{}}
          textSize={14}
          textWeight={400}
          text={reply_time}
        />
      </View>

      <CustomText
        style={{marginLeft: 10, marginVertical: 10}}
        textWeight={500}
        textSize={16}
        text={reply}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          // onPress={replyOnPress}
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
          <Image
            source={require('../../assets/icons/reply.png')}
            style={{
              width: 15,
              height: 15,
              // marginRight: 2,
              tintColor: '#868686',
            }}
          />
          <CustomText
            style={{marginLeft: 10, marginVertical: 5}}
            textWeight={500}
            textSize={16}
            text={'reply'}
          />
        </TouchableOpacity>
        <Menu>
          <MenuTrigger
            style={{
              marginRight: 30,
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
            }}
            style={{
              padding: 15,
            }}>
            <MenuOption
              onSelect={() =>
                console.log('Share function yet to be developed')
              }>
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
            {1 == 1 ? (
              <MenuOption
                onSelect={() =>
                  console.log(
                    'Edit function yet to be developed',
                    reply_user_id,
                    user.uid,
                  )
                }>
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
            {reply_user_id === user.uid ? (
              <MenuOption onSelect={() => deleteOnPress(reply_id)}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
  },
});

export default Reply;
