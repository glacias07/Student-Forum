import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomText} from './CustomText';

const Flair = props => {
  const {flair, color, flairOnPress, textColor = 'white', style} = props;

  return (
    <TouchableOpacity onPress={flairOnPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: color,
            marginRight: 10,
            marginTop: 10,
            padding: 10,
            paddingLeft: 10,
            paddingRight: 20,
            borderRadius: 10,
          },
          style,
        ]}
        // style={[flairStyle,style]}
      >
        {/* <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 50,
            backgroundColor: 'white',
            marginRight: 10,
          }}></View> */}
          <CustomText
          style={{marginRight: 10}}
          textSize={20}
          textWeight={400}
          text={'•'}
          textColor='white'
        />
        <CustomText
          text={flair}
          textSize={20}
          textWeight={500}
          textColor={textColor}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Flair;
