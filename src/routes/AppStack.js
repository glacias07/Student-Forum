import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from '../components/PostScreen';
import CreateScreen from '../components/CreateScreen';
import PostDetails from '../components/PostDetails';
import SetupProfileScreen from '../components/SetupProfileScreen';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './AuthProvider';
const AppStackNav = createNativeStackNavigator();
import Styles from '../Styles';
import ChatScreen from '../components/ChatScreen';
import PersonalMessage from '../components/PersonalMessage';
import PostComment from '../components/PostComment';

const AppStack = () => {
  const [userDetails, setUserDetails] = useState([]);
  const {user} = useContext(AuthContext);
  const fetchUserDetails = async () => {
    try {
      const list = [];

      await firestore()
        .collection('userDetails')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {userId, username, bio, hobbies} = doc.data();
            list.push({
              userId,
              username,
              bio,
              hobbies,
            });
          });
        });
      setUserDetails(list);
    } catch (error) {
      console.log('Error while fetching posts', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <AppStackNav.Navigator>
      {userDetails.length !== 0 ? null : (
        <AppStackNav.Screen
          name="Setup"
          component={SetupProfileScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: Styles.commonHeaderStyle,
            headerTitleStyle: Styles.commonHeaderTitleStyle,
            headerTitleAlign: 'center',
          }}
        />
      )}
      <AppStackNav.Screen
        name="Posts Screen"
        component={PostScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <AppStackNav.Screen
        name="Post Details"
        component={PostDetails}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          // headerTitleAlign: 'center',
          headerTitle: '',
        }}
      />

      <AppStackNav.Screen
        name="Post Comment"
        component={PostComment}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          // headerTitleAlign: 'center',
          headerTitle: '',
        }}
      />
      <AppStackNav.Screen
        name="Create Screen"
        component={CreateScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <AppStackNav.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
      <AppStackNav.Screen
        name="Personal Message"
        component={PersonalMessage}
        options={({route}) => ({
          title: route.params.username,
          headerShadowVisible: false,
          headerStyle: Styles.commonHeaderStyle,
          headerTitleStyle: Styles.commonHeaderTitleStyle,
          headerTitleAlign: 'center',
        })}
      />
    </AppStackNav.Navigator>
  );
};

export default AppStack;
