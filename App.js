import { StyleSheet, Text, View } from 'react-native';

import MainPage from './pages/MainPage';
import RoomState from './pages/RoomState';

export default function App() {
  return (
    <View style={styles.container}>
      <MainPage 
        username={'Hamza'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
