import { StyleSheet, Text, View, Image } from 'react-native';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './components/forms/Cadastro';
import { Menu } from './components/Menu';
import Aula from './components/Aula';
import AulaForm from './components/AulaForm';
import AulaDetalhe from './components/AulaDetalhe';
import UsuarioForm from './components/UsuarioForm';
import AulaVideo from './components/AulaVideo';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Cadastro' component={Cadastro} />
            <Stack.Screen name='Menu' component={Menu} />
            <Stack.Screen name='Aula' component={Aula} />
            <Stack.Screen name='AulaForm' component={AulaForm} />
            <Stack.Screen name='AulaDetalhe' component={AulaDetalhe} />
            <Stack.Screen name='UsuarioForm' component={UsuarioForm} />
            <Stack.Screen name='AulaVideo' component={AulaVideo} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
