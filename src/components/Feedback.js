import React,{useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import {CustomText} from './common';

const Feedback = ({navigation}) => {
  const[feedback,setFeedback]=useState('')
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
                height: 25,
                width: 25,
                marginRight: 10,
                tintColor: '#ffffff',
              }}
              source={require('../assets/icons/back.png')}
            />
          </TouchableOpacity>

          <CustomText
            text="Feedback"
            textColor="#f6bf3e"
            textSize={25}
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
          paddingLeft: 30,
          paddingTop: 50,
          paddingRight: 20,
        }}>
        <CustomText
          text="We love to hear from our community"
          textSize={20}
          textWeight={600}
          textColor="black"
        />
        <CustomText
          text="Send us your comments , feedback , or questions:"
          textSize={18}
          textWeight={600}
        />
        <TextInput
          multiline
          style={{
            // height: 40,
            width: '70%',
            backgroundColor: '#f7f5f5',
            borderRadius: 10,
            maxHeight: 260,
            borderWidth: 0.5,
            marginTop: 10,
            padding: 15,
          }}
          onChangeText={value=>setFeedback(value)}
          placeholder="Ex-What we can do to improve our app?"
        />
        <TouchableOpacity
        onPress={()=>Alert.alert("Thankyou for your valuable feedback!")}
         disabled={feedback? false:true}
          style={{
            width: '20%',
            backgroundColor: !feedback? 'lightgrey': '#025ab4',
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}>
          <CustomText
            text={'submit'}
            textSize={15}
            textWeight={600}
            textColor={!feedback?'black':"#f6bf3e"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Feedback;
