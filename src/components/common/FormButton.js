import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CustomText} from '.';

const FormButton = ({buttonTitle,style, ...rest}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer,style]} {...rest}>
      <CustomText
        text={buttonTitle}
        textSize={20}
        textWeight={600}
        textColor="#ffffff"
      />
    </TouchableOpacity>
  );
};

const styles = {
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: 'darkblue',
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
};
export {FormButton};
