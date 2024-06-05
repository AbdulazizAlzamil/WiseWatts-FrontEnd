import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Switch } from 'react-native'
import { Card } from '@rneui/themed';
import { Button, Divider } from 'react-native-paper';
import { Image } from 'expo-image';
import API_URL from '../../config';

import globalStyles from '../../constants/globalStyles';

// modified parameters to include alarmTime
const DeviceCard = ({device, onStateToggle, onDeleteDevice}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    const getDeviceState = async () => {
      try {
        const response = await axios.get(`${API_URL}/WisewattsDeviceController/FindDeviceById/${device.device_id}`);
        setIsEnabled(response.data[0].state);
      } catch (err) {
        console.error(err);
      }
    }

    getDeviceState();
  }, [])

  return (
    <Card containerStyle={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
        <Card.Title style={{alignSelf: 'flex-start', color: '#fff', fontSize: 26}}>{`Device #${device.device_id}`}</Card.Title>
        <Switch
          style={{alignSelf: 'flex-end', marginTop: -25, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
          trackColor={{ false: "#2E2E3E", true: "gray"}}
          thumbColor={isEnabled ? globalStyles.colors.secondary : "#848184"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          onChange={() => onStateToggle(device.device_id)}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={require('../../assets/imgs/electricity-logo.png')} style={{ width: 35, height: 35 }} />
        <View style={{marginRight: 'auto'}}>
          <Text style={{color: globalStyles.colors.secondary, fontSize: 12, marginLeft: 10}}>Energy Usage</Text>
        </View>
        <Button 
          onPress={() => onDeleteDevice(device.device_id)}
          contentStyle={{backgroundColor: globalStyles.colors.red}}
          labelStyle={{color: '#fff'}}
        >
          Delete Device
        </Button>
      </View>
    </Card>
  )
};

export default DeviceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3f4055',
    borderWidth: 0,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});