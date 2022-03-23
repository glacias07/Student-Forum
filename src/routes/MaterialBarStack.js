import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HelpDesk from '../components/HelpDesk';
import React from 'react';
import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import PostScreen from '../components/PostScreen';
import {CustomText} from '../components/common';
import {connect} from 'react-redux';
const MaterialTab = createMaterialTopTabNavigator();

const MaterialBarStack = props => {
  const {avatar, navigation} = props;
  return (
    <>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            margin: 10,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/icons/bell.png')}
            />
          </TouchableOpacity>
          <CustomText
            text="Community"
            textSize={18}
            textWeight={700}
            textColor={'black'}
          />
          <TouchableOpacity>
            <Image
              style={{
                height: 35,
                width: 35,
                // marginRight: 15,
                borderRadius: 150 / 2,
                borderWidth: 0.5,
                borderColor: 'black',
              }}
              source={{uri: avatar}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Create Screen')}
            style={{
              flexDirection: 'row',
              width: '60%',
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#e9f0f2',
              borderRadius: 20,
              paddingLeft: 20,
              marginLeft: 15,
              marginBottom: 5,
            }}>
            <Image
              style={{width: 17, height: 17, marginRight: 10}}
              source={require('../assets/icons/edit.png')}
            />
            <CustomText
              text={'share something ...'}
              textSize={16}
              textWeight={400}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '10%',
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#e9f0f2',
              borderRadius: 10,

              marginLeft: 15,
              marginBottom: 5,
            }}>
            <Image
              style={{width: 17, height: 17}}
              source={require('../assets/icons/filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '10%',
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#e9f0f2',
              borderRadius: 10,

              marginLeft: 15,
              marginBottom: 5,
            }}>
            <Image
              style={{width: 17, height: 17}}
              source={require('../assets/icons/edit.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 0.2, color: '#cfd3d4', margin: 10,opacity:0.3}}></View>
      </View>
      <MaterialTab.Navigator
        options={{
          tabBarVisible: false,
        }}>
        <MaterialTab.Screen name="Home" component={PostScreen} />
        <MaterialTab.Screen name="Help Desk" component={HelpDesk} />
      </MaterialTab.Navigator>
    </>
  );
};
const mapStateToProps = state => {
  return {
    avatar: state.postListing.avatar,
  };
};
export default connect(mapStateToProps, {})(MaterialBarStack);
