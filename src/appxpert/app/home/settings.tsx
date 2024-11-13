import { Text, View, StyleSheet } from "react-native";
import AppGradient from '@/components/AppGradient';
import logoStyles from '../../styles/logo';

const Settings = () => {
    return (
        <AppGradient>
            <View style={styles.logoContainer}>
                <Text style={logoStyles.appText}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
        </AppGradient>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
});

export default Settings;