import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  // Function to handle password reset
  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Here you would integrate the API to handle password reset (e.g., sending an email).
    // For now, we just show a success message.

    Alert.alert('Success', 'Password reset link sent to your email!');
    setEmail(''); // Clear the input field
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
