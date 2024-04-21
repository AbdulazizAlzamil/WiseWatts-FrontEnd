import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { Image } from 'expo-image';
import { Button, Divider } from 'react-native-paper';
import Prompt from 'react-native-prompt-crossplatform';
import LinearGradient from 'react-native-linear-gradient';

import globalStyles from '../globalStyles';
import DeviceCard from '../components/DeviceCard';

const MainPage = ({username, imageUrl}) => {
  const [index, setIndex] = useState(0);
  const [rooms, setRooms] = useState(['All Devices']);
  const [room, setRoom] = useState();
  const [promptVisible, setPromptVisible] = useState(false);

  return (  
    // Profile Section
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

      <Tab
        scrollable={rooms.length > 3}
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: globalStyles.colors.primary,
          height: 3,
          width: 110, 
          marginHorizontal: 46,
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