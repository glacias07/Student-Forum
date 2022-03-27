import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CustomText} from './common';

const AboutUs = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#025ab4', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          // padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: 22,
                width: 22,
                marginRight: 10,
                tintColor: '#ffffff',
              }}
              source={require('../assets/icons/back.png')}
            />
          </TouchableOpacity>

          <CustomText
            text="About Us"
            textColor="#f6bf3e"
            textSize={22}
            textWeight={700}
            style={{marginLeft: 10}}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          // borderTopLeftRadius: 25,
          // borderTopRightRadius: 25,
          // marginTop: 30,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingLeft: 20,
          paddingTop: 10,
          paddingRight: 20,
        }}>
        <CustomText text="Purpose" textSize={24} textWeight={500} style={{marginBottom:10}} />
        <CustomText
          text="Encourage Students to share their problems with teachers and their peers anonymously without being ashamed or embarrassed."
          textSize={18}
          textWeight={400}
        />
        <CustomText
          text="Students and teachers can view and comment on posts and privately chat with the concerned student."
          textSize={18}
          textWeight={400}
        />
        <CustomText
          text="Thus a Platform for students to Reach Out and seek help anonymously"
          textSize={18}
          textWeight={400}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutUs;
