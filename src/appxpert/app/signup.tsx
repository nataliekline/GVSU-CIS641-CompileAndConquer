import { Button, HelperText, TextInput } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { AccountContext } from '@/context/AccountContext';
import AppGradient from '@/components/AppGradient';
import { RootStackParamList } from './app';
import { StackScreenProps } from '@react-navigation/stack';
import { auth } from '@/config/fb-config';
import { createNewAccount } from '../persistence/account-store'
import logoStyles from '../styles/logo';

type Props = StackScreenProps<RootStackParamList>;

const SignUpScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const accountContext = useContext(AccountContext);

  const handleSignup = () => {
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNameError(false);
    if (!name) {
      setNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!confirmPassword) {
      setPasswordErrorMessage("Password is required again")
      setConfirmPasswordError(true);
    }
    if (password != confirmPassword) {
      setPasswordErrorMessage("The Passwords don't match")
      setConfirmPasswordError(true);
    }
    
    if (!emailError && !passwordError && !confirmPasswordError && !nameError) {
      const accountObject = {
        name: name,
        email: email
      }
      createNewAccount(accountObject, (response: any) => {
        console.log("Account created", response)
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User created for email " + email);
          accountContext.setAccountState(accountObject);
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }
  }

  return (
    <AppGradient>
      <View style={styles.logoContainer}>
        <Text style={logoStyles.appText}>App</Text>
        <Text style={logoStyles.xpertText}>Xpert</Text>
      </View>
      <View style={styles.introContainer}>
        <Text style={styles.signupText}>Sign Up</Text>
        <Text style={styles.createAccountText}>Create an account</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode='outlined'
          theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
          label="Enter your name"
          autoCapitalize='none'
          onChangeText={setName}
          style={styles.input}
        />
        {nameError && <HelperText type="error">Name is required</HelperText>}
        <TextInput
          mode='outlined'
          theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
          label="Enter your email"
          autoCapitalize='none'
          onChangeText={setEmail}
          style={styles.input}
        />
        {emailError && <HelperText type="error">Email is required</HelperText>}

        <TextInput
          mode='outlined'
          theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
          label="Enter your password"
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        {passwordError && <HelperText type="error">Password is required</HelperText>}

        <TextInput
          mode='outlined'
          theme={{ colors: { primary: '#808080', text: '#D4D4D4', placeholder: '#D4D4D4' } }}
          label="Re-enter your password"
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        {confirmPasswordError && <HelperText type="error">{passwordErrorMessage}</HelperText>}

      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignup}>
            <Button mode='contained' style={styles.signupButton} labelStyle={styles.buttonLabel}>
                Sign Up
            </Button>
          </TouchableOpacity>
      </View>
      <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Button mode='text' textColor='#7AC2FD' labelStyle={styles.loginButton}>
                Back to Login
            </Button>
          </TouchableOpacity>
      </View>
    </AppGradient>
  )
};

const styles = StyleSheet.create({
  logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 32,
  },
  introContainer: {
      alignItems: 'center',
      paddingVertical: 48,
  },
  signupText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
  },
  createAccountText: {
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
  signupButton: {
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
      paddingTop: 60,
  },
  helpText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
  },
  loginButton: {
      fontSize: 14,
      fontWeight: 'bold',
  },
});

export default SignUpScreen;
