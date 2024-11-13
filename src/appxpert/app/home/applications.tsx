import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import logoStyles from '../../styles/logo';

const Applications = () => {
    return (
        <SafeAreaView>
            <View style={styles.logoContainer}>
                <Text style={{...logoStyles.appText, color: '#7AC2FD'}}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
});

export default Applications;