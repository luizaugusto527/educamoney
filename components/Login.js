import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator,Image,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FormLogin from "./forms/FormLogin";
import api from "../services/api";


export default function Login() {
  const [carregando, setCarregando] = useState(false)
  const [erro,setErro] = useState(null)

  const Navigator = useNavigation();

  async function logar(login) {
  
   
     try {
      setCarregando(true)
       const response = await api.post("/login",login)
       
      if (response.data.hasOwnProperty('erro')) {
        setErro(response.data.erro)
      }else{
        let user = response.data
       
        Navigator.navigate("Menu",user)
      }
        
       

      

      setCarregando(false)
   
   } catch (error) {
   
       console.error('Error:', error.message);
   
   }
   
  }
  return (
      <View style={styles.container}>
       
    <Image source={require('../images/logo.png')}
      style={styles.logo} />
     <Text style={styles.titulo}>EducaMoney</Text>
 
      <View style={[styles.form, carregando ? {flex:1,justifyContent:'center',alignItems:'center' } : null]}>
      {carregando ?  <ActivityIndicator color={'#3D5E3D'} size={50} ></ActivityIndicator> :
        <FormLogin onLogin={logar} erro={erro} />
      }

    </View>

      </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D5E3D'
  },
  logo: {
    width: 110,
    height: 114,
    marginTop: 50
  },
  titulo: {
    fontSize: 35,
    fontFamily: 'Roboto',
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D5E3D'
  },
  logo: {
    width: 110,
    height: 114,
    marginTop: 50
  },
  titulo: {
    fontSize: 35,
    fontFamily: 'Roboto',
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  form: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  }
 

});