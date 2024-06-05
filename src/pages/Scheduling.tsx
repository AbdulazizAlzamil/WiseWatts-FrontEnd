import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button, Modal, FlatList, TouchableOpacity, Alert, Switch } from 'react-native';
import { Button as RNPButton, Divider } from 'react-native-paper';
import { Card } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

import globalStyles from "../../constants/globalStyles";
import API_URL from '../../config';

const Scheduling = ({ route }) => {
	const { socketId } = route.params;
	const [schedule, setSchedule] = useState();
	const [time, setTime] = useState(new Date());
	const [show, setShow] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	// const [isEnabled, setIsEnabled] = useState(false);

	// const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const onStateToggle = async (scheduleId) => {
		console.log(scheduleId);
		
		setSchedules(schedules.map((schedule) => {
			if(schedule.schedule_id === scheduleId) {
				schedule.state = !schedule.state;
			}
			return schedule;
		}));

		await axios.put(`${API_URL}/ScheduleController/ToggleSchedule`, {
			schedule_id: scheduleId,
		});
	}

	const onChange = (event, selectedTime) => {
			const currentTime = selectedTime || time;
			setShow(false);
			setTime(currentTime);
			setSchedule({
				start_date: currentTime,
				end_date: currentTime,
				socket_id: socketId,
				state: false,
			});
	};

	const showTimepicker = () => {
			setShow(true);
	};

	const addSchedule = async () => {
			if(!time) return Alert.alert('Error', 'Please select a time for the schedule.');

			setSchedules([...schedules, {...schedule, start_date: time.toLocaleTimeString(), end_date: time.toLocaleTimeString()}]);
			setModalVisible(false);

			await axios.post(`${API_URL}/ScheduleController/CreateSchedule/`, schedule);
			getSchedules();
	};

	const deleteSchedule = async (scheduleId: number) => {
			const newSchedules = schedules.filter(schedule => schedule.schedule_id !== scheduleId);
			setSchedules(newSchedules);
			await axios.delete(`${API_URL}/ScheduleController/DeleteSchedule/${scheduleId}`);
	};

	const getSchedules = async () => {
		const response = await axios.get(`${API_URL}/ScheduleController/FindScheduleBySocket/${socketId}`);
		const schedules = response.data.map(schedule => {
			
			const date = new Date(schedule.start_date);
			date.setHours(date.getHours() - 3);
			return {
				...schedule,
				start_date: date.toLocaleTimeString(),
				end_date: date.toLocaleTimeString(),
			};
		});

		setSchedules(schedules);
	}

	useEffect(() => {
		
		getSchedules();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Schedules</Text>
			</View>
			<View style={styles.scene}>
					<RNPButton
						labelStyle={{ color: globalStyles.colors.background }}
						style={styles.button}
						icon="plus"
						mode="contained"
						onPress={() => setModalVisible(true)}
						children="Add Schedule"
					/>
					<FlatList
							data={schedules}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item: schedule, index }) => (
									<View style={styles.scheduleItem}>
										<Card containerStyle={styles.card}>
											<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15}}>
												<Card.FeaturedSubtitle style={{alignSelf: 'flex-start', color: '#fff', fontSize: 26}}>{`${schedule.start_date}`}</Card.FeaturedSubtitle>
												<Switch
													style={{alignSelf: 'flex-end', marginTop: -25, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
													trackColor={{ false: "#2E2E3E", true: "gray"}}
													thumbColor={schedule.state ? globalStyles.colors.secondary : "#848184"}
													ios_backgroundColor="#3e3e3e"
													// onValueChange={toggleSwitch}
													value={schedule.state}
													onChange={() => onStateToggle(schedule.schedule_id)}
												/>
											</View>
											<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
												<RNPButton 
													onPress={() => deleteSchedule(schedule.schedule_id)}
													contentStyle={{backgroundColor: globalStyles.colors.red}}
													labelStyle={{color: '#fff'}}
												>
													Delete Schedule
												</RNPButton>
											</View>
										</Card>
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
								<RNPButton
									labelStyle={{ color: globalStyles.colors.background }}
									style={styles.button}
									mode="contained"
									onPress={showTimepicker}
									children="Show time picker"
								/>
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
								<RNPButton
									labelStyle={{ color: globalStyles.colors.background }}
									style={styles.button}
									mode="contained"
									onPress={addSchedule}
									children="Add Schedule"
								/>
								<RNPButton
									labelStyle={{ color: globalStyles.colors.background }}
									style={{...styles.button, backgroundColor: 'gray'}}
									mode="contained"
									onPress={() => setModalVisible(false)}
									children="Cancel"
								/>
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
        height: 70,
				marginBottom: 20,
        backgroundColor: globalStyles.colors.background,
    },
    headerTitle: {
        fontSize: 30,
        color: '#ffff',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300,
    },
    modalView: {
				gap: 10,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        paddingHorizontal: 35,
				paddingVertical: 20,
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
				fontSize: 24,
    },
    scheduleItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
    button: {
        width: '90%',
				
        alignSelf: 'center',
        marginTop: 'auto',
        backgroundColor: globalStyles.colors.primary,
        // position: 'absolute',
        // bottom: 20,
    },
		card: {
			width: '90%',
			backgroundColor: '#3f4055',
			borderWidth: 0,
			borderRadius: 20,
			paddingVertical: 20,
			paddingHorizontal: 25,
		},
});
