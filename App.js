import { StyleSheet, Text, View } from 'react-native';

import MainPage from './src/pages/MainPage';

export default function App() {
  return (
    <View style={styles.container}>
      <MainPage 
        username={'Abdulaziz'}
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
