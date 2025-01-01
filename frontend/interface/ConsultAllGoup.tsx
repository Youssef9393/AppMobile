import React from "react";
import { StyleSheet, View, FlatList, Text, Alert } from "react-native";
import { Card, Button } from "react-native-paper";

const CardGroup = ({ nameGroup, montant, onContact, onConsult }:any) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.nameGroup}>{nameGroup}</Text>
        <Text style={styles.montant}>Montant: {montant} €</Text>
      </View>
    </Card.Content>
    <Card.Actions style={styles.actions}>
      <Button mode="contained" onPress={onContact} style={styles.button}>
        Contacter
      </Button>
      <Button mode="outlined" onPress={onConsult} style={styles.button}>
        Consulter
      </Button>
    </Card.Actions>
  </Card>
);

const App = () => {
  const data = [
    { id: "1", nameGroup: "Groupe Alpha", montant: "250" },
    { id: "2", nameGroup: "Groupe Beta", montant: "400" },
    { id: "3", nameGroup: "Groupe Gamma", montant: "300" },
  ];

  const handleContact = (nameGroup:any) => {
    Alert.alert(`Contactez ${nameGroup}`);
  };

  const handleConsult = (nameGroup:any) => {
    Alert.alert(`Consultez les détails de ${nameGroup}`);
  };

  const renderItem = ({ item }:any) => (
    <CardGroup
      nameGroup={item.nameGroup}
      montant={item.montant}
      onContact={() => handleContact(item.nameGroup)}
      onConsult={() => handleConsult(item.nameGroup)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginVertical: 8,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameGroup: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1, // Permet au texte de prendre l'espace restant
    textAlign: "left",
  },
  montant: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    marginHorizontal: 0,
    width:120,
  },
});

export default App;
