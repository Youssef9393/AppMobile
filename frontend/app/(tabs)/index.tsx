import { Text,Image, StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@/interface/login';
import AddAccount from '@/interface/CreateAccount';
import ResetPasswordScreen from '@/interface/ResetPassword';
import HomePage from '@/interface/Home';
import AddGroupScreen from '@/interface/AddGroup';
import JoinGroupScreen from '@/interface/JoinGroup';
import ClientPart from '@/interface/ClientPart';
import ConsultAllGroup from '@/interface/ConsultAllGoup';

const Stack = createStackNavigator(); 

export default function App() {
  return (

    
      // <Stack.Navigator initialRouteName="login"  >
      //   <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      //   <Stack.Screen name="createaccount" component={AddAccount} />
      //   <Stack.Screen name="checkemail" component={ResetPasswordScreen} />
      //   <Stack.Screen name="home" component={HomePage}  options={{ headerShown: false }} />
      //   <Stack.Screen name="AddGroupScreen" component={AddGroupScreen} />
      //   <Stack.Screen name="JoinGroupScreen" component={JoinGroupScreen} />
      //   <Stack.Screen name="ClientPart" component={ClientPart} />
      //   <Stack.Screen name="ConsultAllGroup" component={ConsultAllGroup}/>
      // </Stack.Navigator>
 <AddGroupScreen></AddGroupScreen> 
   
 
   
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  
});
