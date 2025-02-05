import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const ExpenseCard = ({ navigation }: { navigation: any }) => {
  const [people, setPeople] = useState([
    { id: '1', name: 'youssef', email: 'youssef@gmai.com', expense: 12077 },
    { id: '2', name: 'ismail', email: 'ismail@gmail.com', expense: 2506666 },
    { id: '3', name: 'karim', email: 'karim@gmail.com', expense: 908888 },
  ]);

  const [transactions, setTransactions] = useState([
    { id: '1', description: 'khali ', amount: 5077 },
    { id: '2', description: 'nadia ', amount: 3000 },
    { id: '3', description: 'Ahmed ', amount: 10000 },
    { id: '4', description: 'Ala ', amount: 300000 },
    { id: '5', description: 'Mohamed ', amount: 50000 },
    { id: '6', description: 'Bob ', amount: 300 },
  ]);

  const [totalBalance, setTotalBalance] = useState(() =>
    people.reduce((total, person) => total + person.expense, 0)
  );

  const [categoryVisibility, setCategoryVisibility] = useState({
    peopleAndExpenses: false,
    transactions: false,
    autres: false,
    membres: false, // Added for Membres category
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        console.log(id);

        const response = await axios.get(`http://172.20.10.4:5000/groups?adminId=${id}`);

        const total = response.data.reduce((sum: any, group: any) => sum + group.price, 0);
        setTotalBalance(total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Math.random().toString(),
      description: 'Nouvelle transaction',
      amount: 20, // Exemple fixe, à remplacer par une entrée utilisateur
    };
    setTransactions([...transactions, newTransaction]);
    setTotalBalance(totalBalance + newTransaction.amount);
  };

  const toggleCategoryVisibility = (category: string) => {
    setCategoryVisibility((prevState) => ({
      ...prevState,
      peopleAndExpenses: category === 'peopleAndExpenses' ? !prevState.peopleAndExpenses : false,
      transactions: category === 'transactions' ? !prevState.transactions : false,
      autres: category === 'autres' ? !prevState.autres : false,
      membres: category === 'membres' ? !prevState.membres : false,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupName}>Groupe Aliane</Text>
        <TouchableOpacity>
          <Icon name="share-social-outline" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Solde Total</Text>
        <Text style={styles.totalBalance}>{totalBalance} €</Text>
      </View>

      <View style={styles.categoryButtonsContainer}>
        {/* Added Membres category button */}
        <TouchableOpacity onPress={() => toggleCategoryVisibility('membres')} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Membres</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCategoryVisibility('peopleAndExpenses')} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Dépenses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCategoryVisibility('transactions')} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleCategoryVisibility('autres')} style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>Autres</Text>
        </TouchableOpacity>
      </View>

      {/* People and Expenses Category */}
      {categoryVisibility.peopleAndExpenses && (
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
      )}

      {/* Transactions Category */}
      {categoryVisibility.transactions && (
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
      )}

      {/* Membres Category */}
      {categoryVisibility.membres && (
        <FlatList
          data={people} // Using the same people list, but this can be adjusted as needed
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.personItem}>
              <View>
                <Text style={styles.personName}>{item.name}</Text>
                <Text style={styles.personEmail}>{item.email}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Autres Category */}
      {categoryVisibility.autres && (
        <View style={styles.autresContainer}>
          <TouchableOpacity style={styles.cardButton} onPress={handleAddTransaction}>
            <Text style={styles.buttonText}>Ajouter une Transaction</Text>
          </TouchableOpacity>
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
      )}
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
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 1,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'green',
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
  autresContainer: {
    paddingVertical: 20,
  },
  cardButton: {
    backgroundColor: 'lightgreen',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
