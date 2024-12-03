import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AccountContext } from "@/context/AccountContext";
import { EventData } from "@/models/Event";
import { Ionicons } from "@expo/vector-icons";
import { Calendar as ReactNativeCalendar } from "react-native-calendars";
import logoStyles from '../../styles/logo';
import {setupListenerOverEvents} from "@/persistence/EventStore";

const Calendar : React.FC<{ navigation: any }> = ({ navigation }) => {
    const accountContext = useContext(AccountContext); 
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [events, setEvents] = useState<EventData[]>([]);
    const [eventsData, setEventsData] = useState<Record<string, EventData[]>>({});

    const handleDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
        setEvents(eventsData[day.dateString] || []);
    };

    useEffect(() => {
        setupListenerOverEvents(accountContext.account.email, (response: Record<string, EventData[]>) => {
            setEventsData(response);
        })
    }, []);
    
    return (
        <SafeAreaView style= {styles.container}>
            <View style={styles.logoContainer}>
              <Text style={{...logoStyles.appText, color: '#7AC2FD'}}>App</Text>
              <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
            <View style={styles.introContainer}>
              <Text style={styles.applicationsText}>Events</Text>
              <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate('NewEvent')}>
                      <Ionicons name={'add-outline'} size={20}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {console.log('Future work')}}>
                      <Ionicons name={'search-outline'} size={18}/>
                  </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calendar}>
                {/* Calendar */}
                <ReactNativeCalendar
                    onDayPress={handleDayPress}
                    markedDates={{
                    ...Object.keys(eventsData).reduce((acc, date) => {
                        acc[date] = { marked: true };
                        return acc;
                    }, {} as Record<string, { marked: boolean }>),
                    [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
                    }}
                    theme={{
                        selectedDayBackgroundColor: "#007BFF",
                        selectedDayTextColor: "#FFFFFF",
                        todayTextColor: "#00BBF2",
                        arrowColor: "#007BFF",
                    }}
                />

                {/* Events List */}
                <View style={styles.eventsContainer}>
                    <Text style={styles.selectedDate}>
                    Events on {selectedDate || "Select a date"}
                    </Text>
                    {events.length > 0 ? (
                    <FlatList
                        data={events}
                        keyExtractor = {(item) => item.id}
                        renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.eventTitle}>{item.eventType} - {item.applicationCompany}</Text>
                            <Text style={styles.eventTime}>{item.time}</Text>
                        </View>
                        )}
                    />
                    ) : (
                    <Text style={styles.noEvents}>No events for this day.</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
    calendar: {
      backgroundColor: "#F9F9F9",
      justifyContent: "space-between"
    },
    eventsContainer: {
      padding: 16,
      backgroundColor: 'white'
    },
    selectedDate: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    eventItem: {
      backgroundColor: "#007BFF",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
    },
    eventTitle: {
      fontSize: 16,
      color: "#FFFFFF",
    },
    eventTime: {
      fontSize: 14,
      color: "#D1E8FF",
    },
    noEvents: {
      fontSize: 16,
      color: "#999999",
      textAlign: "center",
      marginTop: 16,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: 16,
    },
    introContainer: {
      paddingVertical: 24,
      paddingHorizontal: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    applicationsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Calendar;