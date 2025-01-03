import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function AddGroupScreen() {
  const [groupName, setGroupName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [montant, setMontant] = useState('');

  const handleSubmit = async () => {
    // Validation des champs
    if (!groupName.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !telephone.trim() || !montant.trim()) {
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

    const groupData = {
      groupName:groupName,
      firstName:firstName,
      lastName:lastName,
      email:email,
      montant:montant,
      telephone:telephone,
    };

  
      axios
      .post('http://172.20.10.4:5001/addgroup', groupData)
      .then(req=>{
      console.log(req);
      if (req.data.status === 'ok') {
        Alert.alert('Succès', 'Le groupe a été ajouté avec succès.');
      } else {
        Alert.alert('Erreur', req.data.error || 'Une erreur est survenue.');
      }
      })
      .catch(e => {
              Alert.alert('Error', 'An error occurred while creating the account.');
              console.error('Error:', e.message);
            });
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ajouter un Groupe</Text>

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
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Montant */}
        <TextInput
          style={styles.input}
          placeholder="Montant"
          keyboardType="numeric"
          value={montant}
          onChangeText={setMontant}
        />

        {/* Téléphone */}
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          keyboardType="phone-pad"
          value={telephone}
          onChangeText={setTelephone}
        />

        {/* Bouton Ajouter */}
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    color:'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddGroupScreen;
