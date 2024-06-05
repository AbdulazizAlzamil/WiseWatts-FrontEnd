import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../constants/globalStyles';
import API_URL from '../../config';

const ToggleButton = ({ socket, onToggle }) => {
  const [state, setState] = useState(socket.state);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const response = axios.get(`${API_URL}/CurrentController/GetCurrent/${socket.socket_id}`);
    // setCurrent(response.data.current);
  }, []);

  return (
    <TouchableOpacity style={[styles.circleButton, {shadowColor: state ? '#00ff00' : 'transparent'}]} onPress={() => {
      onToggle(socket);
      setState(prev => !prev);
    }}>
      <Text style={styles.currentReading}>2 kW</Text>
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
  currentReading: {
    textAlign: 'center',
    color: globalStyles.colors.secondary,
    fontSize: 40,
  }
});