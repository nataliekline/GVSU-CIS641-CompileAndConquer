import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Menu, TextInput } from "react-native-paper";
import { createNewEvent, deleteEvent, getEvent, updateEvent } from "@/persistence/EventStore";
import { useContext, useEffect, useState } from "react";

import { AccountContext } from "@/context/AccountContext";
import { AntDesign } from "@expo/vector-icons";
import AppGradient from '@/components/AppGradient';
import { Dropdown } from "react-native-element-dropdown";
import { Event } from "@/models/Event";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const OPTIONS = [
    { label: 'Google', value: '1' },
    { label: 'Facebook', value: '2' },
    { label: 'Twilio', value: '3' },
    { label: 'Netflix', value: '4' },
    { label: 'Pinterest', value: '5' },
    { label: 'Tesla', value: '6' },
];

const DURATION_OPTIONS = [
    { label: '15 Minutes', value: '15m' },
    { label: '30 Minutes', value: '30m' },
    { label: '1 hour', value: '1h' },
    { label: '1 hour and a half', value: '1h30m' },
    { label: '2 hours', value: '2h' },
    { label: '3 hours', value: '3h' },
];

const EVENT_TYPE_OPTIONS = [
    { label: 'Information Session', value: 'Information Session' },
    { label: 'Technical Interview', value: 'Technical Interview' },
];

const NewEvent: React.FC<{ navigation: any, route:any }> = ({ navigation, route}) => {
    const accountContext = useContext(AccountContext);
    const [companyValue, setCompanyValue] = useState<string>("");
    const [durationValue, setDurationValue] = useState<string>("");
    const [eventType, setEventType] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);
    const [eventId, setEventId] = useState("");
    
    const initialNewEvent: Event = {
        eventType: "",
        applicationId: "",
        date: toISOStringWithTimezone(new Date()).split('T')[0] ,
        time: formatTimeTo12Hour(new Date()),
        applicationCompany: "",
        duration: "30m",
    };
    const [newEvent, setNewEvent] = useState<Event>(initialNewEvent);

    useEffect(() => {
        if (route.params?.eventId) {
            setEventId(route.params.eventId);
            getEvent(accountContext.account.email, route.params?.eventId, (data) => {
                if (data) {
                    setNewEvent(data);
                    setCompanyValue(data.applicationId);
                    setDurationValue(data.duration);
                    setEventType(data.eventType);
                }
            });
        } 
    }, [route.params?.eventId] );

    const updateEventObject = (vals: any) => {
        setNewEvent({
          ...newEvent,
          ...vals,
        });
    };

    function formatTimeTo12Hour(date: Date): string {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    function convert12HourTo24Hour(time: string): string {
        const [timePart, ampm] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        if (ampm === 'PM' && hours !== 12) {
        hours += 12;
        } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }
  

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            updateEventObject({date: toISOStringWithTimezone(date).split('T')[0]});
        }
    };
    
    function toISOStringWithTimezone(date: Date) {
        const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
      
        const timezoneOffset = date.getTimezoneOffset();
        const diff = timezoneOffset >= 0 ? '-' : '+';
        const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
        const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);
      
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds())}${diff}${offsetHours}:${offsetMinutes}`;
    }
      
    const handleTimeChange = (event: any, time?: Date) => {
        if (time) {
            updateEventObject({time: formatTimeTo12Hour(time)});
        }
    };

    const handleDelete = () => {
        console.log(newEvent);
        Alert.alert(
            "Confirm",
            "Are you sure you want to delete this event?",
            [
              {
                text: "Yes",
                onPress: () => {
                    deleteEvent(accountContext.account.email, eventId, () => {
                        console.log("Event deleted Successfully");
                        navigation.goBack();
                    });
                },
              },
              {
                text: "No",
              },
            ]
        );
    }

    function handleSave() {
        console.log(newEvent);
        if (eventId != "") {
            updateEvent (accountContext.account.email, eventId, newEvent, () => {
                console.log("Event updated successfully")
                navigation.goBack();
            })
        } else {
            createNewEvent(accountContext.account.email, newEvent, (responseMessage) => {
                console.log("Event created succesfully")
                navigation.goBack();
            });
        }
    }

    return (
        <AppGradient>
            <ScrollView>
                <View style={styles.bodyContainer}>
                    <Text style={styles.accountText}>New Event</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={EVENT_TYPE_OPTIONS}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Event Type' : '...'}
                        value={eventType}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            updateEventObject({eventType: item.value});
                            setEventType(item.value)
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'gray' : 'black'}
                            name="Safety"
                            size={20}
                            />
                        )}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={OPTIONS}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Application' : '...'}
                        searchPlaceholder="Search..."
                        value={companyValue}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            updateEventObject({applicationId: item.value , applicationCompany: item.label});
                            setCompanyValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'gray' : 'black'}
                            name="Safety"
                            size={20}
                            />
                        )}
                    />
                    
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Description"
                        value= {newEvent.description}
                        onChangeText={(val) => updateEventObject({ description: val })}
                        style={styles.input}
                    />
                    <View style = {styles.datetime}>
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            value={new Date(newEvent.date + 'T' + convert12HourTo24Hour(newEvent.time))}
                            mode="date"
                            is24Hour={true}
                            onChange={handleDateChange}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        />
                        <RNDateTimePicker
                            testID="dateTimePickerWhatever"
                            value={new Date(`1970-01-01T${convert12HourTo24Hour(newEvent.time)}`)} 
                            mode="time"
                            is24Hour={false}
                            onChange={handleTimeChange}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        />
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={DURATION_OPTIONS}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Duration' : '...'}
                            value={durationValue}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                updateEventObject({duration: item.value});
                                setDurationValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'gray' : 'black'}
                                name="Safety"
                                size={20}
                                />
                            )}
                        />
                    </View>
                    <TextInput
                        mode='outlined'
                        theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                        label="Link"
                        autoCapitalize='none'
                        value= {newEvent.link}
                        onChangeText={(val) => updateEventObject({ link: val })}
                        style={styles.input}
                    />
                    <View style= {{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleSave}>
                                <Button mode='contained' style={styles.signupButton} labelStyle={styles.buttonLabel}>
                                    Save
                                </Button>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Button mode='contained' style={styles.signupButton} labelStyle={styles.buttonLabel}>
                                    Back
                                </Button>
                            </TouchableOpacity>
                        </View>
                        {eventId != "" ? (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleDelete}>
                                    <Button mode='contained' style={styles.signupButton} labelStyle={styles.buttonLabel}>
                                        Delete
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        ): (<></>)}
                    </View>
                </View>
            </ScrollView>
        </AppGradient>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 24,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    nameText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 8,
    },
    bodyContainer: {
        paddingHorizontal: 40, 
    },
    accountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E4C65',
        paddingBottom: 16,
        paddingTop: 30
    },
    input: {
        marginBottom: 20,
    },
    buttonContainer: {
        paddingVertical: 20,
        alignItems: 'center',
       
    },
    signupButton: {
        backgroundColor: '#4D3E3E',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#808080"
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    datetime:{
        backgroundColor:'white',
        marginBottom: 20,
        borderRadius: 5
    }
});

export default NewEvent;