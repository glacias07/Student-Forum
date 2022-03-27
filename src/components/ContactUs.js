import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CustomText} from './common';

const ContactUs = ({navigation}) => {
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
                height: 20,
                width: 20,
                marginRight: 10,
                tintColor: '#ffffff',
              }}
              source={require('../assets/icons/back.png')}
            />
          </TouchableOpacity>

          <CustomText
            text="Contact Us"
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
          // marginTop: 10,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingLeft:20,
          paddingTop:10
        }}>
          <CustomText text='Contact Address :-' textSize={24} textWeight={600} textColor={'black'} />
          <CustomText text='Amodh Pandey -'  textSize={20} textWeight={500} textColor="black" style={{marginTop:20}}/>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <CustomText text='Phone-' textSize={20} textWeight={500} />
            <CustomText text='9769388613' textSize={20} textWeight={500} />
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <CustomText text='Email Id-' textSize={20} textWeight={500} />
            <CustomText text='amodh.pandey@somaiya.edu' textSize={20} textWeight={500} />
          </View>

          <CustomText text='Shriyans Naik -'  textSize={20} textWeight={500} textColor="black" style={{marginTop:20}}/>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <CustomText text='Phone-' textSize={20} textWeight={500} />
            <CustomText text='7777077180' textSize={20} textWeight={500} />
          </View>
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <CustomText text='Email Id-' textSize={20} textWeight={500} />
            <CustomText text='shriyans.n@somaiya.edu' textSize={20} textWeight={500} />
          </View>
      </View>

   
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactUs;
