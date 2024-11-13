import { Text, View, StyleSheet } from "react-native"

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Text>This is the dashboard screen</Text>
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

export default Dashboard;