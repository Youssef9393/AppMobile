import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from 'expo-router/build/global-state/routing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Import MaterialCommunityIcons

function AddGroupScreen({ navigation }: { navigation: any }) {
  const [groupName, setGroupName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [montant, setMontant] = useState('');
  const [seuil, setSeuil] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    // Validate all fields
    if (!groupName.trim() || !montant.trim() || !seuil.trim() || !email.trim() || !telephone.trim() || !description.trim()) {
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

    try {
      // Retrieve adminId from AsyncStorage
      const adminId = await AsyncStorage.getItem('userId');
      if (!adminId) {
        Alert.alert('Erreur', 'Admin ID introuvable. Veuillez vous reconnecter.');
        return;
      }

      // Prepare group data
      const groupData = {
        name: groupName,
        price: parseFloat(montant),
        email: email,
        seuil: parseFloat(seuil),
        telephone: parseInt(telephone),
        description: description,
        adminId: adminId,
      };

      // Send request to the backend
      const response = await axios.post('http://100.69.121.82:5000/groups/', groupData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.data.status === 'ok') {
        Alert.alert('Succès', 'Le groupe a été ajouté avec succès.');
        navigation.navigate('ClientPart');
      } else {
        Alert.alert('Erreur', response.data.error || 'Une erreur est survenue.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erreur', 'Impossible de créer le groupe. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Veuillez remplir le formulaire du groupe</Text>

        {/* Group Name */}
        <View style={styles.inputContainer}>
          <Icon name="account-group" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nom du groupe"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Montant */}
        <View style={styles.inputContainer}>
          <Icon name="cash" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Montant"
            keyboardType="numeric"
            value={montant}
            onChangeText={setMontant}
          />
        </View>

        {/* Seuil */}
        <View style={styles.inputContainer}>
          <Icon name="trending-up" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Seuil minimal"
            keyboardType="numeric"
            value={seuil}
            onChangeText={setSeuil}
          />
        </View>

        {/* Téléphone */}
        <View style={styles.inputContainer}>
          <Icon name="phone" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Icon name="information" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Submit Button */}
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 0,
    color: 'lightgreen',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'lightgreen',
    backgroundColor: 'white',
  },
  icon: {
    paddingLeft: 16,
    paddingRight:7,
  },
  input: {
    width: '85%',
    height: 50,
    color: 'black',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'lightgreen',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddGroupScreen;
