import {View, Image, TextInput} from 'react-native';
import React from 'react';

const TextField = ({icon, onChangeText,style,...rest}) => {
  return (
    <View
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00000080',
        paddingHorizontal: 10,
      },style]}>
      <Image
        style={{height: 20, flex: 1}}
        source={icon}
      />
      <TextInput
      {...rest}
        numberOfLines={1}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          fontSize: 16,
          color: '#333',
          // width: '100%',
          padding: 10,
          flex: 15,
          paddingLeft: 20
        }}
      />
    </View>
  );
};

export {TextField};
