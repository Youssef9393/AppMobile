import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CardGroupProps {
  nameGroup: string;
  montant: string;
  onContact: () => void;
  onConsult: () => void;
  onDelete: () => void;
}

const CardGroup = ({ nameGroup, montant, onContact, onConsult, onDelete }: CardGroupProps) => (
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
      <Button
        mode="text"
        onPress={onDelete}
        style={[styles.deleteButton, { paddingVertical: 6, paddingHorizontal: 10 }]}
      >
        <Ionicons name="trash" size={18} color="red" />
      </Button>
    </Card.Actions>
  </Card>
);

const App = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async (adminId: string) => {
    console.log(`adminId envoyé : ${adminId}`); // Debug

    try {
      const response = await axios.get("http://172.20.10.4:5000/groups", {
        params: { adminId: adminId },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Réponse du serveur:", response.status, response.data);
      if (response.status === 200) {
        setGroups(response.data);
      } else {
        console.log("Erreur : Impossible de récupérer les groupes.");
      }
    } catch (error: any) {
      if (error.response) {
        console.log("Erreur provenant du serveur : ", error.response.data);
      } else {
        console.log("Erreur de connexion :", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const Id = await AsyncStorage.getItem("userId");
      if (Id) {
        console.log(`adminId récupéré depuis AsyncStorage: ${Id}`);
        fetchGroups(Id);
      }
    };
    fetchData();
  }, []);

  const handleContact = (nameGroup: string) => {
    console.log(`Contactez ${nameGroup}`);
  };

  const handleConsult = (nameGroup: string) => {
    console.log(`Consultez les détails de ${nameGroup}`);
  };

  const handleDelete = (groupId: string) => {
    if (groups.length === 0) {
      console.log("Aucun groupe à supprimer.");
      return;
    }

    Alert.alert(
      "Suppression",
      `Voulez-vous vraiment supprimer le groupe ${groupId}?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const response = await axios.delete(`http://100.69.121.241:5000/groups/${groupId}`);
              if (response.status === 200) {
                console.log("Groupe supprimé avec succès.");
                setGroups(groups.filter((group) => group._id !== groupId));
              } else {
                console.log("Erreur : Une erreur est survenue lors de la suppression.");
              }
            } catch (error: any) {
              console.log("Erreur de connexion au serveur lors de la suppression:", error.message);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: { name: string; price: number; _id: string } }) => (
    <CardGroup
      nameGroup={item.name}
      montant={item.price.toString()}
      onContact={() => handleContact(item.name)}
      onConsult={() => handleConsult(item.name)}
      onDelete={() => handleDelete(item._id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  if (groups.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Pas de groupe pour le moment.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={groups} keyExtractor={(item) => item._id} renderItem={renderItem} />
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
    flex: 1,
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
    width: 120,
  },
  deleteButton: {
    marginHorizontal: 0,
    width: 80,
    justifyContent: "center",
  },
});

export default App;
