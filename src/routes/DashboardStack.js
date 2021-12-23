import * as React from 'react';
import {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostDetails from '../components/PostDetails';
import Dashboard from '../components/Dashboard';
import ViewAllUserPostsScreen from '../components/ViewAllUserPostsScreen';
import EditProfile from '../components/EditProfileScreen';
import Styles from '../Styles';
const DashStackNav = createNativeStackNavigator();

const DashStack = () => {
  return (
    <DashStackNav.Navigator>
      <DashStackNav.Screen
        name="DashBoard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <DashStackNav.Screen
        name="All Posts"
        component={ViewAllUserPostsScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <DashStackNav.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <DashStackNav.Screen
        name="Post Details"
        component={PostDetails}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
    </DashStackNav.Navigator>
  );
};

export default DashStack;
