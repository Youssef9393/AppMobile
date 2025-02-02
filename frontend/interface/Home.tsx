import React ,{ useState }from 'react';
import { View, Text, StyleSheet,Alert,TextInput,TouchableOpacity,Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AddGroupScreen from '@/interface/AddGroup';
import ConsultAllGroup from '@/interface/ConsultAllGoup';
import JoinGroupScreen from './JoinGroup';
import { ScrollView } from 'react-native-gesture-handler';
import LoginScreen from './login';
import dec from 'react-native-vector-icons/FontAwesome'; 
import ClientPart from '@/interface/ClientPart';
import Chat from '@/interface/Chatbot';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const Drawer = createDrawerNavigator();

const HorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  type GroupCardProps = {
    title: string;
    descriptions: string;
    onPress?: () => void;
  };

const GroupCard: React.FC<GroupCardProps> = ({ title, descriptions, onPress }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.elem1} >{title}</Text>
        <Text style={styles.elem2}>{descriptions}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>cliquez ici</Text>
      </TouchableOpacity>
      </View>
    );
  };
  

const Home = ({ navigation }: { navigation: any }) =>{
  const chatBotbtn = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={{borderRadius:30,marginVertical:-20}}>
      <Image style={{ height: 60, width: 60 ,marginHorizontal:310,borderRadius:100}} source={require('C:/AppMobile/frontend/assets/images/gpt.jpeg')} />
      
    </TouchableOpacity>
  );
  
  return (

    <View style={styles.container}>
    {/* 🔹 Bouton Chatbot fixé au-dessus */}
   
  
    {/* 🔹 ScrollView contenant les GroupCards */}
    <ScrollView style={styles.Groupcard}>
      <GroupCard 
        title="Créer un Groupe"
        descriptions="Si ne vous avez pas un groupe, créez-en un nouveau."
        onPress={() => navigation.navigate('AddGroupScreen')}
      /> 
  
      <GroupCard 
        title="Consulter les Groupes"
        descriptions="consulter par ID"
        onPress={() => navigation.navigate('ConsultAllGroup')}
      /> 
  
      <GroupCard 
        title="Participate In Group"
        descriptions="consulter par ID"
        onPress={() => navigation.navigate('JoinGroupScreen')}
      /> 
  
      <GroupCard 
        title="About Service"
        descriptions="View the latest events"
        onPress={() => navigation.navigate('ClientPart')}
      /> 
    </ScrollView>
    <View style={styles.fixedChatBotBtn}>
      {chatBotbtn()}
    </View>
  </View>
  
  );
};


// Custom Drawer MenuBar Component
const MenuBar = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: 'lightgreen',marginHorizontal:40 },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: 'black',
          width: 300,
        },
        drawerActiveTintColor: 'blue',
        drawerInactiveTintColor: 'white',
      }}
    >

       <Drawer.Screen
        name="home"
        component={Home}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             
              <Text style={{ marginLeft: 10, fontSize: 16, color: 'white' ,fontWeight: 'bold' }}>
                Gestion Dépense Fonds Partagers
              </Text>
      
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="HorizontalLine"
        component={HorizontalLine}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
            </View>
          )
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="menu-outline" size={size} color={color} />

          ),
        }}
      />
      <Drawer.Screen
        name="Ajouter un groupe"
        component={AddGroupScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Participer à un groupe"
        component={JoinGroupScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="people-outline" size={size} color={color} />
          ),
        }}
      />
         <Drawer.Screen
        name="Consulter les Groupes"
        component={ConsultAllGroup}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="people-outline" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="Espace Client"
        component={JoinGroupScreen} // Replace with your help screen component
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} /> // Icon for "Aide"
           ),
         }}
      />
      <Drawer.Screen
        name="Aide"
        component={JoinGroupScreen} // Replace with your help screen component
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help-circle-outline" size={size} color={color} /> // Icon for "Aide"
           ),
         }}
      />

<Drawer.Screen
  name="line"
  component={HorizontalLine}
  options={{
    drawerLabel: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
      </View>
    ),
   
  }}
/>
      {/* <View><br></br></View> */}
      <Drawer.Screen
      name="Déconnexion"
      component={LoginScreen} // Replace with your logout functionality or screen
      options={{
    drawerIcon: ({ color, size }) => (
      <Icon name="log-out-outline" size={size} color={color} /> // Icon for "Log Out"
    ),
  }}
/>

    </Drawer.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
   
      <MenuBar />
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#f8f9fa',
  }, fixedChatBotBtn: {
    position: 'absolute', 
    top: 490, // Distance depuis le haut
    right: -300, // Distance depuis la droite
    zIndex: 10, // S'assurer qu'il est au-dessus du ScrollView
  },
 
  title1: {
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 28,
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
    marginVertical:15,
    width: '100%',
    maxWidth: 386,
    backgroundColor: 'lightgreen',
    borderRadius: 19,
    padding: 14,
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
    fontSize: 15,
    color: 'violet',
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  Groupcard: {
    backgroundColor: '',
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 10,
    margin: 100,
    borderRadius: 20,
    shadowColor: 'pink',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  }
});
