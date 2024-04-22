import { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

import globalStyles from '../globalStyles';


const RoomState = () => {

return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style ={[styles.circle, styles.center]}>
        {[...Array(3).keys()].map((index)  => {
            return(
                <MotiView
                from = {{opacity:0.7, scale:1}}
                animate={{opacity: 0, scale: 1.5}}
                transition={{
                    type: 'timing',
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    delay: index * 400,
                    repeatReverse: false,
                    loop: true,

                }}
                key={index} 
                style={[StyleSheet.absoluteFillObject, styles.circle]} 
                />
            ) 
        })}
        </View>

    </View>
)
   
};

const styles = StyleSheet.create({
    
    circle: {
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

});

export default RoomState;