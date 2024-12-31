import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';

const ExpenseCard = ({ navigation }: { navigation: any }) => {
  const [people, setPeople] = useState([
    { id: '1', name: 'Alice', email: 'alice@example.com', expense: 120 },
    { id: '2', name: 'Bob', email: 'bob@example.com', expense: 250 },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', expense: 90 },
  ]);
  const [totalBalance, setTotalBalance] = useState(() =>
    people.reduce((total, person) => total + person.expense, 0)
  );
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonEmail, setNewPersonEmail] = useState('');
  const [newPersonExpense, setNewPersonExpense] = useState('');

  const handleAddPerson = () => {
    if (!newPersonName || !newPersonEmail || !newPersonExpense) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (isNaN(Number(newPersonExpense))) {
      Alert.alert('Erreur', 'La dépense doit être un nombre.');
      return;
    }

    const newPerson = {
      id: Math.random().toString(),
      name: newPersonName,
      email: newPersonEmail,
      expense: Number(newPersonExpense),
    };

    setPeople([...people, newPerson]);
    setTotalBalance(totalBalance + newPerson.expense);
    setNewPersonName('');
    setNewPersonEmail('');
    setNewPersonExpense('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Solde total */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Solde Total</Text>
        <Text style={styles.totalBalance}>{totalBalance} €</Text>
      </View>

      {/* Liste des personnes */}
      <Text style={styles.sectionTitle}>Personnes et Dépenses</Text>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <View>
              <Text style={styles.personName}>{item.name}</Text>
              <Text style={styles.personEmail}>{item.email}</Text>
            </View>
            <Text style={styles.personExpense}>{item.expense} €</Text>
          </View>
        )}
      />

      {/* Ajouter une personne */}
      <Text style={styles.sectionTitle}>Ajouter une Personne</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newPersonEmail}
        onChangeText={setNewPersonEmail}
        keyboardType="email-address"
      />
   
      <TouchableOpacity style={styles.button} onPress={handleAddPerson}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>

      {/* Bouton pour aller au tableau de bord */}
      <TouchableOpacity
        style={[styles.button, styles.dashboardButton]}
        onPress={() => navigation.navigate('Dashboard', { people, totalBalance })}
      >
        <Text style={styles.buttonText}>Tableau de Bord </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.paiment]}
        onPress={() => navigation.navigate('Dashboard', { people, totalBalance })}
      >
        <Text style={styles.buttonText}> Ajouter Dépences</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:25,
    paddingVertical:50,
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  card: {
    paddingHorizontal:10,
    paddingVertical:20,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  totalBalance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  personName: {
    fontSize: 16,
    color: '#333',
  },
  personEmail: {
    fontSize: 14,
    color: 'blue',
  },
  personExpense: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dashboardButton: {
    backgroundColor: 'black',
  },
  paiment:{
    backgroundColor: 'black',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
