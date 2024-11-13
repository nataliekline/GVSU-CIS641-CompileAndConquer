import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AppGradient from '@/components/AppGradient';
import logoStyles from '../../styles/logo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Divider } from "react-native-paper";
import IconButton from "@/components/IconWithButton";

const Settings = () => {
    return (
        <AppGradient>
            <View style={styles.logoContainer}>
                <Text style={logoStyles.appText}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
            <View style={styles.profileContainer}>
                <Ionicons
                    name={'person-circle-sharp'}
                    size={96}
                    color={'#ECECEC'}
                />
                <Text style={styles.nameText}>John Williams</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.accountText}>Account Settings</Text>
                <IconButton
                    icon="person-circle-outline"
                    label="Personal Information"
                    onPress={() => {}}
                />
                <IconButton
                    icon="notifications-circle-outline"
                    label="Notifications"
                    onPress={() => {}}
                />
                <IconButton
                    icon="arrow-back-circle-outline"
                    label="Logout"
                    onPress={() => {}}
                />
                <IconButton
                    icon="close-circle-outline"
                    label="Delete Account"
                    onPress={() => {}}
                />
            </View>
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
        color: 'white',
        paddingBottom: 16,
    },
});

export default Settings;