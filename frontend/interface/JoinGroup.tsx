import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';

// Screen for "Participer à un groupe"
export default function JoinGroupScreen({ navigation }: { navigation: any }) {
  const [id, setId] = useState('');
  const [groupName, setGroupName] = useState(''); // Added state for group name

  const handleSubmit = () => {
    if (!id.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un ID valide.');
      return;
    }
    
    // Simulate fetching the group name (you can replace this with real data fetching)
    setGroupName(`Group Name for ID: ${id}`); // This is just a placeholder
    Alert.alert('Succès', `ID saisi : ${id}`);
    setId(''); // Reset input field
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ID du Groupe</Text>
      
      <View style={styles.groupContainer}>

        {/* Input for Group Name */}
        <TextInput
          style={styles.input}
          placeholder="Nom du groupe"
          value={groupName}
          onChangeText={setGroupName}
        />
        
        {/* Input for Group ID */}
        <TextInput
          style={styles.input}
          placeholder="Entrer un ID"
          value={id}
          onChangeText={setId}
          keyboardType="numeric" // Numeric keyboard for ID input
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Identifier</Text>
        </TouchableOpacity>
        
        {/* Display Group Name and ID if available */}
        {groupName ? (
          <View style={styles.groupDetails}>
            <Text style={styles.groupText}>Nom du Groupe: {groupName}</Text>
            <Text style={styles.groupText}>ID du Groupe: {id}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    paddingVertical: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 18,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  groupDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  groupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
