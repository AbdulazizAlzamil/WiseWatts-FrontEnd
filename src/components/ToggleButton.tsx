import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../../constants/globalStyles';
import API_URL from '../../config';

const ToggleButton = ({ socket, onToggle }) => {
  const [state, setState] = useState(socket.state);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentValue = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/CurrentController/GetCurrent/${socket.socket_id}`);
        if (response.data.current) {
          setCurrent(response.data.current);
        }
      } catch (error) {
        console.error('Error fetching current value:', error);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      if(state)
        getCurrentValue();
    }, 2000);

    return () => clearInterval(interval);
  }, [state]);
  
  return (
    <TouchableOpacity 
      style={[styles.circleButton, {shadowColor: state ? '#00ff00' : 'transparent'}]} 
      onPress={() => {
      onToggle(socket);
      setState(prev => !prev);
    }}>
      <Text style={styles.currentReading}>{(state && current) ? `${current}W` : null}</Text>
      <View style={styles.icon}>
        <Icon
          name={'power'}
          size={50}
          color={state ? globalStyles.colors.secondary : '#1D1D2A'}
        />
        <Text style={{fontSize: 20, marginTop: 5, textAlign: 'center', color: state ? globalStyles.colors.secondary : null }}>{state ? 'On' : 'Off'}</Text>
      </View>
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
    position: 'absolute',
    top: 110,
    marginTop: 95,
  },
  currentReading: {
    textAlign: 'center',
    color: globalStyles.colors.secondary,
    fontSize: 40,
  }
});