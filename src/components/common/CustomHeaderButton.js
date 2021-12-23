import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import { CustomText } from '.';

function CustomHeaderButton({
  onPress,
  icon,
  tintColor = undefined,
  height = 15,
  width = 15,
  ...rest
}) {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Image
        source={icon}
        style={{height: height, width: width, tintColor: tintColor}}
      />
    </TouchableOpacity>
  );
}

export {CustomHeaderButton};
