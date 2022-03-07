import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HelpDesk from '../components/HelpDesk';
import React from 'react';
import PostScreen from '../components/PostScreen';
const MaterialTab = createMaterialTopTabNavigator();

const MaterialBarStack = () => {
  return (
    <MaterialTab.Navigator
      options={{
        tabBarVisible: false,
      }}>
      <MaterialTab.Screen name="Home" component={PostScreen} />
      <MaterialTab.Screen name="Help Desk" component={HelpDesk} />
    </MaterialTab.Navigator>
  );
};

export default MaterialBarStack;
