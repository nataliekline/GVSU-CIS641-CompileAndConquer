import { Text, View, StyleSheet } from "react-native"

const Calendar = () => {
    return (
        <View style={styles.container}>
            <Text>This is the calendar screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Calendar;