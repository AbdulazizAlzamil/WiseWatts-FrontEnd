import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import globalStyles from "../../constants/globalStyles";

const Welcome = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('./assets/imgs/logo.png')}
        style={styles.image}
      /> */}
      <Text style={styles.welcomeText}>Welcome to WiseWatts!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next  &gt;</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#fff'
  },
  button: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    backgroundColor: globalStyles.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});


