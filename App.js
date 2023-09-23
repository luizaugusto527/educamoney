import { StyleSheet, Text, View, Image } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './components/forms/Cadastro';
import { Menu } from './components/Menu';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Cadastro' component={Cadastro} />
            <Stack.Screen name='Menu' component={Menu} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
