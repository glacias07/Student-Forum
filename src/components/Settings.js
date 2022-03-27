import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {CustomText} from './common';
import SettingsItem from './common/SettingsItem';

const data = [
  {id: 1, icon: require('../assets/icons/bell.png'), name: 'Notifications'},
  {id: 2, icon: require('../assets/icons/call.png'), name: 'Contact Us'},
  {id: 3, icon: require('../assets/icons/user.png'), name: 'About Us'},
  {id: 4, icon: require('../assets/icons/feedback.png'), name: 'Feedback'},
];
const Settings = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#025ab4', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
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
            text="Settings"
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
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: 30,
          //   justifyContent: 'center',
          //   alignItems: 'center',
          paddingLeft: 20,
          paddingTop: 10,
          paddingRight: 20,
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <SettingsItem
              icon={item.icon}
              name={item.name}
              onPress={() => navigation.navigate(item.name)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
