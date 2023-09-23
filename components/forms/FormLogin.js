import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function FormLogin({ onLogin, erro }) {
  const [verSenha, setVersenha] = useState(true)
  const [login, setLogin] = useState({ email: "", senha: "" })
  const [erroEmail, setErroEmail] = useState("")
  const [erroSenha, setErroSenha] = useState("")


  const [icone, setIcone] = useState('eye-off')

  const Navigator = useNavigation();

  function trocaIcone() {
    setVersenha(!verSenha);
    icone === 'eye' ? setIcone('eye-off') : setIcone('eye')

  }

  function validar() {
    const email = login.email;
    const senha = login.senha;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regex.test(email)) {
      setErroEmail("E-mail Invalido")
    } else {
      setErroEmail("")

    }
    if (senha == '') {
      setErroSenha("Senha Invalida")
    } else {
      setErroSenha("")
    }

    regex.test(email) && senha ? onLogin(login) : null


  }

  function cadastrar() {
    Navigator.navigate('Cadastro',login)
  }

  return (
    <ScrollView>
      <Text style={styles.o}>Olá, Estudante!</Text>
      {erro && <Text style={[styles.erroLogin]}>{erro}</Text> || <Text style={styles.u}>Faca o login para continuar</Text>}

      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} onChangeText={(text) => setLogin({ ...login, email: text })} value={login.email} />
      <Text style={styles.erro}>{erroEmail}</Text>
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} secureTextEntry={verSenha} onChangeText={(text) => setLogin({ ...login, senha: text })} value={login.senha} />
      <TouchableOpacity style={styles.icon} onPress={trocaIcone}>
        <Ionicons name={icone} size={28} color="black" />
      </TouchableOpacity>
      <Text style={[styles.erro, { position: 'relative', bottom: 30 }]}>{erroSenha}</Text>
      <TouchableOpacity onPress={validar} style={styles.button}>
        <Text style={styles.textButton} >Entrar
        </Text>
        <Ionicons name="arrow-forward" size={32} color="white" style={{ position: 'relative', left: 50 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={cadastrar}>
        <Text style={styles.cadastrar}> Cadastre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  o: {
    fontSize: 30,
    fontFamily: 'Roboto',
    marginTop: 50,
    marginHorizontal: 24,

  },
  u: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 8,
    marginHorizontal: 24,
    color: '#9932CC'

  },
  input: {
    width: 315,
    height: 50,
    borderBottomWidth: 1,
    marginHorizontal: 24,
    padding: 0,
    fontSize: 23
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginHorizontal: 24,
    marginTop: 24
  },
  button: {
    width: 315,
    height: 54,
    backgroundColor: '#3D5E3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 32,
    flexDirection: 'row',
    borderRadius: 10
  },
  textButton: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold'
  },
  icon: {
    position: 'relative',
    left: 310,
    bottom: 40
  },
  cadastrar: {
    fontSize: 15,
    color: '#777',
    justifyContent: 'center',
    textAlign: 'right',
    marginHorizontal: 45,
    marginTop: 10
  },
  erro: {
    fontSize: 14,
    marginLeft: 24,
    color: 'red'
  },
  erroLogin: {
    fontSize: 20,
    marginLeft: 24,
    color: 'red'
  }
})