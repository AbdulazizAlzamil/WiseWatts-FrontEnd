import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { Image } from 'expo-image';
import { Button, Divider } from 'react-native-paper';
import Prompt from 'react-native-prompt-crossplatform';

import globalStyles from '../globalStyles';
import DeviceCard from '../components/DeviceCard';

const MainPage = ({username, imageUrl}) => {
  const [index, setIndex] = useState(0);
  const [rooms, setRooms] = useState(['All Devices', 'Kitchen']);
  const [room, setRoom] = useState();
  const [promptVisible, setPromptVisible] = useState(false);

  return (  
    <View style={[StyleSheet.absoluteFill, { marginTop: 70, gap: 20 }]}>
      <View style={styles.headerContainer}>
        <Image
          style={[styles.image, { marginRight: 'auto', width: 40, height: 40 }]}
          source={require("../assets/imgs/logo.png")}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.headerText}>Hamza's House</Text>
        <Image
          style={styles.image}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Divider style={{ backgroundColor: 'gray', height: 1 }} />
      <Prompt
        title="Add room"
        placeholder="Enter the room name"
        isVisible={promptVisible}
        onChangeText={(text) => {
          setRoom(text);
        }}
        onCancel={() => {
          setPromptVisible(false);
        }}
        onSubmit={() => {
          setPromptVisible(false);
          setRooms([...rooms, room]);
        }}
      />

      <View style={{flexDirection: 'row'}}>
        <Button 
          style={[styles.button, { marginLeft: 20, backgroundColor: '#ff6347' }]}
          onPress={() => {
            if (index !== 0) {
              Alert.alert('Delete room', `Are you sure you want to delete the room "${rooms[index]}"?`, [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    setRooms(rooms.filter((_, i) => i !== index));
                    setIndex(rooms.length - 1);
                  },
                },
              ]);
            }
          }}
          mode='contained'
          buttonColor={globalStyles.colors.primary}
          textColor='#fff'
        >
          Delete current room
        </Button>
        
        <Button 
          style={styles.button}
          onPress={() => {
            setPromptVisible(true);
          }}
          mode='contained'
          buttonColor={globalStyles.colors.primary}
          textColor='#fff'
        >
          Add a room
        </Button>
      </View>
      <Divider style={{ backgroundColor: 'gray', height: 1 }} />

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
            titleStyle={{ fontSize: 16 }}
          />
        ))}
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        {rooms.map((room, index) => {
          return (
            <TabView.Item style={styles.tabViewItem} key={index}>
              <View style={{ gap: 10 }}>
                <DeviceCard
                  deviceName={'Device 1'}
                  energyUsage={0.1}
                  handleStateToggle />
                <DeviceCard
                  deviceName={'Device 2'}
                  energyUsage={0.7}
                  handleStateToggle />
                <DeviceCard
                  deviceName={'Device 3'}
                  energyUsage={0.3}
                  handleStateToggle />
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
    marginRight: 40,
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