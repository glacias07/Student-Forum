import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from './AppStack';
import Dashboard from '../components/Dashboard';
import Tab2 from '../components/Tab2';
import DashStack from './DashboardStack';
const TabStackNav = createBottomTabNavigator();

const TabStack = () => {
  return (
    <TabStackNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 70},
        tabBarHideOnKeyboard: true,
      }}>
      <TabStackNav.Screen
        name="Posts"
        component={AppStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? 'blue' : undefined,
              }}
            />
          ),
        }}
      />
      <TabStackNav.Screen
        name="Chat"
        component={Tab2}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/chat.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? 'blue' : 'black',
              }}
            />
          ),
        }}
      />
      <TabStackNav.Screen
        name="Dashboard"
        component={DashStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/profile.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: focused ? 'blue' : undefined,
              }}
            />
          ),
        }}
      />
    </TabStackNav.Navigator>
  );
};

export default TabStack;
