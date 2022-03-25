import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {CustomText} from '.';

const renderIcon = icon => {
  if (icon) {
    return <Image style={styles.iconStyle} source={icon} />;
  }
};

const renderLabel = label => {
  if (label) {
    return (
      <CustomText
        style={{marginLeft: 4, marginBottom: 3}}
        text={label}
        textSize={15}
        textColor={'#656567'}
        textWeight={500}
      />
    );
  }
};

const renderBorderBottomOnly = bool => {
  var bottomBorderWidth = undefined;
  var borderWidth = undefined;
  if (bool) {
    bottomBorderWidth = 1;
  } else {
    borderWidth = 1;
  }
  return {
    borderBottomWidth: bottomBorderWidth,
    borderWidth: borderWidth,
  };
};

const FormInput = ({
  labelValue,
  placeHolderText,
  onlyBottomBorder,
  icon,
  label,
  style,
  ...rest
}) => {
  return (
    <View style={style}>
      {renderLabel(label)}
      <View
        style={[
          styles.inputContainer,
          renderBorderBottomOnly(onlyBottomBorder),
        ]}>
        {renderIcon(icon)}
        <TextInput
          value={labelValue}
          style={styles.input}
          numberOfLines={1}
          placeholder={placeHolderText}
          placeholderTextColor="#666"
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = {
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    borderColor: '#ccc',
    borderRadius:15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 5
  },
  iconStyle: {
    height: 20,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginVertical: 13,
    marginRight: -5
  },
  input: {
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
};

export {FormInput};
