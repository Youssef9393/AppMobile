import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing MaterialCommunityIcons

// Screen for "Participer à un groupe"
export default function JoinGroupScreen({ navigation }: { navigation: any }) {
  const [id, setId] = useState('');
  const [groupName, setGroupName] = useState(''); // Added state for group name

  const handleSubmit = () => {
    if (!id.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un ID valide.');
      return;
    }
    navigation.navigate('ClientPart')
    // Simulate fetching the group name (you can replace this with real data fetching)
    setGroupName(`Group Name for ID: ${id}`); // This is just a placeholder
    Alert.alert('Succès', `ID saisi : ${id}`);
    setId(''); // Reset input field
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veuillez saisez le nom et le code du groupe</Text>
      
      <View style={styles.groupContainer}>

        {/* Input for Group Name */}
        <View style={styles.inputContainer}>
          <Icon name="account-group" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nom du groupe"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>
        
        {/* Input for Group ID */}
        <View style={styles.inputContainer}>
          <Icon name="numeric" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Entrer un ID"
            value={id}
            onChangeText={setId}
            keyboardType="numeric" // Numeric keyboard for ID input
          />
        </View>

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
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'lightgreen',
  marginLeft:14,
  },
  inputContainer: {
    flexDirection: 'row', // Align icon and input field horizontally
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'lightgreen',
    borderWidth: 2,
    borderRadius: 18,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 18,
    marginLeft: 5, // Space between icon and input field
  },
  input: {
    flex: 1, // Makes the input take remaining space
    height: 50,
    color: 'black',
  },
  button: {
    backgroundColor: 'lightgreen',
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
    borderColor: 'lightgreen',
    borderWidth: 1,
  },
  groupText: {
    fontSize: 13,
    marginBottom: 10,
  },
});
