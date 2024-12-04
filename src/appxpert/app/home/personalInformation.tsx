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
        const modifiedAccount = accountContext.account;
        if (modifiableAccount.name != modifiedAccount.name) {
            modifiedAccount.name = modifiableAccount.name;
        }
        if (modifiableAccount.age != null && modifiableAccount.age != modifiedAccount.age) {
            modifiedAccount.age = modifiableAccount.age;
        }
        if (modifiableAccount.profession != null && modifiableAccount.profession != modifiedAccount.profession) {
            modifiedAccount.profession = modifiableAccount.profession;
        }
        updateAccount(accountContext.account.email, modifiedAccount, () => {
            console.log("Account Saved");
        });
        navigation.goBack();
    }

    return (
        <AppGradient>
            <View style={styles.container}>
                <Text style={styles.text}>Personal Information</Text>
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
                            <Button mode='contained' style={styles.button} labelStyle={styles.buttonLabel}>
                                Save
                            </Button>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Button mode='contained' style={styles.button} labelStyle={styles.buttonLabel}>
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
    container: {
        paddingHorizontal: 40, 
    },
    text: {
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
    button: {
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