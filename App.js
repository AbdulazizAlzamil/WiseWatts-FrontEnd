import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import MainPage from './src/pages/MainPage';
import RoomState from './src/pages/RoomState';
import Scheduling from './src/pages/Scheduling';
import Signup from './src/pages/Signup';
import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Scheduling" component={Scheduling} />
          <Stack.Screen name="Main Page" component={MainPage} />
          <Stack.Screen name="Room State" component={RoomState} />
          <Stack.Screen name="Scheduling" component={Scheduling} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}