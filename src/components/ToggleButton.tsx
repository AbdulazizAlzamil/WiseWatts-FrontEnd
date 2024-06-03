import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../constants/globalStyles';

const ToggleButton = ({ socket, onToggle }) => {
  const [state, setState] = useState(socket.state);

  return (
    <TouchableOpacity style={[styles.circleButton, {shadowColor: state ? '#00ff00' : 'transparent'}]} onPress={() => {
      onToggle(socket);
      setState(prev => !prev);
    }}>
      <Icon style={styles.icon}
        name={'power'}
        size={50}
        color={state ? globalStyles.colors.secondary : '#1D1D2A'}
      />
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  circleButton: {
    width: 300,
    height: 300,
    borderRadius: 135,
    backgroundColor: '#494958',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 100, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 25,
    elevation: 15,
  },
  icon: {
    marginTop: 95,
  },
});