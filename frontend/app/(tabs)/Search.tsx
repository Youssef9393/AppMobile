import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CenteredSearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher..."
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

export default CenteredSearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend toute la hauteur de l'écran
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    backgroundColor: 'gray', // Couleur de fond
  },
  searchBar: {
    width: '80%', // Largeur de la barre de recherche (80% de l'écran)
    height: 50, // Hauteur
    borderColor: '#ccc', // Bordure grise
    borderWidth: 1, // Épaisseur de la bordure
    borderRadius: 25, // Coins arrondis
    paddingHorizontal: 20, // Espacement interne à gauche/droite
    backgroundColor: '#fff', // Fond blanc
    shadowColor: '#000', // Ombre
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3, // Ombre pour Android
  },
});
