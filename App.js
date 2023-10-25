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
import Organizar from './components/Organizar';
import OrganizacaoDetalhe from './components/OrganizacaoDetalhe';
import OrganizacaoEditar from './components/OrganizacaoEditar';
import OrganizacaoForm from './components/OrganizacaoForm';
import Duvida from './components/Duvida';
import Questao from './components/Questao';
import QuestaoDetalhe from './components/QuestaoDetalhe'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Cadastro' component={Cadastro} />
            <Stack.Screen name='Menu' component={Menu} />
            <Stack.Screen name='Aula' component={Aula} />
            <Stack.Screen name='AulaForm' component={AulaForm} />
            <Stack.Screen name='AulaDetalhe' component={AulaDetalhe} />
            <Stack.Screen name='UsuarioForm' component={UsuarioForm} />
            <Stack.Screen name='AulaVideo' component={AulaVideo} />
            <Stack.Screen name='Organizar' component={Organizar} />
            <Stack.Screen name='OrganizacaoDetalhe' component={OrganizacaoDetalhe} />
            <Stack.Screen name='OrganizacaoEditar' component={OrganizacaoEditar} />
            <Stack.Screen name='OrganizacaoForm' component={OrganizacaoForm} />
            <Stack.Screen name='Duvida' component={Duvida} />
            <Stack.Screen name='Questao' component={Questao} />
            <Stack.Screen name='QuestaoDetalhe' component={QuestaoDetalhe} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
