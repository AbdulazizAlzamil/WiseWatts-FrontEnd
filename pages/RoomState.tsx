import { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { Tab, TabView } from '@rneui/themed';
import { Image } from 'expo-image';

import globalStyles from '../globalStyles';


const RoomState = () => {
    const [index, setIndex] = useState(0);
    const [sockets, setSockets] = useState(['Socket #1', 'Socket #2', 'Socket #3', 'Socket #4']);

return (
    //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={[StyleSheet.absoluteFill, {marginTop: 70, gap: 20 }]}>

<View style={styles.headerContainer}>
        {/* <Image
          style={[styles.image, {  width: 40, height: 40 }]}
          source={require("../assets/imgs/logo.png")}
          contentFit="cover"
          transition={1000}
        /> */}
        <Text>{'<'}</Text>
        <Text style={styles.headerText}>Bitch House</Text>
        <Image
          style={[styles.image, {  width: 40, height: 40 }]}
          source={require("../assets/imgs/logo.png")}
          contentFit="cover"
          transition={1000}
        />
      </View>

        <Tab
        scrollable={sockets.length > 3}
        value={index}
        onChange={(e) => setIndex(e)}
        //style={{marginTop:100}}
        indicatorStyle={{
          backgroundColor: globalStyles.colors.primary,
          height: 3,
          
        }}
        variant="default"
        >
        {sockets.map((category, index) => (
          <Tab.Item
            key={index}
            title={category}
            titleStyle={{ fontSize: 16, color: '#fff' }}
          />
        ))}
        </Tab>
        
        <TabView value={index} onChange={setIndex} animationType="spring">

            {sockets.map((room, index) => {
               return (
                <TabView.Item style={styles.tabViewItem} key={index}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    <View style={[styles.circle, styles.center, {zIndex:5}]}/>
                    <View style ={[styles.circle, styles.center, ]}>
                    {[...Array(3).keys()].map((index)  => {
                        return(
                            <MotiView
                            from = {{opacity:0.6, scale:1}}
                            animate={{opacity: 0, scale: 1.5}}
                            transition={{
                                type: 'timing',
                                duration: 1500,
                                easing: Easing.out(Easing.ease),
                                delay: index * 400,
                                repeatReverse: false,
                                loop: true,

                            }}
                            key={index} 
                            style={[StyleSheet.absoluteFillObject, styles.circle, {backgroundColor:'#ABE505'}]} 
                            />
                        ) 
                    })}
                    </View>
                </View>

                </TabView.Item>
              ) 
            })}
            
        </TabView>
    </View>
)
   
};

const styles = StyleSheet.create({
    
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'flex-end',
        color: '#fff',
        lineHeight: 40,
      },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: -20,
        marginHorizontal: 20,
      },    
    circle: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#3A3A4E',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    animatedCircle: {
        backgroundColor: '#ABE505', // Color for animated circle
    },
    center: {
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      tabViewItem: {
        backgroundColor: globalStyles.colors.background,
        width: '100%'
      },

});

export default RoomState;