import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Importer les icônes

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  // Fonction pour réinitialiser le mot de passe
  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Ici, vous intégreriez l'API pour gérer la réinitialisation du mot de passe (par exemple, en envoyant un e-mail).
    // Pour l'instant, on affiche juste un message de succès.

    Alert.alert('Success', 'Password reset link sent to your email!');
    setEmail(''); // Effacer le champ de saisie
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérifiez votre email</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

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
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginVertical:155,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'lightgreen',
    marginLeft: 10, // Marge à gauche pour le titre  
  },
  inputContainer: {
    flexDirection: 'row', // Alignement horizontal pour l'icône et le champ de saisie
    alignItems: 'center',
    borderColor: 'lightgreen',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
    marginVertical:20,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black',
    paddingLeft: 10, // Espace entre l'icône et le texte
  },
  button: {
    backgroundColor: 'lightgreen', // Bouton de couleur vert clair
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
