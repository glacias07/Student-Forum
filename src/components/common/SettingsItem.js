import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {CustomText} from './CustomText';

const SettingsItem = props => {
  const {icon, name, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        padding: 20,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={{height: 25, width: 25, marginRight: 15}} source={icon}  />
        <CustomText
          text={name}
          textSize={25}
          textWeight={600}
          textColor="black"
        />
      </View>

      <Image
        style={{height: 30, width: 30}}
        source={require('../../assets/icons/next.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default SettingsItem;
