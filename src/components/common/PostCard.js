import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {CustomText} from '.';
import moment from 'moment';
import {AuthContext} from '../../routes/AuthProvider';
import Share from 'react-native-share';
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
  flair,
}) => {
  const {user, onAddFriend} = useContext(AuthContext);
  const person = 'Shriyans';
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  };

  const myPostShare = async () => {
    const shareOptions = {
      message: postTitle,
      url: imageUrl,
      subject: postContent,
      // backgroundImage: 'http://urlto.png',
      // stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" link
      // backgroundBottomColor: '#fefefe',
      // backgroundTopColor: '#906df4',
      // attributionURL: 'http://deep-link-to-app', //in beta
      // social: Share.Social.INSTAGRAM_STORIES,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (err) {
      console.log('Error', err);
    }
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

  const checkColor = flair => {
    if (flair == 'general') {
      return 'orange';
    }
    if (flair == 'ask') {
      return 'red';
    }
    if (flair == 'help') {
      return 'darkgreen';
    }
    if (flair == 'harrasment') {
      return 'black';
    }
    if (flair == 'bullying') {
      return 'purple';
    }
    if (flair == 'happy') {
      return '#ffc20a';
    }
  };

  return (
    <TouchableOpacity style={style} activeOpacity={0.6} onPress={cardOnPress}>
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
                flex: 1,
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  marginRight: 10,
                  borderRadius: 150 / 2,
                  backgroundColor: '#ffffff',
                }}
                source={{uri: avatar}}
              />

              <View>
                <CustomText
                  textColor="#000000"
                  textSize={16}
                  textWeight={500}
                  numberOfLines={2}
                  text={username}
                  style={{marginBottom: 3}}
                />

                <CustomText
                  textColor="#00000080"
                  textSize={12}
                  textWeight={400}
                  numberOfLines={1}
                  text={moment(postDate.toDate()).fromNow()}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: 'red',
                    // marginRight: 3,
                    // marginTop: 10,
                    // padding: 2,
                    // paddingLeft: 4,
                    // paddingRight: 5,
                    // borderRadius: 4,
                    // paddingBottom:2,
                  }}>
                  <CustomText
                    style={{marginRight: 3}}
                    textSize={10}
                    textWeight={400}
                    text={'•'}
                    textColor="white"
                  />
                  <CustomText
                    text={flair}
                    textSize={12}
                    textWeight={500}
                    textColor={'white'}
                  />
                </View>
              </View>
            </View>

            <Menu style={{flex: 1}}>
              <MenuTrigger
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  padding: 10,
                  marginTop: 5,
                  marginBottom: 20,
                  marginLeft: 100,
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
                <MenuOption onSelect={() => myPostShare()}>
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
                        tintColor: '#868686',
                        marginRight: 12
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
              marginRight: 20,
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingLeft: 10,
            }}>
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

            {user.uid === userId ? null : (
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
            )}
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/share.png')}
              style={{
                width: 20,
                height: 20,
                marginRight: 35,
                tintColor: '#524f4e',
                marginLeft: 15,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
