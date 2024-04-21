import { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native'
import { Card } from '@rneui/themed';
import { Image } from 'expo-image';
import globalStyles from '../globalStyles';

const DeviceCard = ({deviceName, energyUsage, handleStateToggle}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Card containerStyle={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Card.Title style={{alignSelf: 'flex-start', color: '#fff', fontSize: 26}}>{deviceName}</Card.Title>
        <Switch
          style={{alignSelf: 'flex-end', marginTop: -25, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
          trackColor={{ false: "#2E2E3E", true: "gray"}}
          thumbColor={isEnabled ? "#ABE505" : "#848184"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          onChange={handleStateToggle}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('../assets/imgs/electricity-logo.png')} style={{ width: 35, height: 35 }} />
        <View>
          <Text style={{color: globalStyles.colors.secondary, fontSize: 20, marginLeft: 10, fontWeight: 'bold'}}>{energyUsage}kW</Text>
          <Text style={{color: globalStyles.colors.secondary, fontSize: 12, marginLeft: 10}}>Energy Usage</Text>
        </View>
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