import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importe useFocusEffect
import { FontAwesome5 } from '@expo/vector-icons';
import QuestaoList from './QuestaoList';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);

export default function Questao() {
  const [puzzle, setPuzzle] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(false);
  const Navigator = useNavigation();

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
      const q = query(collection(db, 'Puzzle'));
      const querySnapshot = await getDocs(q);
      const puzzleData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        puzzleData.push({
          id: doc.id,
          titulo: data.titulo
        });
      });

      setPuzzle(puzzleData);
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCarregando(false);
    }
  };

  function inserir() {
    Navigator.navigate('QuestaoForm');
  }

  return (
    <View style={styles.container}>
      <View style={styles.verde}>
        <View style={styles.voltar}>
          <TouchableOpacity>
            <FontAwesome5 style={styles.texto} name='arrow-left' size={24} color='black' />
          </TouchableOpacity>
          <Text style={[styles.texto, { marginLeft: 5 }]}>
            Quiz</Text>
        </View>
      </View>
      <View style={styles.branco}>
        <TextInput style={styles.busca} placeholder='Digite a sua busca 🔍' onChangeText={(text) => setBusca(text)}></TextInput>
        <TouchableOpacity onPress={inserir} style={styles.botaoAula}>
          <Text style={{ color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }}>+ Inserir</Text>
        </TouchableOpacity>
        {carregando ? <ActivityIndicator size={50} color={'#3D5E3D'} style={{marginTop:100}}></ActivityIndicator>
          : <FlatList
            showsHorizontalScrollIndicator={true}
            data={puzzle.filter((e) =>
              e.titulo.toLowerCase().includes(busca.toLowerCase())
            )}
            renderItem={({ item }) => <QuestaoList item={item} />}
            ListEmptyComponent={() => <Text>Quiz não encontrado</Text>}
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
  botaoAula: {
    width: 75,
    height: 30,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  busca: {
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 20,
    width: 220,
    padding: 2,
    paddingLeft: 10
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
});
