import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Search = ({ navigation }: { navigation: any }) => {
  const [data] = useState([
    { id: '1', name: 'Créer un groupe' },
    { id: '2', name: 'Voir les groupes' },
    { id: '3', name: 'Identifier un groupe' },
    { id: '4', name: 'Dashboard' },
  ]);

  const [query, setQuery] = useState('');

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigation = (itemName: string) => {
    if (itemName === 'Voir les groupes') {
      navigation.navigate('ConsultAllGroup');
    }
    if (itemName === 'Créer un groupe') {
      navigation.navigate('AddGroupScreen');
    }
    if (itemName === 'Identifier un groupe') {
      navigation.navigate('JoinGroupScreen');
    }
    if (itemName === 'Dashboard') {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input with Icon */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <View>
      <Text style={styles.recent}>Recent</Text>
      <Text style={styles.viewAll}>Voir tout</Text>
      </View>
      {/* Filtered List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigation(item.name)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    marginVertical:40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 30,
    marginBottom: 20,
    paddingLeft: 10,
   borderColor:'lightgreen'
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10, // Space between icon and text
    fontSize: 16,
   
  },
  icon: {
    marginRight: 5, // Space between icon and input text
  },
  item: {
    fontSize: 18,
    padding: 10,
  },
  recent: {
    color: 'blue',
    fontSize: 16, // Font size for "Recent"
  },
  viewAll: {
    color: 'blue',
    fontSize: 16, // Font size for "Voir tout"
    textAlign: 'right', // Align text to the right
  },
});

export default Search;
