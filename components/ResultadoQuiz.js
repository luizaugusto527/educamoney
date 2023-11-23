import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getFirestore, collection, query, getDocs, where, doc } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import firebaseApp from '../config';

const db = getFirestore(firebaseApp);

const ResultadoQuiz = ({ route }) => {
    const Navigator = useNavigation();

    const [qtdCerta, setQtdCerta] = useState(route.params.qtdCerta);
    const [qtdErrada, setQtdErrada] = useState(route.params.qtdErrada);

function voltarQuiz() 
{
    Navigator.navigate("Questao");
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
                <View style={styles.resultado}>
                    <Text style={{ fontSize: 24 }}>Fim do Quiz</Text>
                    <Text style={{ color: '#0BAC00', marginTop: 10 }}>Quantidade de acertos: {qtdCerta}</Text>
                    <Text style={{ color: '#E92020' }}>Quantidade de erros: {qtdErrada}</Text>
                </View>

                <TouchableOpacity style={styles.proximaPergunta} onPress={voltarQuiz}>
                    <Text style={{ color: 'white' }}>voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        width: 120,
        height: 40,
        marginTop: 200,
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    contador: {
        fontSize: 32,
        marginTop: 20,
        marginBottom: 20,
        marginTop: 150
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
    resultado: {
        marginTop: 100
    },
    proximaPergunta: {
        width: 80,
        height: 40,
        backgroundColor: '#3D5E3D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20

    }

});

export default ResultadoQuiz;
