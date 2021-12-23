import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {CustomText} from '.';

const SmallButton = ({title, icon, style, ...rest}) => {
  const {buttonStyle, iconStyle} = styles;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[buttonStyle, style]}
      {...rest}>
      <Image source={icon} style={iconStyle} />
      <CustomText textColor="#5d5b69" text={title} />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: '#ffffff',
    height: 85,
    aspectRatio: 1,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
  },
  iconStyle: {
    tintColor: '#a4abb6',
    aspectRatio: 1,
    height: '40%',
    marginBottom: 7,
  },
};

export {SmallButton};
