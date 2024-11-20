import { Button, HelperText, TextInput } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AccountContext } from '@/context/AccountContext';
import AppGradient from '@/components/AppGradient';
import { RootStackParamList } from './app';
import { StackScreenProps } from '@react-navigation/stack';
import { auth } from '@/config/fb-config';
import { getAccount } from '@/persistence/account-store';
import logoStyles from '../styles/logo'
import { signInWithEmailAndPassword } from "firebase/auth";

type Props = StackScreenProps<RootStackParamList>;

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const accountContext = useContext(AccountContext);

    const handleLogin = () => {
        setEmailError(false);
        setPasswordError(false);
    
        if (!email) {
          setEmailError(true);
        }
        if (!password) {
          setPasswordError(true);
        }
        if (!emailError && !passwordError) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    getAccount(email, (accountResponse) => {
                        console.log("Log succesfull for email", email);
                        accountContext.setAccountState(accountResponse);
                    })
                })
                .catch((error) => {
                    alert(error.message);
                }
            );
        }
    }
    const handleSignup = () => {
        navigation.navigate('SignUp');
    };
    
    return (
        <AppGradient>
            <View style={styles.logoContainer}>
                <Text style={logoStyles.appText}>App</Text>
                <Text style={logoStyles.xpertText}>Xpert</Text>
            </View>
        <View style={styles.introContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.loginText}>Login to your existing account</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                mode='outlined'
                value={email}
                onChangeText={setEmail}
                theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                label="Enter your email"
                autoCapitalize='none'
                error={emailError}
                style={styles.input}
            />
            {emailError && <HelperText type="error">Email is required</HelperText>}

            <TextInput
                mode='outlined'
                value={password}
                onChangeText={setPassword}
                theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
                label="Enter your password"
                secureTextEntry={true}
                error={passwordError}
                style={styles.input}
            />
            {passwordError && <HelperText type="error">Password is required</HelperText>}

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin}>
                <Button mode='contained' style={styles.loginButton} labelStyle={styles.buttonLabel}>
                Login
                </Button>
            </TouchableOpacity>
        </View>
        <View style={styles.helpContainer}>
            <Text style={styles.helpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                    <Button mode='text' textColor='#7AC2FD' labelStyle={styles.newAccountButton}>
                    Create new account
                    </Button>
                </TouchableOpacity>
            </View>
        </AppGradient>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 32,
    },
    introContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    loginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 16,
    },
    inputContainer: {
        paddingHorizontal: 32,
        paddingTop: 32,
    },
    input: {
        marginBottom: 20,
    },
    buttonContainer: {
        paddingVertical: 48,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#4D3E3E',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    helpContainer: {
        alignItems: 'center',
        paddingTop: 110,
    },
    helpText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    newAccountButton: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
