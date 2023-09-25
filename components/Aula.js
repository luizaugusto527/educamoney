import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AulasList from './AulasList';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);


export default function Aula  ()  {
    const Navigator = useNavigation();
    
    const [aulas, setAulas] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState([]);

  useEffect(() => {

    const q = query(collection(db, 'Aula'));


    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const aulasData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          aulasData.push({
            id: doc.id,
            descricao: data.descricao,
            duracao: data.duracao,
            titulo: data.titulo,
            url: data.url,
          });
        });

        setAulas(aulasData);
        setCarregando(false)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setCarregando(false)
      }
    };

    fetchData();
  }, []);


  function inserir() {
    Navigator.navigate('AulaForm')
}
  const semDados= ()=> {
    return (
        <Text>Nenhuma aula encontrada</Text>
    )
  }
   
    
  
  return (
     <View style={styles.container}>
      <View style={styles.verde}>
       <View style={styles.voltar}>
        <TouchableOpacity>
        <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' /> 
        </TouchableOpacity>
       <Text style={[styles.texto,{marginLeft:5}]}>  
         Aulas</Text>
       </View>
      </View> 
      <View style={styles.branco}>
        <TextInput style={styles.busca} placeholder='Digite a sua busca 🔍' onChangeText={(text)=>setBusca(text)}></TextInput>
        <TouchableOpacity onPress={inserir} style={styles.botaoAula}>
            <Text style= {{color:'white', fontFamily:'Roboto', fontWeight:'bold'}}>+ Inserir</Text>
        </TouchableOpacity>
        {carregando ? <ActivityIndicator size={25} color={'black'}></ActivityIndicator> 
        : <FlatList
        showsHorizontalScrollIndicator={true}
        data={aulas.filter((aula) =>
          aula.titulo.toLowerCase().includes(busca.toLowerCase())
        )}
        renderItem={({ item }) => <AulasList item={item} />}
        ListEmptyComponent={()=><Text>Aula não encontrada 🙁. Refaça a busca</Text>}
      />
      
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3D5E3D'
  },
  verde: {
    flex: 0.2, 
    backgroundColor: '#3D5E3D',
    flexDirection:'row'
  },
  branco: {
    flex: 1, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection:'column',
    alignItems:'center'
  },
  botaoAula:{
    width:75,
    height:30,
    marginTop:8,
    marginBottom:20,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green'
  },
  busca:{
    marginTop:50,
    borderWidth:1,
    borderRadius:20,
    width:220,
    padding:2,
    paddingLeft:10
  },
  menu: {
    width:150,
    height:150,
    marginTop:20,
    backgroundColor:'#E9AE24',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'

  },
  voltar:{
    marginBottom:20,
    marginLeft:10,
    flexDirection:'row',
    alignItems:'center'
  },
  texto:{
    fontSize:20,
    color:'white',
    fontFamily:'Roboto',
  },
  tituloMenu:{
    fontFamily:'Roboto',
    fontSize:19,
    fontWeight:'bold'
  },
  logo:{
   width:100,
   height:100,
   backgroundColor:'white',
   borderRadius:50,
   borderWidth:4,
   borderColor:'#E9AE24',
   marginTop:65,
   marginLeft:120
  }
});
