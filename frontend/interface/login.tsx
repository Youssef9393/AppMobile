import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';

function LoginScreen({ navigation }: { navigation: any }) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    const userData = {
      email: Email,
      password: Password,
    };

    try {
      const res = await axios.post('http://172.20.10.4:5001/login', userData);

      if (res.data.status === 'ok') {
        console.log(res.data);
        Alert.alert('Login Successful!');
        navigation.navigate('home');
      } else {
        Alert.alert(res.data.error || 'An error occurred.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Incorrect Password.');
    }
  };

  return (
   
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Login Title */}
          <Text style={styles.title}>Bienvenue !</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Exemple@gmail.com"
              style={styles.input}
              keyboardType="email-address"
              value={Email}
              onChangeText={handleEmailChange}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={Password}
              onChangeText={handlePasswordChange}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Se Connecter</Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('checkemail')}
          >
            Forgot Password
          </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('createaccount')}
          >
            Don’t Have an Account?
          </Text>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Makes the image cover the entire screen
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 80,
    paddingHorizontal: 10,
    marginBottom: 25,
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
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  link: {
    padding: 8,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'purple',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3, // For Android
  },
});

export default LoginScreen;
