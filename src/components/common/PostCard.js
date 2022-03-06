import React, {useContext, useEffect, useState} from 'react';
import {onAddFriend} from '../SetupProfileScreen';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CustomText} from '.';
import moment from 'moment';
import {AuthContext} from '../../routes/AuthProvider';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {connect} from 'react-redux';
import {chatUserNameSet} from '../../actions/PostScreenActions';

const PostCard = ({
  cardOnPress,
  postTitle,
  username,
  postDate,
  userId,
  postId,
  imageUrl,
  deleteOnPress,
  style,
  navigation,
  chatUserNameSet,
  myUsername,
  comment_length,
}) => {
  const {user, onAddFriend} = useContext(AuthContext);

  return (
    <TouchableHighlight
      style={style}
      activeOpacity={0.6}
      underlayColor={'transparent'}
      onPress={cardOnPress}>
      <View style={styles.flatListStyle}>
        <View style={{paddingHorizontal: 10, width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              flex: 1,
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 780,
                flex: 2,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/boy.png')}
            />
            <View style={{marginLeft: 10, flex: 7}}>
              <CustomText
                textColor="#00000080"
                textSize={16}
                textWeight={500}
                numberOfLines={2}
                text={username}
              />
              <CustomText
                textColor="#000000"
                textSize={14}
                textWeight={400}
                numberOfLines={2}
                text={moment(postDate.toDate()).fromNow()}
                style={{marginTop: -1}}
              />
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
                {user.uid === userId ? (
                  <MenuOption
                    onSelect={() =>
                      console.log('Edit function yet to be developed')
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
                {user.uid === userId ? (
                  <MenuOption onSelect={() => deleteOnPress(postId)}>
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
                {user.uid === userId ? null : (
                  <MenuOption
                    // onSelect={() => navigation.navigate('Personal Message',{username:username})}
                    onSelect={() => onAddFriend(username, myUsername)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Image
                        source={require('../../assets/icons/messenger.png')}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 12,
                          tintColor: '#868686',
                        }}
                      />
                      <CustomText text="Chat with user" textColor="black" />
                    </View>
                  </MenuOption>
                )}
              </MenuOptions>
            </Menu>
          </View>
        </View>
        {imageUrl ? (
          <Image
            style={{
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 20,
              resizeMode: 'cover',
              height: 200,
            }}
            source={{uri: imageUrl}}
          />
        ) : null}
        <View style={{paddingHorizontal: 10, width: '100%'}}>
          <CustomText
            textColor="#000000"
            textSize={22}
            textWeight={600}
            numberOfLines={3}
            text={postTitle}
            style={{marginBottom: 30}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/comment.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 12,
              tintColor: '#868686',
              marginLeft: 25,
            }}
          />
          {comment_length != 0 ? (
            <CustomText textSize={15} textWeight={500} text={comment_length} />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    padding: 15,
  },
});

const mapStateToProps = state => {
  return {
    myUsername: state.postListing.username,
  };
};

export default connect(mapStateToProps, {chatUserNameSet})(PostCard);
