import React, {useContext, useEffect, useState} from 'react';
import {onAddFriend} from '../SetupProfileScreen';
import {
  StyleSheet,
  View,
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

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const PostCard = ({
  editOnPress,
  cardOnPress,
  postTitle,
  postContent,
  username,
  postDate,
  userId,
  postId,
  imageUrl,
  deleteOnPress,
  style,
  navigation,
  myUsername,
  no_of_comments,
  avatar,
}) => {
  const {user, onAddFriend} = useContext(AuthContext);
  const person = 'Shriyans';
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  };

  const createPDF = async () => {
    let options = {
      html: `<h1>Report</h1>
      <p><strong>Date: ${getCurrentDate()}</strong></p>
      <p><span style="font-weight: 400;"><strong>Subject:</strong>&nbsp; Report regarding a vulnerable post</span></p>
      <p><span style="font-weight: 400;"><strong>To the concerned Authorities</strong>,</span></p>
      <p><span style="font-weight: 400;">A post has come to my notice that needs immediate attention from the school/college authorities, here is the content of the post,</span></p>
      <p><span style="font-weight: 400;"><strong>Post Title: ${postTitle}</strong></span></p>
      <p><span style="font-weight: 400;"><strong>Post Content: ${postContent}</strong></span></p>
      <p><span style="font-weight: 400;"><strong>Images: <a href="${imageUrl}">Images of the post</a></strong></span></p>
      <p><span style="font-weight: 400;">Let&rsquo;s convene a meeting to address this issue.</span></p>
      <p><strong>Thanks &amp; Regards,</strong></p>
      <p>(name of counsellor)</p>`,
      fileName: username,
      directory: '../storage',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  };

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.6}
      onPress={cardOnPress}>
      <View style={styles.flatListStyle}>
        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginBottom: 10,
                flex: 1,
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  marginRight: 15,
                  borderRadius: 150 / 2,
                  backgroundColor: '#ffffff',
                }}
                source={{uri: avatar}}
              />

              <CustomText
                textColor="#00000080"
                textSize={16}
                textWeight={500}
                numberOfLines={2}
                text={username}
              />
              <View style={{marginBottom: 17, margin: 5}}>
                <CustomText
                  textColor="#00000080"
                  text={'.'}
                  textWeight={400}
                  textSize={22}
                />
              </View>
              <CustomText
                textColor="#00000080"
                textSize={13}
                textWeight={500}
                numberOfLines={2}
                text={moment(postDate.toDate()).fromNow()}
                style={{marginTop: -1}}
              />
            </View>

            <Menu style={{flex: 1}}>
              <MenuTrigger
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  padding: 10,
                  marginTop: 5,
                  marginBottom: 20,
                  marginLeft: 70,
                }}>
                <CustomText
                  textColor="#00000080"
                  textSize={22}
                  textWeight={900}
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
                  <MenuOption onSelect={editOnPress}>
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
                    onSelect={() =>
                      onAddFriend(username, myUsername, navigation)
                    }>
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
                <MenuOption
                  // onSelect={() => navigation.navigate('Personal Message',{username:username})}
                  onSelect={() => createPDF()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../assets/icons/download.png')}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 12,
                        tintColor: '#868686',
                      }}
                    />
                    <CustomText text="Download PDF" textColor="black" />
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={{width: '100%', marginLeft: 10}}>
          <CustomText
            textColor="#000000"
            textSize={22}
            textWeight={600}
            numberOfLines={3}
            text={postTitle}
            style={{marginBottom: 10}}
          />
        </View>
        {imageUrl ? (
          <Image
            style={{
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 20,
              height: 200,
              marginLeft: 10,
              marginRight:20
            }}
            source={{uri: imageUrl}}
          />
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/icons/comment.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  tintColor: '#524f4e',
                  // marginLeft: 15,
                }}
              />
              <CustomText
                textSize={15}
                textWeight={500}
                text={no_of_comments}
              />
            </View>
            <TouchableOpacity
              onPress={() => onAddFriend(username, myUsername, navigation)}>
              <Image
                source={require('../../assets/icons/PostChat.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  tintColor: '#524f4e',
                  marginLeft: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/share.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 35,
                tintColor: '#524f4e',
                // marginLeft: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 0.4,
          // borderWidth: 0.5,
          width: '80%',
          backgroundColor: '#00000070',
          alignSelf: 'center',
          marginVertical: 10
        }}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 15,
  },
});

const mapStateToProps = state => {
  return {
    myUsername: state.postListing.username,
  };
};

export default connect(mapStateToProps, {chatUserNameSet})(PostCard);
