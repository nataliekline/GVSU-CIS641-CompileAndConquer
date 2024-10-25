import { Button, HelperText, TextInput } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { RootStackParamList } from './app';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    // Login
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Make sure 'SignUp' is correctly referenced
  };



  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/appxpert.png')} style={styles.image} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        error={emailError}
        style={styles.input} 
      />
      {emailError && <HelperText type="error">Email is required</HelperText>}

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        error={passwordError}
        style={styles.input} 
      />
      {passwordError && <HelperText type="error">Password is required</HelperText>}

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
        </Button>

      <Button mode="outlined" onPress={handleSignUp} style={styles.signUpButton}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  signUpButton: {
    width: '100%',
    marginTop: 8,
  },
});

export default LoginScreen;