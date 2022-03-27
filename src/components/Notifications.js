import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CustomText} from './common';

const Notifications = ({navigation}) => {
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
            text="Notifications"
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 150, width: 150, marginBottom: 10, marginTop: -100}}
          source={require('../assets/icons/owl.png')}
        />

        <CustomText
          text="You are all caught up!"
          textSize={25}
          textWeight={800}
          textColor={'#0a0e59'}
        />
        <CustomText
          text="This has been a real hoot"
          textSize={25}
          textWeight={800}
          textColor={'#0a0e59'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Notifications;
