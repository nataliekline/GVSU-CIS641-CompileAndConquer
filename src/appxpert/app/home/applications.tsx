import { Text, View, StyleSheet } from "react-native"

const Applications = () => {
    return (
        <View style={styles.container}>
            <Text>This is the applications screen</Text>
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

export default Applications;