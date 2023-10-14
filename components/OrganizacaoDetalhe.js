import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { format } from 'date-fns';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import OrganizacaoList from './OrganizacaoList';
import { useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);

export default function OrganizacaoDetalhe({ route }) {
  const date = route.params
  const dataBr = format(new Date(date), 'dd/MM/yyyy');

  const [organizacao, setOrganizacao] = useState('')

  const [excluir, setExcluir] = useState(false);
  const [carregando, setCarregando] = useState(false)
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [operacao, setOperacao] = useState("Excluída")

  const toggleVisibilityError = (excluida) => {
    if (excluida)
      setOperacao("Excluir");
    excluida ? Navigator.navigate("Aula") : null
    setIsVisibleError(!isVisibleError);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      setCarregando(true);
      const q = query(collection(db, 'Organizacao'), where('data', '==', date));
      const querySnapshot = await getDocs(q);
      const aulasData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        aulasData.push({
          id: doc.id,
          descricao: data.descricao,
          data: data.data,
          valor: data.valor,
          tipo: data.tipo,
        });
      });

      setOrganizacao(aulasData);
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.verde}>
        <View style={styles.voltar}>
          <TouchableOpacity>
            <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
          </TouchableOpacity>
          <Text style={[styles.texto, { marginLeft: 5 }]}>
            Receitas e despesas</Text>
        </View>
      </View>
      <View style={styles.branco}>
        <Text style={styles.o}>Receitas/Despesas - {dataBr}</Text>
        {carregando ? <ActivityIndicator size={50} color={'#3D5E3D'} style={{ marginTop: 100 }}></ActivityIndicator>
          : <FlatList
            showsHorizontalScrollIndicator={true}
            data={organizacao}
            renderItem={({ item }) => <OrganizacaoList item={item}  />}
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
    flexDirection: 'row'
  },
  branco: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },
  o: {
    fontSize: 19,
    fontFamily: 'Roboto',
    marginTop: 19

  },
  voltar: {
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  texto: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Roboto',
  },
  modal: {
    justifyContent: 'flex-end'
  },
  box: {
    width: 1250,
    height: 150,
    zIndex:99,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,

  },
  textBox: {
    textAlign: 'center',
    fontSize: 15
  },
  boxOk: {
    marginTop: 10
  },
  boxBotoes:{
    flexDirection:'row',
    gap:16
  }
});
