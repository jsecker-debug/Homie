import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';

// Define the type for our navigation stack parameters
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [initializing]);

  // Show nothing while initializing
  if (initializing) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackVisible: false,
        }}
      >
        {user ? (
          // User is signed in
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Home',
              headerLeft: () => null,
            }}
          />
        ) : (
          // No user is signed in
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen}
            options={{
              title: 'Welcome',
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;