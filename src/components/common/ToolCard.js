import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomText} from '../common/CustomText';

const ToolCard = (props) => {
    const {title, color, descp, image} = props;
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        backgroundColor: color,
        borderRadius: 10,
        padding: 20,
        margin: 10,
      }}>
      <CustomText
        text={title}
        textSize={20}
        textWeight={700}
        textColor='black'
        style={{marginBottom: 5}}
      />
      <CustomText
        text={descp}
        textSize={15}
        textWeight={400}
        style={{marginBottom: 5, paddingRight: '40%'}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '50%',
            alignItems: 'center',
          }}>
          <CustomText
            text="Start"
            textSize={20}
            textWeight={900}
            textColor="#00A2AD"
          />
          <Image
            style={{width: 20, height: 20, marginLeft: 5}}
            source={require('../../assets/icons/right-arrow.png')}
            tintColor="#00A2AD"
          />
        </View>
        <Image
          style={{width: 60, height: 60}}
          source={image}
        />
      </View>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({});

export default ToolCard;
