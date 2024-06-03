import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from "../../constants/globalStyles";

const Scheduling = () => {
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [alarms, setAlarms] = useState<Date[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const onChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShow(false);
        setTime(currentTime);
    };

    const showTimepicker = () => {
        setShow(true);
    };

    const addAlarm = () => {
        setAlarms([...alarms, time]);
        setModalVisible(false);
    };

    const deleteAlarm = (index: number) => {
        const newAlarms = alarms.filter((_, i) => i !== index);
        setAlarms(newAlarms);
    };

    const calculateTimeLeft = (alarmTime) => {
        const now = new Date();
        const timeDifference = alarmTime.getTime() - now.getTime();
        if (timeDifference <= 0) return 'Alarm time has passed';

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m left`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            alarms.forEach((alarm) => {
                const timeLeft = calculateTimeLeft(alarm);
                if (timeLeft === 'Alarm time has passed') {
                    Alert.alert("Alarm Notification", `Your alarm set for ${alarm.toLocaleTimeString()} has passed.`);
                    deleteAlarm(alarms.indexOf(alarm));
                }
            });
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [alarms]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Set Alarm</Text>
            </View>
            <View style={styles.scene}>
                <Button title="Add Alarm" onPress={() => setModalVisible(true)} />
                <FlatList
                    data={alarms}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.alarmItem}>
                            <Text style={styles.text}>{item.toLocaleTimeString()}</Text>
                            <Text style={styles.text}>{calculateTimeLeft(item)}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteAlarm(index)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {modalVisible && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Select Time</Text>
                            <Button onPress={showTimepicker} title="Show time picker!" />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={time}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <Button title="Add Alarm" onPress={addAlarm} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default Scheduling;

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
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    alarmItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
