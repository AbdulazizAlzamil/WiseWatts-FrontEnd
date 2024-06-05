import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import globalStyles from "../../constants/globalStyles";
import ToggleButton from '../components/ToggleButton';

const initialLayout = { width: 320 };

const RoomState = ({ route, navigation }) => {
  const [sockets, setSockets] = useState([]);
  const { deviceId } = route.params;
  // const deviceId = 69;
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: 'Socket #1' },
    { key: 'second', title: 'Socket #2' },
    { key: 'third', title: 'Socket #3' },
  ]);

  const handleToggle = async (socket) => {
    try {
      await axios.post(`http://192.168.1.31:3000/CommandController/CreateCommand`, {
        socket_id: socket.socket_id,
        device_id: socket.device_id,
      })
    } catch(err) {
      console.log("handleToggle");
      console.log(err);
    }
  };

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: globalStyles.colors.background }]}>
      <ToggleButton socket={sockets[0] || {}} onToggle={handleToggle} />
    </View>
  );
  
  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: globalStyles.colors.background }]}>
      <ToggleButton socket={sockets[1] || {}} onToggle={handleToggle} />
    </View>
  );
  
  const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: globalStyles.colors.background }]}>
      <ToggleButton socket={sockets[2] || {}} onToggle={handleToggle} />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props:any) => (
    <>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: globalStyles.colors.secondary }}
        style={{ backgroundColor: globalStyles.colors.background }}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Scheduling', { socketId: sockets[index].socket_id })}>
          <Text style={styles.navText}>Schedules</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log("Goals")}>
          <Text style={styles.navText}>Goals</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  useEffect(() => {
    const fetchSockets = async () => {
      try {
        const response = await axios.get(`http://192.168.1.31:3000/SocketController/FindSocketsByDevice/${deviceId}`);
        const data = response.data;
        setSockets(data);
        setRoutes([
          { key: 'first', title: data[0]?.socket_name || 'Socket 1' },
          { key: 'second', title: data[1]?.socket_name || 'Socket 2' },
          { key: 'third', title: data[2]?.socket_name || 'Socket 3' },
        ])
      } catch(err) {
        console.log("fetchSockets");
        console.log(err);
      }
    }

    fetchSockets();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Device #1</Text>
      </View>

      <TabView
        style={{paddingTop: 20}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default RoomState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.background,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    height: 70,
    backgroundColor: globalStyles.colors.background,
  },
  headerTitle: {
    fontSize: 24,
    color: '#ffff',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 3,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: globalStyles.colors.background,
    padding: 10,
  },
  navButton: {
    backgroundColor: globalStyles.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  navText: {
    color: globalStyles.colors.background,
    textAlign: 'center',
    fontSize: 16,
  }
});