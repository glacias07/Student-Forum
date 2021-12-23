import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

const textStyle = (textColor, textWeight, textSize, textAlign) => {
  var fontFamily = '';

  if (textWeight <= 200) {
    fontFamily = 'Satoshi-Light';
  } else if (textWeight >= 201 && textWeight <= 400) {
    fontFamily = 'Satoshi-Regular';
  } else if (textWeight >= 401 && textWeight <= 600) {
    fontFamily = 'Satoshi-Medium';
  } else if (textWeight >= 601 && textWeight <= 700) {
    fontFamily = 'Satoshi-Bold';
  } else if (textWeight > 700) {
    fontFamily = 'Satoshi-Black';
  } else {
    fontFamily = 'Satoshi-Regular';
  }

  return {
    color: textColor,
    fontFamily: fontFamily,
    fontSize: textSize,
    textAlign: textAlign,
  };
};

const CustomText = ({
  text,
  textColor,
  textSize,
  textWeight,
  style,
  ellippsizeMode,
  numberOfLines,
  children,
  textAlign,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellippsizeMode}
      style={[
        styles.defaultTextStyle,
        textStyle(textColor, textWeight, textSize, textAlign),
        style,
      ]}>
      {text}
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    fontFamily: 'Satoshi-Black',
    color: 'black',
    fontSize: 10,
  },
});

export {CustomText};
