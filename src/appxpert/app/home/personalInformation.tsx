import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { setupListenerOverAccount, updateAccount } from "@/persistence/AccountStore";
import { useContext, useEffect, useState } from "react";

import { Account } from "@/models/Account";
import { AccountContext } from "@/context/AccountContext";
import AppGradient from '@/components/AppGradient';

const PersonalInformation: React.FC<{ navigation: any }> = ({ navigation }) => {

    const accountContext = useContext(AccountContext); 
    
    const [modifiableAccount, setModifiableAccount] = useState(accountContext.account);
    const updateModifiableAccountObject = (vals: any) => {
        setModifiableAccount({
          ...modifiableAccount,
          ...vals,
        });
    };

    useEffect(() => {
        setupListenerOverAccount(accountContext.account.email, (account: Account) => {
            setModifiableAccount(account);
        });
    }, []);

    function handleSave() {
        updateAccount(accountContext.account.email, {
            name: modifiableAccount.name,
            age: modifiableAccount.age,
            profession: modifiableAccount.profession
        }, () => {
            console.log("Account Saved");
        });
        navigation.goBack();
    }

    return (
        <AppGradient>
            <View style={styles.bodyContainer}>
                <Text style={styles.accountText}>Personal Information</Text>
                <TextInput
                    mode='outlined'
                    theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                    label="Name"
                    autoCapitalize='none'
                    value= {modifiableAccount.name}
                    onChangeText={(val) => updateModifiableAccountObject({ name: val })}
                    style={styles.input}
                />
                <TextInput
                    mode='outlined'
                    theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                    label="Age"
                    autoCapitalize='none'
                    value= {modifiableAccount.age}
                    onChangeText={(val) => updateModifiableAccountObject({ age: val })}
                    style={styles.input}
                />
                <TextInput
                    mode='outlined'
                    theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                    label="Profession"
                    autoCapitalize='none'
                    value= {modifiableAccount.profession}
                    onChangeText={(val) => updateModifiableAccountObject({ profession: val })}
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
                </View>
                
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
});

export default PersonalInformation;