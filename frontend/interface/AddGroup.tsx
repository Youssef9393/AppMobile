import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';

export default function AddGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [montant, setmontant] = useState('');

  const handleSubmit = () => {
    // Validation simple
    if (
      !groupName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !telephone.trim()
    ) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }
    if (!/^\d+$/.test(telephone)) {
      Alert.alert('Erreur', 'Le numéro de téléphone doit contenir uniquement des chiffres.');
      return;
    }

    // Affichage des données dans une alerte
    Alert.alert(
      'Données Soumises',
      `Groupe: ${groupName}\nNom: ${lastName}\nPrénom: ${firstName}\nEmail: ${email}\nTéléphone: ${telephone}`
    );

    // Réinitialisation des champs
    setGroupName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setTelephone('');
    setmontant('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Ajouter un Groupe</Text>
      <View style={styles.card}>
        {/* Nom du groupe */}
        <TextInput
          style={styles.input}
          placeholder="Nom du groupe"
          value={groupName}
          onChangeText={setGroupName}
        />

        {/* Nom */}
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Prénom */}
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
          {/* Email */}
          <TextInput
          style={styles.input}
          placeholder="montant"
          value={montant}
          onChangeText={setmontant}

        />


        {/* Téléphone */}
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />

        {/* Bouton Soumettre */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title1: {
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
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});
