import React ,{ useState }from 'react';
import { View, Text, StyleSheet,Alert,TextInput,TouchableOpacity } from 'react-native';

// Screen for "Participer à un groupe"
export default function JoinGroupScreen({ navigation }: { navigation: any }){

  const [id, setId] = useState('');

  const handleSubmit = () => {
    if (!id.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un ID valide.');
      return;
    }
    Alert.alert('Succès', `ID saisi : ${id}`);
    setId(''); // Réinitialise le champ d'entrée
  };
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}> ID Group</Text>
      <View style={styles.card}>
      {/* Champ d'entrée pour l'ID */}
      <TextInput
        style={styles.input}
        placeholder="Entrer un ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric" // Permet d'afficher un clavier numérique
      />

      {/* Bouton Soumettre */}
      <TouchableOpacity style={styles.button} onPress={navigation.navigate('ClientPart')}>
        <Text style={styles.buttonText}>Identifier</Text>
      </TouchableOpacity>     
       </View>
    </View>
  );
  
};



const styles = StyleSheet.create({
    container: { 
      flex: 1,
      paddingVertical:80,
      padding: 20,
      backgroundColor: '#fff',
    },
    title1: 
    {
        paddingHorizontal:209,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: 'black',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    }, 
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
     paddingVertical:30,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    horizontalLine: {
      height: 1, // Thickness of the line
      backgroundColor: '#ccc', // Color of the line
      marginVertical: 10, // Space above and below the line
      width: '100%', // Full width
    },
    card: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3, // Pour Android
    },
    elem1: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    elem2: {
      fontSize: 14,
      color: '#555',
    },
    Groupcard: {
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3,
    }
  });
  