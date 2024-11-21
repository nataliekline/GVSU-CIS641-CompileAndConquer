import { AccountContext, initialAccountState } from "@/context/AccountContext";
import { Alert, StyleSheet, Text, View } from "react-native";
import { deleteAccount, setupListenerOverAccount } from "@/persistence/AccountStore";
import { useContext, useEffect, useState } from "react";

import { Account } from "@/models/Account";
import AppGradient from '@/components/AppGradient';
import IconButton from "@/components/IconWithButton";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from "../app";
import { StackScreenProps } from '@react-navigation/stack';
import { auth } from '@/config/fb-config';
import logoStyles from '../../styles/logo';
import { signOut } from "firebase/auth";

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'SettingsHome'>;
const Settings: React.FC<SettingsScreenProps> = ({navigation}) => {
    const accountContext = useContext(AccountContext); 
    const [name, setName] = useState(accountContext.account.name);

    useEffect(() => {
        setupListenerOverAccount(accountContext.account.email, (account:Account) => {
            if (account) {
                setName(account.name);
            }
        });
    }, []);


    function onClickLogOut(){
        Alert.alert(
            "Confirm",
            "Are you sure you want to log out?",
            [
              {
                text: "Yes",
                onPress: () => {onLogOut()},
              },
              {
                text: "No",
              },
            ]
        );
    }

    function onClickDeleteAccount() {
        Alert.alert(
            "Confirm",
            "Are you sure you want to delete your account? You won't be able to recover it",
            [
              {
                text: "Yes",
                onPress: () => {
                    deleteAccount(accountContext.account.email, () => {
                        console.log("Data deleted for this account")
                        onLogOut();
                    })
                },
              },
              {
                text: "No",
              },
            ]
        );
    }

    function onLogOut() {
        signOut(auth).then(() => {
            accountContext.setAccountState(initialAccountState);
            console.log("Log out success");
            // Sign-out successful.
          }).catch((error) => {
            console.error(error);
            // An error happened.
          });
    }

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
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.accountText}>Account Settings</Text>
                <IconButton
                    icon="person-circle-outline"
                    label="Personal Information"
                    onPress={() => navigation.navigate('PersonalInformation')}
                />
                <IconButton
                    icon="notifications-circle-outline"
                    label="Notifications"
                    onPress={() => { console.log("Future work")}}
                />
                <IconButton
                    icon="arrow-back-circle-outline"
                    label="Logout"
                    onPress={() => {onClickLogOut()}}
                />
                <IconButton
                    icon="close-circle-outline"
                    label="Delete Account"
                    onPress={() => {onClickDeleteAccount()}}
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