import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { navigate } from 'expo-router/build/global-state/routing';
function AddAccount({ navigation }: { navigation: any } ) {
  // State variables
  const [Email, setEmail] = useState('');
  const [EmailVerify, setEmailVerify] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordVerify, setPasswordVerify] = useState(false);
  const [Username, setUsername] = useState('');
  const [UsernameVerify, setUsernameVerify] = useState(false);
 
  // Handlers
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setUsernameVerify(text.trim().length >= 3); // Example: Valid if 3+ characters
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    setEmailVerify(emailRegex.test(text));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordVerify(text.length >= 8); // Example: Valid if 8+ characters
  };


  // Submit handler
  const handleSubmit = () => {
    if (!UsernameVerify || !EmailVerify || !PasswordVerify ) {
      alert('Please correct the errors before submitting.');
      return;
    }

    const userData = {
      name: Username,
      email: Email,
      password: Password,
    };

    axios
      .post('http://100.69.121.241:5000/auth/register', userData)
      .then(res => {
        // Show success or error message based on the server response
        if (res.data.status==="ok") {
          Alert.alert('Success', 'Account created successfully!', [
            { text: 'OK', onPress: () => console.log('Account Created') },
          ]);
          setUsername("");
          setEmail("");
          setPassword("");
         navigation.navigate('login');
        } else {
          Alert.alert('Error', res.data.data || 'Failed to create account.');
        }
      })
      .catch(e => {
        Alert.alert('Error', 'An error occurred while creating the account.');
        console.error('Error:', e.message);
      });
  };
      

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create Account</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={Username}
          onChangeText={handleUsernameChange}
          placeholder="Username"
          placeholderTextColor="gray"
          style={styles.input}
        />
      </View>
      {!UsernameVerify && Username && (
        <Text style={styles.errorText}>Username must be at least 3 characters long.</Text>
      )}

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={Email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>
      {!EmailVerify && Email && (
        <Text style={styles.errorText}>Please enter a valid email address.</Text>
      )}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          value={Password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.input}
          secureTextEntry
        />
      </View>
      {!PasswordVerify && Password && (
        <Text style={styles.errorText}>Password must be at least 8 characters long.</Text>
      )}

   

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSubmit}
        disabled={
          !UsernameVerify || !EmailVerify || !PasswordVerify 
        }
      >
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 100,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  createButton: {
    backgroundColor: 'orange',
    borderRadius: 100,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 30,
    marginLeft:200,
    margin:100,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAccount;
