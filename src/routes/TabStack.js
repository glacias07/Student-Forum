import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialBarStack from './MaterialBarStack';
import PostScreen from '../components/PostScreen';
import ChatScreen from '../components/ChatScreen';
import Dashboard from '../components/Dashboard';
import Tools from '../components/Tools';

const TabStackNav = createBottomTabNavigator();

const TabStack = route => {
  getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Post Details') {
      return false;
    }

    return true;
  };
  return (
    <TabStackNav.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 70},
        tabBarHideOnKeyboard: true,
      }}>
      <TabStackNav.Screen
        name="Posts"
        component={MaterialBarStack}
        options={{
          headerShown: false,
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
          // headerTitle:"Hello"
          // tabBarStyle: { backgroundColor: 'powderblue' }
        }}
      />
      <TabStackNav.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/messages.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? 'blue' : 'black',
              }}
            />
          ),
        }}
      />
      <TabStackNav.Screen
        name="Tools"
        component={Tools}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/head.png')}
              style={{
                height: 30,
                width: 30,
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
