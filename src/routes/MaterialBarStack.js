import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HelpDesk from '../components/HelpDesk';
import React from 'react';
import {View} from 'react-native';
import PostScreen from '../components/PostScreen';
import {CustomText} from '../components/common';
const MaterialTab = createMaterialTopTabNavigator();

const MaterialBarStack = () => {
  return (
    <>
      <View>
        <CustomText text="Surprise" />
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

export default MaterialBarStack;
