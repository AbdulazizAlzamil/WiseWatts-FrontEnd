import { useEffect, useState } from 'react';
import axios from 'axios';
// import { v4 as uuid } from 'uuid';
// import random from 'random'
import { Text, View, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Tab, TabView, Card } from '@rneui/themed';
import { Button, Divider } from 'react-native-paper';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import Prompt from 'react-native-prompt-crossplatform';

import globalStyles from '../../constants/globalStyles';
import DeviceCard from '../components/DeviceCard';
import API_URL from '../../config';

const MainPage = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [promptValue, setPromptValue] = useState('');
  const [cardVisible, setCardVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [devices, setDevices] = useState([]);
  const [sockets, setSockets] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStateToggle = async (deviceId) => {
    await axios.put(`${API_URL}/WisewattsDeviceController/ToggleDevice/${deviceId}`);
  }

  const handleDeleteDevice = async (deviceId) => {
    try {
      await axios.delete(`${API_URL}/WisewattsDeviceController/DeleteDevice/${deviceId}`);
      await getDevices();
      await getRooms();
    } catch (err) {
      console.log("handleDeleteDevice error");
      console.error(err);
    }
  }

  const addDevice = async (roomName) => {
    try {
      await axios.post(`${API_URL}/WisewattsDeviceController/CreateDevice`, {
        state: false,
        serial_number: Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111,
        room: roomName
      });
      await getDevices();
      await getRooms();
    } catch (err) {
      console.log("addDevice error");
      console.log(err);
    }
  }

  const getDevices = async () => {
    try {
      const response = await axios.get(`${API_URL}/WisewattsDeviceController/FindAllDevices`);
      const data = response.data;
      setDevices(data);
    } catch (err) {
      console.log("getDevices error");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  
  const getRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/WisewattsDeviceController/FindAllDevices`);
      const data = response.data;
      
      const uniqueRooms = [...new Set(['All Devices', ...data.map(device => device.room)])];
      console.log(uniqueRooms);
      
      setRooms(uniqueRooms);
    } catch (err) {
      console.log("getRoom error");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }
  
  const getSockets = async () => {
    try {
      const response = await axios.get(`${API_URL}/SocketController/FindAllSockets`);
      const data = response.data;
      setSockets(data);
    } catch(err) {
      console.log("getSockets error");
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }  
  
  useEffect(() => {
    getDevices();
    getRooms();
    getSockets();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill, { marginTop: 20, gap: 20 }]}>
        <View style={styles.headerContainer}>
          <Image
            style={[styles.image, { marginRight: 'auto', width: 40, height: 40 }]}
            source={require("../../assets/imgs/logo.png")}
            contentFit="cover"
            transition={1000}
          />
          {/* <Text style={styles.headerText}>{username}'s House</Text> */}
        </View>
  
        {loading ? (
          <ActivityIndicator size="large" color={globalStyles.colors.primary} />
        ) : (
          <>
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
                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator>
                      <View style={{ gap: 10 }}>
                        {devices.filter(device => (index === 0) ? true : device.room === room).map((device, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => navigation.navigate('Room State', { deviceId: device.device_id })}
                              key={index}
                            >
                              <DeviceCard
                                key={device.device_id}
                                device={device}
                                // energyUsage={getEnergyUsage(device.device_id)}
                                onStateToggle={handleStateToggle}
                                onDeleteDevice={handleDeleteDevice}
                              />
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </TabView.Item>
                )
              })}
            </TabView>
          </>
        )}
  
        <Button
          labelStyle={{ color: globalStyles.colors.background }}
          style={styles.button}
          icon="plus"
          mode="contained"
          onPress={() => setCardVisible(true)}
          children="Add Device"
        />
        {cardVisible && (
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card containerStyle={{ padding: 20, borderRadius: 10 }}>
              <Card.Title style={{fontSize: 20}}>Select the room in which the device is located</Card.Title>
              {rooms.length > 0 && (
                <>
                  <Select
                    selectedIndex={selectedIndex}
                    onSelect={index => { setSelectedIndex(index); setPromptValue(rooms[(selectedIndex as IndexPath).row])}}
                    value={rooms[(selectedIndex as IndexPath).row + 1]}
                  >
                    {rooms.filter((_, idx) => idx !== 0)
                          .map((room, index) => (
                            <SelectItem key={index} title={room} />
                    ))}
                  </Select>
                  <Text style={{textAlign: 'center', marginTop: 10, color: 'gray'}}>Or</Text>
                </>
              )}
              <View style={{marginTop: 5}}>
                <Text>Enter a new room name:</Text>
                <TextInput
                  placeholder="Room name"
                  onChangeText={text => setRoomName(text)}
                  value={roomName}
                  style={{borderWidth: 1, borderColor: '#000', padding: 5, borderRadius: 5, marginVertical: 5}}
                />
                <Button
                  style={{width: '100%', backgroundColor: globalStyles.colors.background, borderRadius: 5}}
                  textColor='#fff'
                  onPress={() => {
                    if(roomName || promptValue) {
                      addDevice(roomName || promptValue);
                      setCardVisible(false);
                      setRoomName('');
                    }
                  }}
                >Add</Button>
                <Button
                  style={{width: '100%', borderRadius: 5, marginTop: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: globalStyles.colors.background}}
                  textColor='#000'
                  onPress={() => {
                    setCardVisible(false);
                    setRoomName('');
                  }}
                >Cancel</Button>
              </View>
            </Card>
          </View>
        )}
      </View>
    </View>
  ); 
};

export default MainPage;

const styles = StyleSheet.create({
  bigFont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
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
    width: '100%',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: globalStyles.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#2E2E3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
