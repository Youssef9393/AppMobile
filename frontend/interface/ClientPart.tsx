import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ExpenseCard = ({ navigation }: { navigation: any }) => {
  const [groupName] = useState('Groupe Aliane');
  const [people, setPeople] = useState([
    { id: '1', name: 'Alice', email: 'alice@example.com', expense: 120 },
    { id: '2', name: 'Bob', email: 'bob@example.com', expense: 250 },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', expense: 90 },
  ]);

  const [transactions, setTransactions] = useState([
    { id: '1', description: 'khali a paye le déjeuner', amount: 50 },
    { id: '2', description: 'nadia a payé le transport', amount: 30 },
    { id: '1', description: 'Ahmed a payé le déjeuner', amount: 10 },
    { id: '2', description: 'Ala a payé le transport', amount: 30 },
    { id: '1', description: 'mohamed a payé le déjeuner', amount: 500 },
    { id: '2', description: 'Bob a payé le transport', amount: 300 },
  ]);

  const [totalBalance, setTotalBalance] = useState(() =>
    people.reduce((total, person) => total + person.expense, 0)
  );

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Math.random().toString(),
      description: 'Nouvelle transaction',
      amount: 20, // Exemple fixe, à remplacer par une entrée utilisateur
    };
    setTransactions([...transactions, newTransaction]);
    setTotalBalance(totalBalance + newTransaction.amount);
  };

  const handleShareGroup = () => {
    Alert.alert('Partage', `Vous avez partagé le groupe "${groupName}" avec succès !`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupName}>{groupName}</Text>
        <TouchableOpacity onPress={handleShareGroup}>
          <Icon name="share-social-outline" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Solde Total</Text>
        <Text style={styles.totalBalance}>{totalBalance} €</Text>
      </View>

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

      <Text style={styles.sectionTitle}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionAmount}>+ {item.amount} €</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addTransactionButton} onPress={handleAddTransaction}>
        <Text style={styles.addTransactionText}>Ajouter une Transaction</Text>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity style={styles.cardButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Ajouter une Personne</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate('Dashboard', { people, totalBalance })}
        >
          <Text style={styles.buttonText}>Tableau de Bord</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => navigation.navigate('Dashboard', { people, totalBalance })}
        >
          
          <Text style={styles.buttonText}>Ajouter Dépenses</Text>
        </TouchableOpacity>
        
      </View>
      
    </ScrollView>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  personName:{
    color:'black',
  },
  personEmail:{
    color:'blue',
  },
  personExpense:{
    color:'green',
  },
  card: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalBalance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555',
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  addTransactionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 20,
  },
  addTransactionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  cardButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
