import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { Image } from 'expo-image';
import { Button, Divider } from 'react-native-paper';
import Prompt from 'react-native-prompt-crossplatform';

import globalStyles from '../globalStyles';
import DeviceCard from '../components/DeviceCard';

import db from '../db.json';

const MainPage = ({ username }) => {
  const [index, setIndex] = useState(0);
  const [rooms, setRooms] = useState(['All Devices']);

  const getEnergyUsage = (deviceId) => {
    const sockets = db.sockets.filter(socket => socket.device_id === deviceId);
    return sockets.reduce((total, socket) => {
      const consumption = db.hourly_consumption.filter(consumption => consumption.socket_id === socket.socket_id)
        .reduce((acc, cur) => acc + cur.con_value, 0);
      return total + consumption;
    }, 0);
  }

  useEffect(() => {
    const uniqueRooms = [...new Set(db.devices.map(device => device.room))];
    setRooms(['All Devices', ...uniqueRooms]);

  }, []);

  return (  
    <View style={[StyleSheet.absoluteFill, { marginTop: 70, gap: 20 }]}>
      <View style={styles.headerContainer}>
        <Image
          style={[styles.image, { marginRight: 'auto', width: 40, height: 40 }]}
          source={require("../assets/imgs/logo.png")}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.headerText}>{username}'s House</Text>
      </View>

      <Tab
        scrollable={rooms.length > 3}
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: globalStyles.colors.primary,
          height: 3,
        }}
        variant="default"
      >
        {rooms.map((category, index) => (
          <Tab.Item
            key={index}
            title={category}
            titleStyle={{ fontSize: 16, color: '#fff' }}
          />
        ))}
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        {rooms.map((room, index) => {
          return (
            <TabView.Item style={styles.tabViewItem} key={index}>
              <View style={{ gap: 10 }}>
                {db.devices.filter(device => (index === 0) ? true : device.room === room).map((device, index) => {
                  return (
                    <DeviceCard
                      key={device.device_id}
                      deviceName={`Device #${device.device_id}`}
                      energyUsage={getEnergyUsage(device.device_id)}
                      handleStateToggle={() => {
                        
                      }}
                    />
                  );
                })}
              </View>
            </TabView.Item>
          )
        })}
      </TabView>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: -20,
    marginHorizontal: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-end',
    color: '#fff',
    lineHeight: 40,
  },
  tabViewItem: {
    backgroundColor: globalStyles.colors.background,
    width: '100%'
  },
  button: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 20
  },
});