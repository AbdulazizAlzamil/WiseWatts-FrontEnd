import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainPage from './src/pages/MainPage';
import RoomState from './src/pages/RoomState';
import Scheduling from './src/pages/Scheduling';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* 
            <MainPage 
              username={'Abdulaziz'}
            />
          </View> */}
          <Stack.Screen name="Scheduling" component={Scheduling} />
          <Stack.Screen name="Main Page" component={MainPage} />
          <Stack.Screen name="Room State" component={RoomState} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}