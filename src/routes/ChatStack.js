import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalMessage from '../components/PersonalMessage';
import ChatScreen from '../components/ChatScreen';
import Styles from '../Styles';
const ChatStackNav = createNativeStackNavigator();


const ChatStack = () => {
  return (
    <ChatStackNav.Navigator>
      <ChatStackNav.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{
          title: 'Your Chats',
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />

      <ChatStackNav.Screen
        name="Personal Message"
        component={PersonalMessage}
        options={({route}) => ({
          title: route.params.username,
        
        })}
      />
    </ChatStackNav.Navigator>
  );
};

export default ChatStack
