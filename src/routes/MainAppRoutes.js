import * as React from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import TabStack from './TabStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {useContext, useState, useEffect} from 'react';
import SplashScreen from '../components/SplashScreen';

const Stack = createNativeStackNavigator();

// const Splash = createNativeStackNavigator();

function MainAppRoutes() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        
        {user ? (
          <>
            <Stack.Screen name="Main App" component={TabStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth Stack" component={AuthStack} />
          </>
        )}
{/* 
        <Stack.Screen name="Main App" component={TabStack} />
        <Stack.Screen name="Auth Stack" component={AuthStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const SplashStack = () => {
//   return (
//     <Splash.Navigator>
//       <Splash.Screen name="Splash" component={SplashScreen} />
//     </Splash.Navigator>
//   );
// };

export default MainAppRoutes;
