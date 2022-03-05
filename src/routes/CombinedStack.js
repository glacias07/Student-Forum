import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HelpDesk from '../components/HelpDesk';
import AppStack from './AppStack';
import React from 'react';
const MaterialTab = createMaterialTopTabNavigator();

const CombinedStack = () => {
  return (
    <MaterialTab.Navigator>
      <MaterialTab.Screen name="Home" component={AppStack} />
      <MaterialTab.Screen name="Help Desk" component={HelpDesk} />
    </MaterialTab.Navigator>
  );
};

export default CombinedStack;
